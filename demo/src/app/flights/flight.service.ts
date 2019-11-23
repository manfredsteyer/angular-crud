import { Flight } from './flight';
import { FlightFilter } from './flight-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class FlightService {
    
    constructor(private http: HttpClient) {
    }

    flightList: Flight[] = [];
  
    findById(id: string): Observable<Flight> {
        let url = 'http://www.angular.at/api/flight'; 
        let params = { "id": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<Flight>(url, {params, headers});
    }
    
    load(filter: FlightFilter): void {
        this.find(filter).subscribe(
            result => {
                this.flightList = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: FlightFilter): Observable<Flight[]> {
        let url = 'http://www.angular.at/api/flight';
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {
            "from": filter.from,
            "to": filter.to,
        };

        return this.http.get<Flight[]>(url, {params, headers});
    }

    save(entity: Flight): Observable<Flight> {
        let url = 'http://www.angular.at/api/flight';
        let headers = new HttpHeaders()
            .set('Accept', 'application/json');
        return this.http.post<Flight>(url, entity, {headers});
    }
}

