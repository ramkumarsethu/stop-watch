import { FieldConfig } from '../../types/Form';
import * as yup from 'yup';

export const loginFormFieldsConfig: Array<FieldConfig> = [
  {
    name: 'user_name',
    type: 'TextField',
    displayName: 'Email',
    placeholderText: 'Please enter your email address...',
    validationRule: yup
      .string()
      .required('Email is a required field')
      .email('Please enter valid email address')
  },
  {
    name: 'password',
    displayName: 'Password',
    type: 'Password',
    placeholderText: 'Please enter your password...',
    validationRule: yup.string().required('Password is a required field')
  }
];
