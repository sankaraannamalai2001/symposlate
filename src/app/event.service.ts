import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _addEventUrl = 'https://symposlate.herokuapp.com/events/addevent';
  private _editEventUrl = 'https://symposlate.herokuapp.com/events/updateevent/';
  private _deleteEventUrl = 'https://symposlate.herokuapp.com/events/deleteevent/';
  private _allEventUrl = 'https://symposlate.herokuapp.com/events/allevents';
  private _myCalendarUrl = 'https://symposlate.herokuapp.com/events/mycalendar/';
  private _addToCalendarUrl = 'https://symposlate.herokuapp.com/events/addcalendar/';
  private _removeFromCalendarUrl =
    'https://symposlate.herokuapp.com/events/deletecalendar/';
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
