import { Outlet } from "react-router";
import AdminHeader from "../components/admin/AdminHeader/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar/AdminSidebar";

const AdminLayout = () => {
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
