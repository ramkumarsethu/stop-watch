import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { roleFormFieldsConfig } from 'src/config/fields/roles';
import { userFormFieldsConfig } from 'src/config/fields/users';
import { useAppSelector } from 'src/store/store';
import { FORM_TYPE } from 'src/types/Form';

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginData = useAppSelector((state) => state.login.LOGIN);
  const roleEntities = useAppSelector((state) => state.entities.ROLES);

  useEffect(() => {
    if (!(Object.keys(loginData).length > 0)) {
      navigate('/login');
    } else {
      const userRoleName = userFormFieldsConfig.find(
        (e) => e.referenceEntity?.referenceType === FORM_TYPE.ROLES
      )?.name;
      if (userRoleName) {
        const roleObject = roleEntities.find((e) => e.id === loginData[userRoleName]);
        const roleName = roleFormFieldsConfig.find((e) => e.referenceable)?.name;
        if (roleName && roleObject) {
          //console.log(roleName, roleObject);
          const role = roleObject[roleName];
          if (location.pathname === '/') {
            // if the path not requested, path is selected and routed based on the user's role
            if (role === 'Admin') {
              navigate('/admin');
            } else {
              navigate('/user');
            }
          } else if (
            (location.pathname.endsWith('/admin') || location.pathname.includes('/admin/')) &&
            role !== 'Admin'
          ) {
            //if non-admin user requesting a admin route
            navigate('/user');
          }
        }
      }
    }
  }, [navigate, loginData, location, roleEntities]);

  return <>{<Outlet />}</>;
};

export default AuthLayout;
