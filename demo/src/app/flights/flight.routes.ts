import { Routes } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';

export const FLIGHT_ROUTES: Routes = [
  {
    path: 'flight',
    component: FlightListComponent
  },
  {
    path: 'flight/:id',
    component: FlightEditComponent
  }
]
