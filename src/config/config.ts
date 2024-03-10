import { FORM_TYPE, FieldConfig } from 'src/types/Form';
import { roleFormFieldsConfig } from './fields/roles';
import { userFormFieldsConfig } from './fields/users';
import { loginFormFieldsConfig } from './fields/login';

export const formFieldsConfig: Record<FORM_TYPE, FieldConfig[]> = {
  LOGIN: loginFormFieldsConfig,
  ROLES: roleFormFieldsConfig,
  USERS: userFormFieldsConfig
};
