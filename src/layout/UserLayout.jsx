import { Outlet } from "react-router";
import TopNavBar from "../components/user/TopNavBar/TopNavBar";
import UserSidebar from "../components/user/Sidebar/UserSidebar";


const UserParentLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <TopNavBar />
      {/* main */}
      <main className="flex-1 flex my-10">
        <div className="flex xl:w-[1440px] mx-auto 2xl:gap-52 xl:gap-48 lg:gap-32 md:gap-24 sm:gap-16 gap-10">
          {/* sidebar */}
          <UserSidebar />
          <div className="flex-1">
            {/* outlet */}
            <Outlet />
          </div>
        </div>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default UserParentLayout;
