import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { HostTree } from '@angular-devkit/schematics';

const model: any = {
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
};

// tslint:disable:max-line-length
describe('Angular CRUD Schematics', () => {
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    path.join(__dirname, './../collection.json'),
  );

  const defaultOptions: any = {
    name: 'hotel'
  };

  let appTree: UnitTestTree;

  // tslint:disable-next-line:no-any
  const workspaceOptions: any = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };

  // tslint:disable-next-line:no-any
  const appOptions: any = {
    name: 'crudtest',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'css',
    skipTests: false,
  };

  beforeEach(async() => {
    const tree = new UnitTestTree(new HostTree);
    // add model file
    tree.create('/projects/crudtest/src/app/hotel/model.json', JSON.stringify(model));

    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions, tree).toPromise();
    appTree = await schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, appTree).toPromise();
  });

  it('should create hotel-list component files', (done) => {
    const files = ['hotel-list.component.html', 'hotel-list.component.spec.ts', 'hotel-list.component.ts'];
    const hotelListPath = '/projects/crudtest/src/app/hotel/hotel-list/';
    schematicRunner.runSchematicAsync('crud-module', defaultOptions, appTree).toPromise().then(tree => {
      files.forEach(f => {
        const path = `${hotelListPath}${f}`;
        expect(tree.exists(path)).toEqual(true);
      });
      done();
    }, done.fail);
  });

  it('should create hotel-edit component files', (done) => {
    const files = ['hotel-edit.component.html', 'hotel-edit.component.spec.ts', 'hotel-edit.component.ts'];
    const hotelListPath = '/projects/crudtest/src/app/hotel/hotel-edit/';
    schematicRunner.runSchematicAsync('crud-module', defaultOptions, appTree).toPromise().then(tree => {
      files.forEach(f => {
        const path = `${hotelListPath}${f}`;
        expect(tree.exists(path)).toEqual(true);
      });
      done();
    }, done.fail);
  });

  it('should add routes', (done) => {
    schematicRunner.runSchematicAsync('crud-module', defaultOptions, appTree).toPromise().then(tree => {
      const routingModule = tree.readContent('/projects/crudtest/src/app/hotel/hotel.routes.ts');
      expect(routingModule).toContain(`path: 'hotels'`);
      expect(routingModule).toContain(`path: 'hotels/:id'`);
      done();
    }, done.fail);
  });

  it('should import the module in the app module file', (done) => {
    schematicRunner.runSchematicAsync('crud-module', defaultOptions, appTree).toPromise().then(tree => {
      const appModule = tree.readContent('/projects/crudtest/src/app/app.module.ts');
      expect(appModule).toMatch(/.\/hotel\/hotel.module/);
      expect(appModule).toMatch(/HotelModule/);
      done();
    }, done.fail);
  });
});
