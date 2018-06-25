import { Routes } from '@angular/router';
import { <%= classify(name) %>ListComponent } from './<%=dasherize(name)%>-list/<%=dasherize(name)%>-list.component';
import { <%= classify(name) %>EditComponent } from './<%=dasherize(name)%>-edit/<%=dasherize(name)%>-edit.component';

export const <%=name.toUpperCase()%>_ROUTES: Routes = [
  {
    path: '<%=dasherize(name)%>',
    component: <%= classify(name) %>ListComponent
  },
  {
    path: '<%=dasherize(name)%>/:id',
    component: <%= classify(name) %>EditComponent
  }
]
