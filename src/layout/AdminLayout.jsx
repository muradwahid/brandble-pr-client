import { Navigate, Outlet } from "react-router";
import AdminHeader from "../components/admin/AdminHeader/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar/AdminSidebar";
import { isLoggedIn } from "../helpers/user/user";

const AdminLayout = () => {
  const isUserExist = isLoggedIn()
  // if (!isUserExist) {
  //   window.location.replace(`${import.meta.env.VITE_ROOT_CLIENT_URL}/signin`);
  // }

  return (
    <div className="bg-white flex w-full max-w-[1440px] mx-auto">
      <AdminSidebar />
      <div className="md:mr-10 w-fill-available maxHeightdvh md:overflow-y-auto md:overflow-x-hidden md:px-10 px-5">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
