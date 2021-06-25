import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { <%= classify(name) %>ListComponent } from './<%=dasherize(name)%>-list/<%=dasherize(name)%>-list.component';
import { <%= classify(name) %>EditComponent } from './<%=dasherize(name)%>-edit/<%=dasherize(name)%>-edit.component';
import { <%= classify(name) %>Service } from './<%=dasherize(name)%>.service';
import { <%= name.toUpperCase() %>_ROUTES } from './<%=dasherize(name)%>.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    RouterModule.forChild(<%= name.toUpperCase() %>_ROUTES),
  ],
  declarations: [
    <%= classify(name) %>ListComponent,
    <%= classify(name) %>EditComponent
  ],
  providers: [<%= classify(name) %>Service],
  exports: []
})
export class <%= classify(name) %>Module { }
