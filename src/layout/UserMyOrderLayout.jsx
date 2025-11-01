import { Navigate, Outlet } from 'react-router';
import { isLoggedIn } from '../helpers/user/user';

const UserMyOrderLayout = () => {
  const isUserExist = isLoggedIn()
  if (!isUserExist) {
    <Navigate to={import.meta.env.VITE_ROOT_CLIENT_URL} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserMyOrderLayout;