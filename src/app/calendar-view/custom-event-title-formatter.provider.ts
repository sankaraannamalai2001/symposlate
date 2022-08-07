import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  month(event: CalendarEvent): string {
    // console.log(event);
    return `<span class="h5">${
      event.title
    }</span><br> <b class="ms-3">${formatDate(
      event.start,
      'hh:mm a',
      this.locale
    )}</b>-<b>${formatDate(
      event.end ? event.end : event.start,
      'hh:mm a',
      this.locale
    )}</b><hr>`;
  }

  week(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }

  day(event: CalendarEvent): string {
    return `<b>${formatDate(event.start, 'h:m a', this.locale)}</b> ${
      event.title
    }`;
  }
}
