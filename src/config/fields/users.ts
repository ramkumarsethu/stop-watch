import { FORM_TYPE, FieldConfig } from '../../types/Form';
import * as yup from 'yup';
import { roleFormFieldsConfig } from './roles';

export const userFormFieldsConfig: Array<FieldConfig> = [
  {
    name: 'full_name',
    type: 'TextField',
    displayName: 'Full Name',
    placeholderText: 'Please enter Full Name...',
    validationRule: yup
      .string()
      .required('Full Name is a required field. Maximum allowed is 50 characters.')
      .max(10, 'maximum allowed is 50 characters.'),
    tableStyle: {
      width: '30%'
    },
    searchable: true
  },
  {
    name: 'email',
    displayName: 'Email',
    type: 'TextField',
    placeholderText: 'Please enter email address...',
    validationRule: yup
      .string()
      .email('Email is a required field. Please enter valid email address')
      .required('Please enter valid email address'),
    tableStyle: {
      width: '30%'
    },
    loginField: true
  },
  {
    name: 'role',
    displayName: 'Role',
    type: 'Dropdown',
    validationRule: yup.string().required('Please select a role'),
    tableStyle: {
      width: '30%'
    },
    referenceEntity: {
      referenceType: FORM_TYPE.ROLES,
      referenceDisplayLabel: roleFormFieldsConfig.find((e) => e.referenceable)?.name || ''
    }
  },
  {
    name: 'password',
    type: 'Hidden',
    passwordField: true
  }
];
