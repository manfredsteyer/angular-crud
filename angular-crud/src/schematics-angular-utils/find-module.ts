/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Path, join, normalize, relative } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';

export interface ModuleOptions {
  module?: string;
  name: string;
  flat?: boolean;
  sourceDir?: string;
  path?: string;
  skipImport?: boolean;
  appRoot?: string;
}


/**
 * Find the module referred by a set of options passed to the schematics.
 */
export function findModuleFromOptions(host: Tree, options: ModuleOptions, parent = false): Path | undefined {
  if (options.hasOwnProperty('skipImport') && options.skipImport) {
    return undefined;
  }

  let pathToCheck = (options.path || '');
  console.info('pathToCheck', pathToCheck);
  return normalize(findModule(host, pathToCheck, parent));
}

/**
 * Function to find the "closest" module to a generated file's path.
 */
export function findModule(host: Tree, generateDir: string, parent = false): Path {
  let dir: DirEntry | null = host.getDir('/' + generateDir);

  if (parent) {
    dir = dir.parent;
  }

  const moduleRe = /\.module\.ts$/;
  const routingModuleRe = /-routing\.module\.ts/;

  while (dir) {
    const matches = dir.subfiles.filter(p => moduleRe.test(p) && !routingModuleRe.test(p));

    if (matches.length == 1) {
      return join(dir.path, matches[0]);
    } else if (matches.length > 1) {
      throw new Error('More than one module matches. Use skip-import option to skip importing '
        + 'the component into the closest module.');
    }

    dir = dir.parent;
  }

  throw new Error('Could not find an NgModule for the new component. Use the skip-import '
    + 'option to skip importing components in NgModule.');
}

/**
 * Build a relative path from one file path to another file path.
 */
export function buildRelativePath(from: string, to: string): string {
  from = normalize(from);
  to = normalize(to);

  // Convert to arrays.
  const fromParts = from.split('/');
  const toParts = to.split('/');

  // Remove file names (preserving destination)
  fromParts.pop();
  const toFileName = toParts.pop();

  const relativePath = relative(normalize(fromParts.join('/')), normalize(toParts.join('/')));
  let pathPrefix = '';

  // Set the path prefix for same dir or child dir, parent dir starts with `..`
  if (!relativePath) {
    pathPrefix = '.';
  } else if (!relativePath.startsWith('.')) {
    pathPrefix = `./`;
  }
  if (pathPrefix && !pathPrefix.endsWith('/')) {
    pathPrefix += '/';
  }

  return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
}
