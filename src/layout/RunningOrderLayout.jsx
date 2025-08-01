import React from "react";
import { Outlet } from "react-router";
import TopNavBar from "../components/user/TopNavBar/TopNavBar";
import Footer from "../components/ui/Footer/Footer";

const RunningOrderLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <TopNavBar />

      {/* main */}
      <main className="flex-1 flex my-10">
        <div className="flex xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto gap-6">
          {/* outlet */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RunningOrderLayout;
