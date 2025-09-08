import { Outlet } from "react-router";
import AdminHeader from "../components/admin/AdminHeader/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="bg-white flex w-full max-w-[1440px] mx-auto">
      <AdminSidebar />
      <div className="mr-10 w-fill-available maxHeightdvh overflow-y-scroll px-10">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
