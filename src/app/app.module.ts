import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AllEventComponent } from './all-event/all-event.component';
import { MycalendarComponent } from './mycalendar/mycalendar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { FormsModule } from '@angular/forms';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEventComponent,
    EditEventComponent,
    AllEventComponent,
    MycalendarComponent,
    CalendarViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
  ],
  providers: [AuthService, EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
