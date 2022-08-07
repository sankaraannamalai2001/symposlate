import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { AllEventComponent } from './all-event/all-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { LoginComponent } from './login/login.component';
import { MycalendarComponent } from './mycalendar/mycalendar.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: LoginComponent,
  },
  {
    path: 'addevent',
    component: AddEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editevent',
    component: EditEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allevent',
    component: AllEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mycalendar',
    component: MycalendarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendarview',
    component: CalendarViewComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
