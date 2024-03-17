import { FORM_TYPE, FieldConfig } from '../../types/Form';
import * as yup from 'yup';
import { roleFormFieldsConfig } from './roles';

export const userFormFieldsConfig: Array<FieldConfig> = [
  {
    name: 'full_name',
    type: 'TextField',
    displayName: 'Full Name',
    validationRule: yup
      .string()
      .required('Full Name is a required field. Maximum allowed is 50 characters.')
      .max(50, 'maximum allowed is 50 characters.'),
    tableStyle: {
      width: '30%'
    },
    searchable: true,
    referenceable: true
  },
  {
    name: 'email',
    displayName: 'Email',
    type: 'TextField',
    validationRule: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email address is a required field'),
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
