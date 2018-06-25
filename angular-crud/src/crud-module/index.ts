import { chain, mergeWith, SchematicsException } from '@angular-devkit/schematics';
import { strings as stringUtils } from '@angular-devkit/core';

import { apply, move, Rule, template, url, branchAndMerge, Tree, SchematicContext } from '@angular-devkit/schematics';
import { addImportToParentModule } from '../utils/ng-module-utils';

import * as JSON5 from 'json5';
import * as crudModelUtils from '../utils/crud-model-utils'

import { MenuOptions } from './schema';
import { CrudModel } from './model';

import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { findModuleFromOptions } from '../schematics-angular-utils/find-module';

function setupOptions(options: MenuOptions, host: Tree): void {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  if (options.path === undefined) {
    const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
    options.path = `/${project.root}/src/${projectDirName}`;
  }

  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;

}

export default function (options: MenuOptions): Rule {

    return (host: Tree, context: SchematicContext) => {

      setupOptions(options, host);
      options.module = findModuleFromOptions(host, options, true) || '';

      const modelFile = `/${options.path}/${options.model}`;
      const modelBuffer = host.read(modelFile);

      if (modelBuffer === null) {
        throw new SchematicsException(`Model file ${options.model} does not exist.`);
      }

      const modelJson = modelBuffer.toString('utf-8');
      const model = JSON5.parse(modelJson) as CrudModel;

      const templateSource = apply(url('./files'), [
        template({
          ...stringUtils,
          ...options,
          ...crudModelUtils as any,
          model
        }),
        move(options.path || '')
      ]);

      const rule = chain([
        branchAndMerge(chain([
          mergeWith(templateSource),
          addImportToParentModule(options)
        ])),
      ]);

      return rule(host, context);
    }
}