import { Component, OnInit } from '@angular/core';
import { FlightFilter } from '../flight-filter';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';

@Component({
  selector: 'app-flight',
  templateUrl: 'flight-list.component.html',
  styles: [
    'table { min-width: 600px }',
  ]
})
export class FlightListComponent implements OnInit {
  displayedColumns = ['id', 'from', 'to', 'date', 'actions'];
  filter = new FlightFilter();
  selectedFlight!: Flight;
  feedback: any = {};

  get flightList(): Flight[] {
    return this.flightService.flightList;
  }

  constructor(private flightService: FlightService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.flightService.load(this.filter);
  }

  select(selected: Flight): void {
    this.selectedFlight = selected;
  }

  delete(flight: Flight): void {
    if (confirm('Are you sure?')) {
      this.flightService.delete(flight).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
