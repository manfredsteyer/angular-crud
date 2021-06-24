import {
  apply,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { strings as stringUtils } from '@angular-devkit/core';

import * as JSON5 from 'json5';
import * as crudModelUtils from '../utils/crud-model-utils'

import { CrudOptions } from './schema';
import { CrudModel } from './model';
import { capitalize } from '@angular-devkit/core/src/utils/strings';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { addModuleImportToModule } from '@angular/cdk/schematics';

export function generate(options: CrudOptions): Rule {

  return async (host: Tree) => {

    const workspace = await getWorkspace(host);
    if (!options.project) {
      options.project = workspace.projects.keys().next().value;
    }
    const project = workspace.projects.get(options.project);
    const appPath = `${project?.sourceRoot}/app`;

    const modelFile = `${appPath}/${options.name}/${options.model}`;
    const modelBuffer = host.read(modelFile);

    if (modelBuffer === null) {
      throw new SchematicsException(`Model file ${options.model} does not exist.`);
    }

    const modelJson = modelBuffer.toString('utf-8');
    const model = JSON5.parse(modelJson) as CrudModel;

    // add imports to app.module.ts
    addModuleImportToModule(host,
      `${appPath}/app.module.ts`,
      `${capitalize(model.entity)}Module`,
      `./${options.name}/${model.entity}.module`);

    const templateSource = apply(url(`./files/${options.style}`), [
      template({
        ...stringUtils,
        ...options,
        ...crudModelUtils as any,
        model
      }),
      move(`${appPath}/${options.name}`),
    ]);

    return mergeWith(templateSource, MergeStrategy.Overwrite);
  }
}
