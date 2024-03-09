import { FieldConfig } from '../../types/Form';
import * as yup from 'yup';

export const roleFormFieldsConfig: Array<FieldConfig> = [
  {
    name: 'role_name',
    type: 'TextField',
    displayName: 'Role Name',
    placeholderText: 'Please enter Role Name...',
    validationRule: yup
      .string()
      .required('Role Name is a required field. Maximum allowed is 10 characters.')
      .max(30, 'maximum allowed is 10 characters.'),
    tableStyle: {
      width: '45%'
    },
    searchable: true
  },
  {
    name: 'role_description',
    displayName: 'Role Description',
    type: 'TextArea',
    placeholderText: 'Please enter Role description...',
    validationRule: yup
      .string()
      .required('Role Description is a required field. Maximum allowed is 10 characters.')
      .max(10, 'maximum allowed is 10 characters.'),
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
