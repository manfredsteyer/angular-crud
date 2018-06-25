# angular-crud

Generating CRUD applications with the Angular CLI and Schematics.

![Scaffold files for CRUD](https://i.imgur.com/1XWTXRF.png)

![Scaffoled List](https://i.imgur.com/5bARUTm.png)

![Scaffoled Detail View](https://i.imgur.com/8XRkCjq.png)

## Tutorial: Getting Started 

1. Clone the following repo ``https://github.com/manfredsteyer/angular-crud``
    ```
    git clone https://github.com/manfredsteyer/angular-crud
    ```

   You could also start with an empty project but this repo contains everything you need to get started quickly: theming, configured routing and a menu.

2. Install the needed npm packages:

   ```
   cd angular-crud
   npm install
   ```

   Note, that this also installs ``angular-crud``.

3. Switch to the folder ``src\app\hotel`` and create a file ``model.json`` with following content:

    ```
    { 
        "title": "Hotel",
        "entity": "hotel",
        "api": {
          "url": "http://www.angular.at/api/hotel"
        },
        "filter": [
          "city"
        ],
        "fields": [
          {
            "name": "id",
            "label": "Id",
            "isId": true,
            "readonly": true,
            "type": "number"
          },
          {
            "name": "name",
            "type": "string",
            "label": "Name"
          },
          {
            "name": "city",
            "type": "string",
            "label": "City"
          },
          {
            "name": "stars",
            "type": "string",
            "control": "number",
            "label": "Stars"
          } 
        ]
    }
    ```

	The generator is using a json5 parser. This means that you can use comments, omit quotation marks and use trailing commas.  

4. In the same folder, run the following Angular CLI based command:

    ```
    ng g crud-module hotel --collection angular-crud 
    ```
5. Now, you get files generated for managing hotels.

6. Switch to the project's root and start the application:

    ```
    npm start
    ```

7. Open ``localhost:4200`` and switch to the menu item ``Hotel``. You should now see your generated form.

    Please note, that you cannot save  records with Ids 1 to 5 b/c they are restricted for demos.

## Extending angular-crud

You can fork this repo and extend the generated code using Schematics. Infos about how to use Schematics can be found here:

- [Generating Custom Code With The Angular CLI And Schematics](https://softwarearchitekt.at/post/2017/10/29/generating-custom-code-with-the-angular-cli-and-schematics.aspx)
- [Automatically Updating Angular Modules With Schematics And The CLI](https://softwarearchitekt.at/post/2017/12/01/generating-angular-code-with-schematics-part-ii-modifying-ngmodules.aspx)

## Coming Features and Call for Contributions

The following features are planned for the next time:

- Deleting records
- Validation
- Navigating between Records
- Lookups with dropdown fields etc.
- Configure Base URL
- Supporting more field types (date, checkbox etc.)

If you want to contribute one of those features or other features feel free to reach out. Let's join forces to provide a great solution!

