import { chain, mergeWith, SchematicsException } from '@angular-devkit/schematics';
import { dasherize, classify, camelize, capitalize } from '@angular-devkit/core';

import { apply, move, Rule, template, url, branchAndMerge, Tree, SchematicContext } from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import { addImportToParentModule } from '../utils/ng-module-utils';
import { findModuleFromOptions } from '../schematics-angular-utils/find-module';

import * as JSON5 from 'json5';
import * as crudModelUtils from '../utils/crud-model-utils'

import { MenuOptions } from './schema';
import { CrudModel } from './model';

const stringUtils = { dasherize, classify, camelize, capitalize };

export default function (options: MenuOptions): Rule {

    return (host: Tree, context: SchematicContext) => {

      options.path = options.path ? normalize(options.path) : options.path;
      options.module = findModuleFromOptions(host, options, true) || '';

      const modelFile = `/${options.sourceDir}/${options.path}/${options.model}`;
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
        move(options.sourceDir)
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