import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { <%= classify(name) %>Service } from '../<%=dasherize(name)%>.service';
import { <%= classify(name) %> } from '../<%=dasherize(name)%>';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: '<%=dasherize(name)%>-edit',
  templateUrl: './<%=dasherize(name)%>-edit.component.html'
})
export class <%=classify(name)%>EditComponent implements OnInit {

    id: string;
    <%=camelize(name)%>: <%=classify(name)%>;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private <%=camelize(name)%>Service: <%=classify(name)%>Service) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new <%=classify(name)%>());
                    return this.<%=camelize(name)%>Service.findById(id)
                })
            )
            .subscribe(
                <%=camelize(name)%> => { 
                    this.<%=camelize(name)%> = <%=camelize(name)%>; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.<%=camelize(name)%>Service.save(this.<%=camelize(name)%>).subscribe(
            <%=camelize(name)%> => { 
                this.<%=camelize(name)%> = <%=camelize(name)%>; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}