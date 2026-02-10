import {Outlet, useLocation } from "react-router";
import UserSidebar from "../components/user/Sidebar/UserSidebar";
import TopNavBar from "../components/user/TopNavBar/TopNavBar";
import Footer from "../components/ui/Footer/Footer";
import { isLoggedIn } from "../helpers/user/user";
import config from "../config";

const UserParentLayout = () => {
  const isUserExist = isLoggedIn()
  if (!isUserExist) {
    window.location.href = config.rootClientUrl + '/signin';
  }
  const location = useLocation().pathname;
  const publication = location == "/user/publications" || location == "/user/checkout";

  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <TopNavBar />

      {/* main */}
      <main className="flex-1 flex my-10">
        <div className="flex lg:w-4/5 md:w-5/6 w-[90%] mx-auto gap-6">
          {/* sidebar */}
          {!publication && <UserSidebar />}
          {/* flex-1 */}
          <div className={`${publication ? "w-full" : "w-[90%]"} `}>
            {/* outlet */}
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserParentLayout;
