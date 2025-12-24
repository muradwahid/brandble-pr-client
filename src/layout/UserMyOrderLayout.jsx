import { Outlet } from 'react-router';
import { isLoggedIn } from '../helpers/user/user';
import config from '../config';

const UserMyOrderLayout = () => {
  const isUserExist = isLoggedIn()
  if (!isUserExist) {
    window.location.href = config.rootClientUrl + '/signin';
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserMyOrderLayout;