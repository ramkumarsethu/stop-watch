import BasicForm from '../lib/Form';
import { FORM_TYPE, FormEntity } from 'src/types/Form';
import BasicModal from '../lib/modals/Modal';
import { formFieldsConfig } from 'src/config/config';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from 'src/store/slices/LoginSlice';

const LoginPage: React.FC = () => {
  const data = useAppSelector((state) => state.entities);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showError, setShowError] = useState(false);

  const preSubmitHandler = (entity: FormEntity) => {
    const { _type } = entity;
    const loginField = formFieldsConfig[_type].find((e) => e.loginField);
    const passwordField = formFieldsConfig[FORM_TYPE.USERS].find((e) => e.passwordField);
    console.log(loginField, passwordField);
    if (loginField && passwordField) {
      const id = entity[loginField.name]; //id used for login is email
      const password = entity[passwordField.name];
      console.log(id, password);
      const user = data[FORM_TYPE.USERS].find(
        (e) => e[loginField.name] === id && e[passwordField.name] === password
      );
      console.log(user);
      if (user) {
        setShowError(true);
        dispatch(login(user));
        navigate('/');
      } else {
        setShowError(!user);
      }
    }
    return false;
  };

  return (
    <BasicModal
      modalSize={'sm'}
      showCloseButton={false}
      handleClose={() => {
        /**/
      }}
      showModal={true}
      title="Login"
      floatingBackdrop={false}>
      <div>
        <BasicForm
          preSubmitHandler={preSubmitHandler}
          buttonLabel="Login"
          useFullGrid={true}
          formType={FORM_TYPE.LOGIN}></BasicForm>
        {showError && (
          <span className="d-flex justify-content-center text-danger mt-2">
            Invalid credentials. Please try again
          </span>
        )}
      </div>
    </BasicModal>
  );
};

export default LoginPage;
