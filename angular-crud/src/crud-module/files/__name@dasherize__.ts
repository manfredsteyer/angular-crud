export class <%= classify(name) %> {<% for (let field of model.fields) { %>
    <%=field.name%>: <%=field.type%>;<% } %>    
}