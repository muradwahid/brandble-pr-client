import { Outlet } from 'react-router';
import { isLoggedIn } from '../helpers/user/user';
import { useRedirectSignin } from '../hooks/useRedirectSignin';

const UserMyOrderLayout = () => {
  const isUserExist = isLoggedIn()
  const redirectToSignin = useRedirectSignin();
  if (!isUserExist) {
    redirectToSignin();
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserMyOrderLayout;