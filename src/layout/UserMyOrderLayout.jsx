import { Outlet } from 'react-router';
import Footer from '../components/ui/Footer/Footer';

const UserMyOrderLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default UserMyOrderLayout;