import { CSSProperties } from 'react';
import { Schema } from 'yup';

export type FieldConfig = {
  name: string;
  displayName: string;
  type: 'TextField' | 'TextArea' | 'Dropdown' | 'Password';
  validationRule?: Schema;
  placeholderText?: string;
  tableStyle?: CSSProperties;
  searchable?: boolean;
  referenceable?: boolean;
  referenceEntity?: {
    referenceType: FORM_TYPE;
    referenceDisplayLabel: string;
  };
};

export type FormEntity = { id: string; _type: FORM_TYPE; [x: string]: string };

export enum FORM_TYPE {
  ROLES = 'ROLES',
  USERS = 'USERS',
  LOGIN = 'LOGIN'
}
