import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export class <%= classify(name) %> {

    static getModelForm(): FormGroup {

        return new FormGroup({
          <% for (let field of model.fields) { %>
            <%=field.name%>: new FormControl({ value: '' <%if (field.disabled) { %>, disabled: true <% }%>}<%if (field.required) { %>, [Validators.required]<% }%>),
          <% } %>            
        });
    }
 }
