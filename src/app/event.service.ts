import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _addEventUrl = 'http://localhost:3000/events/addevent';
  private _editEventUrl = 'http://localhost:3000/events/updateevent/';
  private _deleteEventUrl = 'http://localhost:3000/events/deleteevent/';
  private _allEventUrl = 'http://localhost:3000/events/allevents';
  private _myCalendarUrl = 'http://localhost:3000/events/mycalendar/';
  private _addToCalendarUrl = 'http://localhost:3000/events/addcalendar/';
  private _removeFromCalendarUrl =
    'http://localhost:3000/events/deletecalendar/';
  constructor(private http: HttpClient) {}
  addEventData(eventData: object) {
    return this.http.post(this._addEventUrl, eventData, {
      responseType: 'text',
    });
  }
  editEventData(eventData: object, cur: number) {
    return this.http.post(this._editEventUrl + cur, eventData, {
      responseType: 'text',
    });
  }
  deleteEventData(curEve: number) {
    return this.http.get(this._deleteEventUrl + curEve, {
      responseType: 'text',
    });
  }
  fetchEvents() {
    return this.http.get(this._allEventUrl, { responseType: 'text' });
  }
  fetchCalendar(user_id: number) {
    const calendarUrl = this._myCalendarUrl + user_id;

    return this.http.get(calendarUrl, {
      responseType: 'text',
    });
  }
  addToCalendar(user_id: number, event_id: number) {
    return this.http.post(
      this._addToCalendarUrl + user_id,
      { event_id },
      {
        responseType: 'text',
      }
    );
  }
  deleteCalendar(event_id: number, user_id: number) {
    return this.http.post(
      this._removeFromCalendarUrl + user_id,
      { event_id },
      { responseType: 'text' }
    );
  }
}
