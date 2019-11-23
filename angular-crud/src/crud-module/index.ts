import {
  apply,
  branchAndMerge,
  chain, FileEntry, forEach, MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { strings as stringUtils } from '@angular-devkit/core';

import * as JSON5 from 'json5';
import * as crudModelUtils from '../utils/crud-model-utils'

import { MenuOptions } from './schema';
import { CrudModel } from './model';

import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { addModuleImportToModule, findModuleFromOptions } from 'schematics-utilities';
import { capitalize } from '@angular-devkit/core/src/utils/strings';

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
    options.module = findModuleFromOptions(host, options) || '';

    const modelFile = `${options.path}/${options.name}/${options.model}`;
    const modelBuffer = host.read(modelFile);

    if (modelBuffer === null) {
      throw new SchematicsException(`Model file ${options.model} does not exist.`);
    }

    const modelJson = modelBuffer.toString('utf-8');
    const model = JSON5.parse(modelJson) as CrudModel;

    // add imports to app.module.ts
    addModuleImportToModule(host,
      `${options.path}/app.module.ts`,
      `${capitalize(model.entity)}Module`,
      `./${options.name}/${model.entity}.module`);

    const templateSource = apply(url('./files'), [
      template({
        ...stringUtils,
        ...options,
        ...crudModelUtils as any,
        model
      }),
      move(`${options.path}/${options.name}` || ''),
      // fix for https://github.com/angular/angular-cli/issues/11337
      forEach((fileEntry: FileEntry) => {
        if (host.exists(fileEntry.path)) {
          host.overwrite(fileEntry.path, fileEntry.content);
        }
        return fileEntry;
      }),
    ]);

    const rule = chain([
      branchAndMerge(chain([
        mergeWith(templateSource, MergeStrategy.Overwrite)
      ])),
    ]);

    return rule(host, context);
  }
}
