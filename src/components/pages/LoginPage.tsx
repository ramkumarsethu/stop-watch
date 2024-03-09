import { loginFormFieldsConfig } from 'src/config/fields/login';
import BasicForm from '../lib/Form';
import { FORM_TYPE } from 'src/types/Form';
import BasicModal from '../lib/modals/Modal';

const LoginPage: React.FC = () => {
  return (
    <BasicModal
      modalSize={'lg'}
      showCloseButton={false}
      handleClose={() => {
        /**/
      }}
      showModal={true}
      title="Login"
      floatingBackdrop={false}>
      <BasicForm
        buttonLabel="Login"
        useFullGrid={true}
        fields={loginFormFieldsConfig}
        formType={FORM_TYPE.LOGIN}></BasicForm>
    </BasicModal>
  );
};

export default LoginPage;
