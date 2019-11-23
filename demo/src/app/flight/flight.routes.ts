import { Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';

export const FLIGHT_ROUTES: Routes = [
  {
    path: 'flights',
    component: FlightListComponent
  },
  {
    path: 'flights/:id',
    component: FlightEditComponent
  }
];
