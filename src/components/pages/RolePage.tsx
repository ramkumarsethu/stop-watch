import BasicForm from '../lib/Form';
import { FORM_TYPE } from 'src/types/Form';
import BasicTable from '../lib/Table';

const RolePage = () => {
  return (
    <>
      <BasicForm formType={FORM_TYPE.ROLES}></BasicForm>
      <BasicTable formType={FORM_TYPE.ROLES}></BasicTable>
    </>
  );
};

export default RolePage;
