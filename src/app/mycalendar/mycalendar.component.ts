import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-mycalendar',
  templateUrl: './mycalendar.component.html',
  styleUrls: ['./mycalendar.component.css'],
})
export class MycalendarComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private eventService: EventService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.isloading = true;
    route.params.subscribe((val) => {
      // put the code from `ngOnInit` here
      this.user = localStorage.getItem('userInfo');

      this.fetchMyCalendar(JSON.parse(this.user).user_id);

      this.username = JSON.parse(this.user).user;

      if (this.username === 'admin') {
        this.isAdmin = false;
      }
    });
  }
  isloading: boolean = false;
  public user: any;
  public username: any;
  mycalendar: string[] = [];
  pevents: any = [];
  fevents: any = [];
  events = [];
  allevents = [];
  isAdmin = true;
  isPEventEmpty: boolean = false;
  isFEventEmpty: boolean = false;
  ngOnInit(): void {}
  fetchMyCalendar(user_id: number) {
    var calendar;
    this.eventService.fetchCalendar(user_id).subscribe(
      (res) => {
        let a = JSON.parse(res).events;
        if (a === '[]') this.mycalendar = [];
        else this.mycalendar = a.replace('[', '').replace(']', '').split(',');
        this.fetchEvents();
        //console.log(this.mycalendar);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  fetchEvents() {
    this.eventService.fetchEvents().subscribe(
      (res) => {
        this.events = JSON.parse(res).events;
        this.allevents = Array.from(this.events);
        this.checkForPast(this.allevents);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  checkForPast(events: any) {
    for (let e of events) {
      e.inProgress = false;
      e.isScheduled = false;
      const a = e.event_id.toString();
      if (this.mycalendar.includes(a)) e.isScheduled = true;

      let curDate = new Date().getTime();
      let eveDate = Date.parse(
        e['eventDate'].replace('00:00:00.000Z', e['start'])
      );
      let eveDate2 = Date.parse(
        e['eventDate'].replace('00:00:00.000Z', e['end'])
      );

      if (curDate > eveDate2 && e.isScheduled) {
        this.pevents.push(e);
      } else if (curDate <= eveDate2 && e.isScheduled) {
        if (curDate >= eveDate) {
          e['inProgress'] = true;
        }
        this.fevents.push(e);
      }
    }
    if (this.pevents.length === 0 || this.mycalendar.length === 0)
      this.isPEventEmpty = true;
    else this.isPEventEmpty = false;
    if (this.fevents.length === 0 || this.mycalendar.length === 0)
      this.isFEventEmpty = true;
    else this.isFEventEmpty = false;
    this.isloading = false;
  }
  logoutUser() {
    this.auth.LogoutUser();
  }
  removeCalendar(event_id: number) {
    this.eventService
      .deleteCalendar(event_id, JSON.parse(this.user).user_id)
      .subscribe(
        (res) => {
          console.log('Successfully deleted');
          this.router
            .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['mycalendar']);
            });
        },
        (err) => {
          console.log(err);
        }
      );
  }
  goToAllevent() {
    this.router.navigate(['allevent']);
  }
}
