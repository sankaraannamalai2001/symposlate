import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  constructor(private eventService: EventService, private router: Router) {}
  errMsg = '';
  public user: any;
  public username: any;

  ngOnInit(): void {
    this.user = localStorage.getItem('userInfo');
    this.username = JSON.parse(this.user).user;
  }
  EventData: any = {
    user_id: '1',
  };
  saveData() {
    this.eventService.addEventData(this.EventData).subscribe(
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
