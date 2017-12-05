import { Field, ShowOptions, CrudModel } from "../crud-module/model";
import { SchematicsException } from "@angular-devkit/schematics/src/exception/exception";

export function filterField(field: Field): boolean {

    let show: string[];
    if (!field) return false;
    if (!field.show) return true;

    if (typeof field.show === 'string') {
        show = field.show.split(' ');
    }
    else {
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