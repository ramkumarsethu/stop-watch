import BasicForm from '../lib/Form';
import { FORM_TYPE } from 'src/types/Form';
import BasicTable from '../lib/Table';

const UserPage = () => {
  return (
    <>
      <h3 className="pt-2">Manage Users</h3>
      <hr className="mt-0"></hr>
      <BasicForm formType={FORM_TYPE.USERS}></BasicForm>
      <BasicTable formType={FORM_TYPE.USERS}></BasicTable>
    </>
  );
};

export default UserPage;
