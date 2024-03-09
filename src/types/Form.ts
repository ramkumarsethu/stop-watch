import { CSSProperties } from 'react';
import { Schema } from 'yup';

export type FieldConfig = {
  name: string;
  displayName: string;
  type: 'TextField' | 'TextArea' | 'Dropdown' | 'hidden';
  validationRule?: Schema;
  placeholderText?: string;
  tableStyle?: CSSProperties;
  searchable?: boolean;
};

export type FormEntity = { id: string; _type: FORM_TYPE; [x: string]: string };

export enum FORM_TYPE {
  ROLES = 'ROLES',
  USERS = 'USERS'
}
