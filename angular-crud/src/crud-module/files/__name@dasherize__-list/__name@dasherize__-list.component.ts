import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { <%= classify(name) %>Filter } from '../<%=dasherize(name)%>-filter';
import { <%= classify(name) %>Service } from '../<%=dasherize(name)%>.service';
import { <%= classify(name) %> } from '../<%=dasherize(name)%>';

@Component({
    selector: '<%=dasherize(name)%>',
    templateUrl: '<%=dasherize(name)%>-list.component.html'
})
export class <%= classify(name) %>ListComponent {

    filter = new <%= classify(name) %>Filter();
    selected<%=classify(name)%>: <%= classify(name) %>;

    get <%=camelize(name)%>List(): <%= classify(name) %>[] {
        return this.<%=camelize(name)%>Service.<%=camelize(name)%>List;
    }

    constructor(private <%=camelize(name)%>Service: <%= classify(name) %>Service) {
    }

    ngOnInit() {
    }

    search(): void {
        this.<%=camelize(name)%>Service.load(this.filter);
    }

    select(selected: <%= classify(name) %>): void {
        this.selected<%= classify(name) %> = selected;
    }

}
