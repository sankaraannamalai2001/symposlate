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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEventComponent,
    EditEventComponent,
    AllEventComponent,
    MycalendarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AuthService, EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
