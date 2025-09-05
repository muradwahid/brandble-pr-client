import { Outlet } from "react-router";
import AdminHeader from "../components/admin/AdminHeader/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="bg-white flex gap-10 w-full max-w-[1440px] mx-auto">
      <AdminSidebar />
      <div className="mr-10 mt-5 w-fill-available">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
