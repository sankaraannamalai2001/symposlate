import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  constructor(private eventService: EventService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      event_id: number;
      eventData: object;
    };
    this.currentEve = state.event_id;
    this.EventData = state.eventData;
  }
  currentEve!: number;
  public user: any;
  public username: any;
  errMsg = '';
  ngOnInit(): void {
    this.user = localStorage.getItem('userInfo');
    this.username = JSON.parse(this.user).user;
  }
  EventData: any = {
    user_id: '1',
  };
  editData() {
    this.eventService.editEventData(this.EventData, this.currentEve).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['allevent']);
      },
      (err) => {
        console.log(err);
        this.errMsg = err;
      }
    );
  }
  deleteData() {
    this.eventService.deleteEventData(this.currentEve).subscribe(
      (res) => {
        this.router.navigate(['allevent']);
      },
      (err) => {
        console.log(err);
        this.errMsg = err;
      }
    );
  }
  cancel() {
    this.router.navigate(['allevent']);
  }
}
