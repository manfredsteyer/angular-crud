import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styles: [
    // todo: figure out how to make width dynamic
    'form { display: flex; flex-direction: column; min-width: 500px; }',
    'form > * { width: 100% }'
  ]
})
export class FlightEditComponent implements OnInit {
  id!: string;
  flight!: Flight;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Flight()); }
          return this.flightService.findById(id);
        })
      )
      .subscribe(flight => {
          this.flight = flight;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.flightService.save(this.flight).subscribe(
      flight => {
        this.flight = flight;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/flights']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/flights']);
  }
}
