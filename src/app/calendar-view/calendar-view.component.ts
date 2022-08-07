import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationExtras,
  Router,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
declare var $: any;
@Component({
  selector: 'app-calendar-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalendarViewComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private eventService: EventService,
    private router: Router,
    route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      showMsg: number;
    };
    if (state && state.showMsg == 1) {
      setTimeout(() => {
        (document.querySelector('.successModal') as HTMLElement).click();
      }, 500);
    } else if (state && state.showMsg == 0) {
      setTimeout(() => {
        (document.querySelector('.errModal') as HTMLElement).click();
      }, 500);
    }
    route.params.subscribe((val) => {
      // this.isloading = true;

      this.user = localStorage.getItem('userInfo');

      this.fetchMyCalendar(JSON.parse(this.user).user_id);

      this.username = JSON.parse(this.user).user;

      if (this.username === 'admin') {
        this.isAdmin = false;
      }
    });
  }
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  displayStyle = 'none';
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  isloading = false;
  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;
  errMsg = '';
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = false;
      }
      this.viewDate = date;
    }
  }
  openModal(event: string) {
    for (let e of this.fevents) {
      if (e.eventName == event) this.curEve = e;
    }
    for (let e of this.pevents) {
      if (e.eventName == event) this.curEve = e;
    }
    console.log(this.curEve);
    (document.querySelector('.openModal') as HTMLElement).click();
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  public user: any;
  public username: any;
  mycalendar: string[] = [];
  pevents: any = [];
  fevents: any = [];
  aevents = [];
  allevents = [];
  curEve = {
    eventUrl: '',
    eventName: '',
    eventDesc: '',
    start: '',
    end: '',
    eventDate: '',
    event_id: 0,
  };
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
        this.aevents = JSON.parse(res).events;
        this.allevents = Array.from(this.aevents);
        this.checkForPast(this.allevents);
        // this.isloading = false;
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
    for (let i of this.pevents) {
      let start = Date.parse(
        i['eventDate'].replace('00:00:00.000Z', i['start'])
      );
      let end = Date.parse(i['eventDate'].replace('00:00:00.000Z', i['end']));
      this.pevents.startTime = start;
      this.pevents.endTime = end;
      this.events.push({
        start: new Date(start),
        end: new Date(end),
        title: i['eventName'],
        color: colors.red,
        allDay: true,
      });
    }
    for (let i of this.fevents) {
      let start = Date.parse(
        i['eventDate'].replace('00:00:00.000Z', i['start'])
      );
      let end = Date.parse(i['eventDate'].replace('00:00:00.000Z', i['end']));
      this.fevents.startTime = start;
      this.fevents.endTime = end;

      this.events.push({
        start: new Date(start),
        end: new Date(end),
        title: i['eventName'],
        color: colors.blue,
        allDay: true,
      });
    }
    this.isloading = false;
    (document.querySelector('.todayBtn') as HTMLElement).click();
  }
  logoutUser() {
    this.auth.LogoutUser();
  }
  removeCalendar(event_id: number) {
    this.eventService
      .deleteCalendar(event_id, JSON.parse(this.user).user_id)
      .subscribe(
        (res) => {
          this.deleteData(event_id);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  goToAllevent() {
    this.router.navigate(['allevent']);
  }
  addEvent(date: Date) {
    console.log(date);
    this.EventData.eventDate = date;
    (document.querySelector('.eventModal') as HTMLElement).click();
  }
  EventData: any = {
    user_id: '1',
  };
  saveData() {
    this.eventService.addEventData(this.EventData).subscribe(
      (res) => {
        console.log(res);
        this.addtocalendar(JSON.parse(res).event_id);
      },
      (err) => {
        console.log(err);
        this.errMsg = err;
      }
    );
  }
  addtocalendar(event_id: number) {
    this.eventService
      .addToCalendar(JSON.parse(this.user).user_id, event_id)
      .subscribe(
        (res) => {
          this.router
            .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
            .then(() => {
              const navigationExtras: NavigationExtras = {
                state: { showMsg: 1 },
              };
              // window.location.reload();
              this.router.navigate(['calendarview'], navigationExtras);
            });
        },
        (err) => {
          (document.querySelector('.errModal') as HTMLElement).click();
        }
      );
  }
  deleteData(event_id: number) {
    this.eventService.deleteEventData(event_id).subscribe(
      (res) => {
        this.router
          .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
          .then(() => {
            const navigationExtras: NavigationExtras = {
              state: { showMsg: 0 },
            };
            this.router.navigate(['calendarview'], navigationExtras);
          });
      },
      (err) => {
        console.log(err);
        this.errMsg = err;
      }
    );
  }
}
