import { <%= classify(name) %> } from './<%=dasherize(name)%>';
import { <%= classify(name) %>Filter } from './<%=dasherize(name)%>-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class <%= classify(name) %>Service {
  <%=camelize(name)%>List: <%=classify(name)%>[] = [];<% const id = getId(model); %>
  api = '<%= model.api.url %>';

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<<%= classify(name) %>> {
    const url = `${this.api}/${id}`;
    const params = { <%=id.name%>: id };
    return this.http.get<<%= classify(name) %>>(url, {params, headers});
  }

  load(filter: <%= classify(name) %>Filter): void {
    this.find(filter).subscribe({
      next: result => {
        this.<%=camelize(name)%>List = result;
      },
      error: err => {
        console.error('error loading', err);
      }
    });
  }

  find(filter: <%= classify(name) %>Filter): Observable<<%= classify(name) %>[]> {
    const params = {<% for (const field of getFilterFields(model)) { %>
      '<%=field.name%>': filter.<%=field.name%>,<%  } %>
    };

    return this.http.get<<%= classify(name) %>[]>(this.api, {params, headers});
  }

  save(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    let params = new HttpParams();
    let url = '';
    if (entity.<%=id.name%>) {
      url = `${this.api}/${entity.<%=id.name%>.toString()}`;
      params = new HttpParams().set('ID', entity.<%=id.name%>.toString());
      return this.http.put<<%= classify(name) %>>(url, entity, {headers, params});
    } else {
      url = `${this.api}`;
      return this.http.post<<%= classify(name) %>>(url, entity, {headers, params});
    }
  }

  delete(entity: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    let params = new HttpParams();
    let url = '';
    if (entity.<%=id.name%>) {
      url = `${this.api}/${entity.<%=id.name%>.toString()}`;
      params = new HttpParams().set('ID', entity.<%=id.name%>.toString());
      return this.http.delete<<%= classify(name) %>>(url, {headers, params});
    }
    return EMPTY;
  }
}

