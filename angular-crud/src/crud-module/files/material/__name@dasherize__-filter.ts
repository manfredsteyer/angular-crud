export class <%= classify(name) %>Filter {<% for (let field of getFilterFields(model)) { %>
  <%=field.name%> = '';<%  } %>
}
