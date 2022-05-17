# Angular CRUD

[![NPM version][npm-image]][npm-url] [![Build Status][actions-image]][actions-url] [![Dependency Status][daviddm-image]][daviddm-url]

Generating CRUD applications with the Angular CLI and Schematics.

<div>
  <p><img src="https://i.imgur.com/0MxujmK.png" alt="Scaffold files for CRUD" width="800"></p>
  <p><img src="https://i.imgur.com/u67zkJh.png" alt="Scaffold List" width="800"></p>
  <p><img src="https://i.imgur.com/36uZBGV.png" alt="Scaffold Detail View" width="800"></p>
</div>

## Tutorial: Getting Started

Follow the steps below to see how this library works, or [watch this screencast](https://www.youtube.com/watch?v=3mqWrmZtefE).

1. Clone this repository.

    ```
    git clone https://github.com/manfredsteyer/angular-crud
    ```

   You could also start with an empty project but this repo contains everything you need to get started quickly: theming, configured routing, and a menu.

2. Build the angular-crud schematic:

   ```
   cd angular-crud
   npm install
   npm run build
   npm pack
   ```
   
3. Install the needed npm packages:

   ```
   cd demo
   npm i --no-save ../angular-crud/*.tgz
   # or install the latest released version with: npm install -D angular-crud
   npm install
   ```

   NOTE: For Bootstrap and Angular Material, use `demo-bootstrap` and `demo-material` in the first command.

4. Switch to the folder `src/app` and create a sub-folder `hotel` with a file `model.json`. Put the following content into this file:

    ```json
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

	The generator is using a json5 parser. This means that you can use comments, omit quotation marks, and use trailing commas.  

5. In your project's root directory, run the following Angular CLI based command:

    ```
    ng g angular-crud:crud-module hotel
    ```

6. Have a look at the generated files.

7. Open the file `sidebar.component.html` and uncomment the link to the generated route.

8. Switch to the project's root and start the application:

    ```
    npm start
    ```

9. Open <http://localhost:4200> and switch to the menu item `Hotels`. You should now see your generated form.

    Please note, that you cannot save records with Ids 1 to 5 b/c they are restricted for demos.

## Bootstrap and Angular Material

This library supports Bootstrap, Angular Material, and Paper Dashboard templates. It attempts to determine which templates to use by inspecting your `package.json`. You can also force which templates to use:

- `--style bootstrap`: forces Bootstrap templates
- `--style material`: forces Angular Material templates
- `--style paper-dashboard`: forces Paper Dashboard templates

For example:

```shell
ng g angular-crud:crud-module note --style bootstrap
```

Paper Dashboard is the default if you don't specify a `--style` parameter and no Bootstrap or Angular Material dependencies are found in `package.json`.

### Bootstrap Screenshots

<div>
  <p><img src="https://imgur.com/8KICSze.png" alt="Bootstrap List" width="800"></p>
  <p><img src="https://imgur.com/VXDoUbB.png" alt="Bootstrap Detail View" width="800"></p>
</div>

### Material Screenshots

<div>
  <p><img src="https://imgur.com/f4fUECE.png" alt="Angular Material List" width="800"></p>
  <p><img src="https://imgur.com/VTviuMS.png" alt="Angular Material Detail View" width="800"></p>
</div>

## Extending angular-crud

You can fork this repo and extend the generated code using Schematics. Information about how to use Schematics can be found here:

- [Generating Custom Code With The Angular CLI And Schematics](https://softwarearchitekt.at/post/2017/10/29/generating-custom-code-with-the-angular-cli-and-schematics.aspx)
- [Automatically Updating Angular Modules With Schematics And The CLI](https://softwarearchitekt.at/post/2017/12/01/generating-angular-code-with-schematics-part-ii-modifying-ngmodules.aspx)
- [Use Angular Schematics to Simplify Your Life](https://developer.okta.com/blog/2019/02/13/angular-schematics)

## Call for Contributions

- Validation
- Navigating between Records
- Lookups with dropdown fields etc.
- Configure Base URL
- Supporting more field types (date, checkbox etc.)

If you want to contribute one of those features or other features feel free to reach out. Let's join forces to provide a great solution!

## More Information

- [Angular Workshops and Trainings](https://www.softwarearchitekt.at)

[npm-image]: https://img.shields.io/npm/v/angular-crud.svg
[npm-url]: https://www.npmjs.com/package/angular-crud
[actions-image]: https://github.com/manfredsteyer/angular-crud/workflows/Angular%20CRUD%20CI/badge.svg?branch=main
[actions-url]: https://github.com/manfredsteyer/angular-crud/actions
[daviddm-image]: https://david-dm.org/manfredsteyer/angular-crud.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/manfredsteyer/angular-crud
