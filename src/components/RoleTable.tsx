import React from 'react';
import { roleFormFieldsConfig } from '../config/fields/roles';
import { FORM_TYPE } from '../types/Form';
import BasicTable from './lib/Table';

const RoleTable: React.FC = () => {
  return (
    <>
      <BasicTable fieldConfig={roleFormFieldsConfig} formType={FORM_TYPE.ROLES}></BasicTable>
    </>
  );
};

export default RoleTable;
