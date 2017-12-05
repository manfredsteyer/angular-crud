import { Routes } from '@angular/router';
import { FlightListComponent } from './flight-list.component';
import { FlightEditComponent } from './flight-edit.component';

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
