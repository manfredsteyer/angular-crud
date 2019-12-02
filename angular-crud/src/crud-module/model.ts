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
  type: TypeOptions;
  control: ControlOptions | string;
  label: string;
  default: any;
  validation: string;
  show: ShowOptions[] | string;
}

export type TypeOptions = 'text' | 'number' | 'date';
export type ShowOptions = 'filter' | 'list' | 'insert' | 'update';
export type ControlOptions = 'text';
