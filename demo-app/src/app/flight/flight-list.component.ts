import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FlightFilter } from './flight-filter';
import { FlightService } from './flight.service';
import { Flight } from './flight';

@Component({
    selector: 'flight',
    templateUrl: 'flight-list.component.html'
})
export class FlightListComponent {

    filter = new FlightFilter();
    selectedFlight: Flight;

    get flightList(): Flight[] {
        return this.flightService.flightList;
    }

    constructor(private flightService: FlightService) {
    }

    ngOnInit() {
    }

    search(): void {
        this.flightService.load(this.filter);
    }

    select(selected: Flight): void {
        this.selectedFlight = selected;
    }

}
