import BasicForm from '../lib/Form';
import { FORM_TYPE } from 'src/types/Form';
import BasicTable from '../lib/Table';

const RolePage = () => {
  return (
    <>
      <h3 className="pt-2">Manage Roles</h3>
      <hr className="mt-0"></hr>
      <BasicForm formType={FORM_TYPE.ROLES}></BasicForm>
      <BasicTable formType={FORM_TYPE.ROLES}></BasicTable>
    </>
  );
};

export default RolePage;
