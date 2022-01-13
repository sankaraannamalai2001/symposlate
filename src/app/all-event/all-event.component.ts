import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
@Component({
  selector: 'app-all-event',
  templateUrl: './all-event.component.html',
  styleUrls: ['./all-event.component.css'],
})
export class AllEventComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private eventService: EventService,
    private router: Router
  ) {}
  public user: any;
  public username: any;
  pevents: any = [];
  fevents: any = [];
  events = [];
  allevents = [];
  mycalendar: any = [];
  calevents: any = [];
  isPEventEmpty: boolean = false;
  isFEventEmpty: boolean = false;
  ngOnInit(): void {
    this.user = localStorage.getItem('userInfo');
    this.username = JSON.parse(this.user).user;
    this.fetchMyCalendar(JSON.parse(this.user).user_id);
    this.fetchEvents();

    if (this.username === 'admin') {
      this.isAdmin = false;
    }
  }
  isAdmin = true;
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
  fetchMyCalendar(user_id: number) {
    this.eventService.fetchCalendar(user_id).subscribe(
      (res) => {
        let a = JSON.parse(res).events;
        if (a == '[]') this.mycalendar = [];
        else this.mycalendar = a.replace('[', '').replace(']', '').split(',');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  logoutUser() {
    this.auth.LogoutUser();
  }
  edit(n: number, eventData: object) {
    const navigationExtras: NavigationExtras = {
      state: { event_id: n, eventData: eventData },
    };
    this.router.navigate(['editevent'], navigationExtras);
  }
  addtocalendar(event_id: number) {
    this.eventService
      .addToCalendar(JSON.parse(this.user).user_id, event_id)
      .subscribe(
        (res) => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['mycalendar']);
            });
        },
        (err) => {
          (document.querySelector('.modal-btn') as HTMLElement).click();
        }
      );
  }

  checkForPast(events: any) {
    for (let e of events) {
      e.inProgress = false;
      e.isScheduled = false;

      if (this.mycalendar.includes(e.event_id.toString())) e.isScheduled = true;

      let curDate = new Date().getTime();
      let eveDate = Date.parse(
        e['eventDate'].replace('00:00:00.000Z', e['start'])
      );
      let eveDate2 = Date.parse(
        e['eventDate'].replace('00:00:00.000Z', e['end'])
      );

      if (curDate > eveDate2) {
        this.pevents.push(e);
      } else if (curDate <= eveDate2) {
        if (curDate >= eveDate) {
          e['inProgress'] = true;
        }
        this.fevents.push(e);
      }
    }
    if (this.pevents.length === 0) this.isPEventEmpty = true;
    else this.isPEventEmpty = false;
    if (this.fevents.length === 0) this.isFEventEmpty = true;
    else this.isFEventEmpty = false;
  }
}
