
// Option A: Directly referencing the private APIs
// import { ModuleOptions, buildRelativePath } from "@schematics/angular/utility/find-module";
// import { Rule, Tree, SchematicsException } from "@angular-devkit/schematics";
// import { dasherize, classify } from "@angular-devkit/core";
// import { addDeclarationToModule, addExportToModule } from "@schematics/angular/utility/ast-utils";
// import { InsertChange } from "@schematics/angular/utility/change";

// Option B: Using a fork of the private APIs b/c they can change

import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics';
import { AddImportToModuleContext } from './add-to-module-context';
import * as ts from 'typescript';
import { strings as stringUtils } from '@angular-devkit/core';

// Referencing forked and copied private APIs 
import { ModuleOptions, buildRelativePath } from '../schematics-angular-utils/find-module';
import { addImportToModule } from '../schematics-angular-utils/ast-utils';
import { InsertChange } from '../schematics-angular-utils/change';



export function addImportToParentModule(options: ModuleOptions): Rule {
  return (host: Tree) => {
    addImport(host, options);
    return host;
  };
}

function createAddImportToModuleContext(host: Tree, options: ModuleOptions): AddImportToModuleContext {

  const result = new AddImportToModuleContext();

  if (!options.module) {
    throw new SchematicsException(`Module not found.`);
  }

  const text = host.read(options.module);

  if (text === null) {
    throw new SchematicsException(`File ${options.module} does not exist.`);
  }
  const sourceText = text.toString('utf-8');
  result.source = ts.createSourceFile(options.module, sourceText, ts.ScriptTarget.Latest, true);

  const moduleToImportPath = `/${options.sourceDir}/${options.path}/`
      + stringUtils.dasherize(options.name)
      + '.module';

  result.relativePath = buildRelativePath(options.module, moduleToImportPath);

  result.classifiedName = stringUtils.classify(`${options.name}Module`);

  return result;

}

function addImport(host: Tree, options: ModuleOptions) {

  const context = createAddImportToModuleContext(host, options);
  const modulePath = options.module || '';

  const declarationChanges = addImportToModule(context.source,
    modulePath,
      context.classifiedName,
      context.relativePath);

  const declarationRecorder = host.beginUpdate(modulePath);
  for (const change of declarationChanges) {
    if (change instanceof InsertChange) {
      declarationRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  host.commitUpdate(declarationRecorder);
};

