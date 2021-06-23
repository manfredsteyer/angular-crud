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

import { parseName } from '@schematics/angular/utility/parse-name';
import { capitalize } from '@angular-devkit/core/src/utils/strings';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';

async function setupOptions(options: MenuOptions, host: Tree): Promise<void> {
  const workspace = await getWorkspace(host);
  if (!options.project) {
    options.project = workspace.projects.keys().next().value;
  }
  const project = workspace.projects.get(options.project);

  if (options.path === undefined) {
    const projectDirName = project?.prefix === 'application' ? 'app' : 'lib';
    options.path = `/${project?.sourceRoot}/src/${projectDirName}`;
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

    const templateSource = apply(url(`./files/${options.style}`), [
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
