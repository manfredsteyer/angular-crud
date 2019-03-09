import { <%= classify(name) %> } from './<%=dasherize(name)%>';
import { <%= classify(name) %>Filter } from './<%=dasherize(name)%>-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class <%= classify(name) %>Service {
    
    constructor(private http: HttpClient) {
    }

    <%=camelize(name)%>List: <%=classify(name)%>[] = [];
  
    findById(id: string): Observable<<%= classify(name) %>> {
        let url = `<%= model.api.url %>/${id}`; <% let id = getId(model); %>
        let params = { "<%=id.name%>": id };
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
        return this.http.get<<%= classify(name) %>>(url, {params, headers});
    }
    
    load(filter: <%= classify(name) %>Filter): void {
        this.find(filter).subscribe(
            result => {
                this.<%=camelize(name)%>List = result;
            },
            err => {
                console.error('error loading', err);
            }
        )
    }

    find(filter: <%= classify(name) %>Filter): Observable<<%= classify(name) %>[]> {
        let url = `<%= model.api.url %>`;
        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        let params = {<% for (let field of getFilterFields(model)) { %>
            "<%=field.name%>": filter.<%=field.name%>,<%  } %>
        };

        return this.http.get<<%= classify(name) %>[]>(url, {params, headers});
    }

    save(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {        
        var params = new HttpParams(); <% let id = getId(model); %>
        var url = "";
        const headers = new HttpHeaders().set('content-type', 'application/json');  
        if(entity.<%=id.name%>) {
            url = `<%= model.api.url %>/${entity.<%=id.name%>.toString()}`;
            params = new HttpParams().set('ID', entity.<%=id.name%>.toString());  
            return this.http.put<<%= classify(name) %>>(url, entity, {headers, params});
        }
        else {
            url = `<%= model.api.url %>`;
            return this.http.post<<%= classify(name) %>>(url, entity, {headers, params});
        }        
    }


    delete(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
        var params = new HttpParams(); <% let id = getId(model); %>
        var url = "";
        const headers = new HttpHeaders().set('content-type', 'application/json');  
        if(entity.<%=id.name%>) {
            url = `<%= model.api.url %>/${entity.<%=id.name%>.toString()}`;
            params = new HttpParams().set('ID', entity.<%=id.name%>.toString());  
            return this.http.delete<<%= classify(name) %>>(url, {headers, params});
        }

        return null;
    }       
}

