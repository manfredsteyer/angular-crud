export interface CrudModel {
  title: string;
  entity: string;
  api: CrudEndpoints;
  filter: string[];
  fields: Field[];
}

export interface CrudEndpoints {
  url: string;
}

export interface Field {
  name: string;
  isId: boolean;
  readonly: boolean;
  disabled: boolean;
  required: boolean;
  type: TypeOptions | string;
  control: ControlOptions | string;
  label: string;
  default: any;
  validation: string;
  show: ShowOptions[] | string;
  property: Property;
}

export type TypeOptions = 'text' | 'number' | 'date';
export type ShowOptions = 'filter' | 'list' | 'insert' | 'update';
export type ControlOptions = 'text' | 'number' | 'date' | 'datetime-local' | 'time' | 'month' | 'checkbox' | 'password' | 'email';
export type PropertyTypeOptions = 'string' | 'number' | 'boolean' | 'Date';

export type Property = {
  name: string;
  signature: any;
  type: PropertyTypeOptions | string;
  nullable: boolean;
}