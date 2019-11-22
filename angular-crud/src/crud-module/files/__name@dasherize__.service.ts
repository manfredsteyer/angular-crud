import { <%= classify(name) %> } from './<%=dasherize(name)%>';
import { <%= classify(name) %>Filter } from './<%=dasherize(name)%>-filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class <%= classify(name) %>Service {
  <%=camelize(name)%>List: <%=classify(name)%>[] = [];<% const id = getId(model); %>

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<<%= classify(name) %>> {
    const url = `<%= model.api.url %>/${id}`;
    const params = { '<%=id.name%>': id };
    const headers = new HttpHeaders().set('Accept', 'application/json');
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
    );
  }

  find(filter: <%= classify(name) %>Filter): Observable<<%= classify(name) %>[]> {
    const url = `<%= model.api.url %>`;
    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = {<% for (const field of getFilterFields(model)) { %>
      '<%=field.name%>': filter.<%=field.name%>,<%  } %>
    };

    return this.http.get<<%= classify(name) %>[]>(url, {params, headers});
  }

  save(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.<%=id.name%>) {
      url = `<%= model.api.url %>/${entity.<%=id.name%>.toString()}`;
      params = new HttpParams().set('ID', entity.<%=id.name%>.toString());
      return this.http.put<<%= classify(name) %>>(url, entity, {headers, params});
    } else {
      url = `<%= model.api.url %>`;
      return this.http.post<<%= classify(name) %>>(url, entity, {headers, params});
    }
  }

  delete(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.<%=id.name%>) {
      url = `<%= model.api.url %>/${entity.<%=id.name%>.toString()}`;
      params = new HttpParams().set('ID', entity.<%=id.name%>.toString());
      return this.http.delete<<%= classify(name) %>>(url, {headers, params});
    }
    return null;
  }
}

