import { Outlet } from 'react-router';
import { isLoggedIn } from '../helpers/user/user';

const UserMyOrderLayout = () => {
  const isUserExist = isLoggedIn()
  // if (!isUserExist) {
  //   window.location.replace(`${import.meta.env.VITE_ROOT_CLIENT_URL}/signin`);
  // }
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserMyOrderLayout;