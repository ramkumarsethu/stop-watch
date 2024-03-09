import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import Layout from './Layout';
import RolePage from './components/pages/RolePage';
import UserPage from './components/pages/UserPage';
import LoginPage from './components/pages/LoginPage';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RolePage />} />
            <Route path="admin/roles" element={<RolePage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="nonadmin" element={<div>Non Admin user</div>} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
