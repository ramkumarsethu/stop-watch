import React from 'react';
import BasicForm from './lib/Form';
import { roleFormFieldsConfig } from '../config/fields/roles';
import { FORM_TYPE } from '../types/Form';

const RoleForm: React.FC = () => {
  return (
    <>
      <BasicForm formType={FORM_TYPE.ROLES} fields={roleFormFieldsConfig}></BasicForm>
    </>
  );
};

export default RoleForm;
