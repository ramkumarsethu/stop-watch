import { FieldConfig } from '../../types/Form';
import * as yup from 'yup';

export const roleFormFieldsConfig: Array<FieldConfig> = [
  {
    name: 'role_name',
    type: 'TextField',
    displayName: 'Role Name',
    validationRule: yup
      .string()
      .required('Role Name is a required field. Maximum allowed is 30 characters.')
      .max(30, 'maximum allowed is 30 characters.'),
    tableStyle: {
      width: '45%'
    },
    searchable: true,
    referenceable: true
  },
  {
    name: 'role_description',
    displayName: 'Role Description',
    type: 'TextArea',
    validationRule: yup
      .string()
      .required('Role Description is a required field. Maximum allowed is 100 characters.')
      .max(100, 'maximum allowed is 100 characters.'),
    tableStyle: {
      width: '45%'
    }
  },
  {
    name: 'Comments',
    displayName: 'Role comments (Optional)',
    type: 'TextField'
  }
];
