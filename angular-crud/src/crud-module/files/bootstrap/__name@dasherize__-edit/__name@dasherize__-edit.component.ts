import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { <%= classify(name) %>Service } from '../<%=dasherize(name)%>.service';
import { <%= classify(name) %> } from '../<%=dasherize(name)%>';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-<%=dasherize(name)%>-edit',
  templateUrl: './<%=dasherize(name)%>-edit.component.html'
})
export class <%=classify(name)%>EditComponent implements OnInit {

  id!: string;
  <%=camelize(name)%>!: <%=classify(name)%>;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private <%=camelize(name)%>Service: <%=classify(name)%>Service) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p['id']),
        switchMap(id => {
          if (id === 'new') { return of(new <%=classify(name)%>()); }
          return this.<%=camelize(name)%>Service.findById(id);
        })
      )
      .subscribe({
        next: <%=camelize(name)%> => {
          this.<%=camelize(name)%> = <%=camelize(name)%>;
          this.feedback = {};
        },
        error: err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      });
  }

  save() {
    this.<%=camelize(name)%>Service.save(this.<%=camelize(name)%>).subscribe({
      next: <%=camelize(name)%> => {
        this.<%=camelize(name)%> = <%=camelize(name)%>;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(async () => {
          await this.router.navigate(['/<%=pluralize(name)%>']);
        }, 1000);
      },
      error: err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/<%=pluralize(name)%>']);
  }
}
