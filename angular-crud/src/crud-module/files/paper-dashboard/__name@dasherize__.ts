export class <%= classify(name) %> {<% for (let field of model.fields) { %>
  <%=field.name%>!: <%if (field.type === 'date') { %>Date<% } else { %><%=field.type%><% } %>;<% } %>
}
