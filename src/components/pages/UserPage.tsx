import BasicForm from '../lib/Form';
import { FORM_TYPE } from 'src/types/Form';
import BasicTable from '../lib/Table';
import { userFormFieldsConfig } from 'src/config/fields/users';

const UserPage = () => {
  return (
    <>
      <BasicForm formType={FORM_TYPE.USERS} fields={userFormFieldsConfig}></BasicForm>
      <BasicTable formType={FORM_TYPE.USERS} fieldConfig={userFormFieldsConfig}></BasicTable>
    </>
  );
};

export default UserPage;
