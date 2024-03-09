import BasicForm from '../lib/Form';
import { FORM_TYPE } from 'src/types/Form';
import { roleFormFieldsConfig } from 'src/config/fields/roles';
import BasicTable from '../lib/Table';

const RolePage = () => {
  return (
    <>
      <BasicForm formType={FORM_TYPE.ROLES} fields={roleFormFieldsConfig}></BasicForm>
      <BasicTable formType={FORM_TYPE.ROLES} fieldConfig={roleFormFieldsConfig}></BasicTable>
    </>
  );
};

export default RolePage;
