import { Outlet, useLocation } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
