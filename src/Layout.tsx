import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //navigate("/login");
  }, [navigate]);

  return (
    <>
      <div>Nav here</div>
      {Math.random() < 0.5 ? <Outlet /> : <Navigate to={'login'} />}
    </>
  );
};

export default Layout;
