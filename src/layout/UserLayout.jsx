import { useLocation } from "react-router";
import { Outlet } from "react-router";
import TopNavBar from "../components/user/TopNavBar/TopNavBar";
import UserSidebar from "../components/user/Sidebar/UserSidebar";

const UserParentLayout = () => {
  const location = useLocation();
  const publication = location.pathname == "/publications";
  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <TopNavBar />
      {/* main */}
      <main className="flex-1 flex my-10">
        <div className="flex xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto gap-6">
          {/* sidebar */}
          {!publication && <UserSidebar />}
          {/* flex-1 */}
          <div className={`${publication? "" : "w-[90%]"} `}>
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
