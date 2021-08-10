import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightService } from './flight.service';
import { FLIGHT_ROUTES } from './flight.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(FLIGHT_ROUTES)
  ],
  declarations: [
    FlightListComponent,
    FlightEditComponent
  ],
  providers: [FlightService],
  exports: []
})
export class FlightModule { }
