import { CrudModel, Field, Property, ShowOptions } from '../crud-module/model';
import { SchematicsException } from '@angular-devkit/schematics/src/exception/exception';
import { camelize } from '@angular-devkit/core/src/utils/strings';
import * as ts from "typescript";

export function filterField(field: Field): boolean {

  let show: string[];
  if (!field) return false;
  if (!field.show) return true;

  if (typeof field.show === 'string') {
    show = field.show.split(' ');
  } else {
    show = field.show;
  }

  const filter: ShowOptions = 'filter';
  return show.indexOf(filter) > -1;

}

export function getFilterFields(model: CrudModel): Field[] {
  if (!model.filter) return model.fields;

  return model.fields.filter(
    field => model.filter.indexOf(field.name) > -1);
}

export function getId(model: CrudModel): Field {
  let id = model.fields.find(f => f.isId);
  if (!id) throw new SchematicsException('No id found');
  return id;
}

/**
 Returns the plural form of a string
 ```javascript
 'innerHTML'.pluralize()         // 'InnerHTMLs'
 'action_name'.pluralize()       // 'actionNames'
 'css-class-name'.pluralize()    // 'cssClassNames'
 'regex'.pluralize()            // 'regexes'
 'user'.pluralize()             // 'users'
 ```
 */
export function pluralize(str: string): string {
  return camelize(
    [/([^aeiou])y$/, /()fe?$/, /([^aeiou]o|[sxz]|[cs]h)$/].map(
      (c, i) => (str = str.replace(c, `$1${'iv'[i] || ''}e`))
    ) && str + 's'
  );
}

export function enrichWithTsModel(model: CrudModel, tsModelFile: string) {

  let program = ts.createProgram([tsModelFile], { allowJs: false });
  const sourceFile = program.getSourceFile(tsModelFile);

  ts.forEachChild(sourceFile!, node => {
    if (ts.isTypeAliasDeclaration(node)) {
      node.forEachChild(child => {
        if (ts.isTypeLiteralNode(child)) {
          child.forEachChild(prop => {
            if (ts.isPropertySignature(prop)) {

              prop.forEachChild(propChild => {
                if (ts.isIdentifier(propChild)) {

                  let signature = prop.getFullText(sourceFile);
                  let propName = propChild.escapedText.toString();

                  // does the field with the same name exist? if so, merge
                  let field = model.fields.find(f => f.name === propName);

                  // is id?
                  let isId = false;
                  if (signature.indexOf('id') > 0) {
                    isId = true;
                  }

                  let propType = 'string';      // property type
                  let htmlInputType = 'text';   // html control
                  let nullable = false;

                  if (signature.indexOf('boolean') > 0) {
                    propType = 'boolean';
                    htmlInputType = 'checkbox';
                  }

                  if (signature.indexOf('number') > 0) {
                    propType = 'number';
                    htmlInputType = 'number';
                  }

                  if (signature.indexOf('date') > 0 || signature.indexOf('Date') > 0) {
                    propType = 'Date';
                    htmlInputType = 'date';
                  }

                  if (signature.indexOf('| null') > 0) {
                    nullable = true;
                  }

                  let property: Property = { name: propName, signature, type: propType, nullable };

                  if (field === null || field === undefined) {
                    field = {
                      name: propName,
                      isId: isId,
                      readonly: false,
                      disabled: false,
                      required: false,
                      type: htmlInputType,
                      control: htmlInputType,
                      label: propName,
                      default: '',
                      validation: '',
                      show: '',
                      property,
                    };

                    model.fields.push(field);

                  } else {
                    field.control = htmlInputType;
                    field.isId = isId;
                    field.property = property;
                  }
                }
              })
            }
          })
        }
      })
    }
  })

}