import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import RolePage from './components/pages/RolePage';
import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';
import UserPage from './components/pages/UserPage';
import LoginPage from './components/pages/LoginPage';
import UserLayout from './components/layouts/UserLayout';
import UserRoleMappingPage from './components/pages/UserRoleMappingPage';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AuthLayout />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<RolePage />} />
              <Route path="roles" element={<RolePage />} />
              <Route path="users" element={<UserPage />} />
              <Route path="user-role-mapping" element={<UserRoleMappingPage />} />
            </Route>
            <Route path="user" element={<UserLayout />}>
              <Route index element={<>No features yet</>} />
            </Route>
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
