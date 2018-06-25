import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {

    id: string;
    flight: Flight;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private flightService: FlightService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Flight());
                    return this.flightService.findById(id)
                })
            )
            .subscribe(
                flight => { 
                    this.flight = flight; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.flightService.save(this.flight).subscribe(
            flight => { 
                this.flight = flight; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}