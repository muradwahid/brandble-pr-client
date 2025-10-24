import { Navigate, Outlet } from 'react-router';
import Footer from '../components/ui/Footer/Footer';
import { isLoggedIn } from '../helpers/user/user';

const UserMyOrderLayout = () => {
  const isUserExist = isLoggedIn()
  if (!isUserExist) {
    <Navigate to="/auth/login" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserMyOrderLayout;