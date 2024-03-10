import { FieldConfig } from '../../types/Form';
import * as yup from 'yup';
import { userFormFieldsConfig } from './users';

export const loginFormFieldsConfig: Array<FieldConfig> = [
  userFormFieldsConfig.find((e) => e.loginField) || { name: '', type: 'Hidden' }, //fallback is added just to satisfy ts compiler and never really used
  {
    name: userFormFieldsConfig.find((e) => e.passwordField)?.name || '',
    displayName: 'Password',
    type: 'Password',
    validationRule: yup.string().required('Password is a required field')
  }
];
