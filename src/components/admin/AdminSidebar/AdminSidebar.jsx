import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { NavLink } from 'react-router';
import { CurrencyIcon, HomeIcon, OrderIcon, PublicationIcon, UserIcon } from '../../../utils/icons';

import sitelogo from "../../../assets/siteLogo/logo.png"


const adminNav = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/admin/dashboard",
  },
  {
    title: "Publications",
    icon: <PublicationIcon />,
    path: "/admin/publications",
  },
  {
    title: "User management",
    icon: <UserIcon />,
    path: "/admin/users",
  },
  {
    title: "Orders",
    icon: <OrderIcon />,
    path: "/admin/all-orders",
  },
  {
    title: "Payments",
    icon: <CurrencyIcon />,
    path: "/admin/payments",
  },
];
const AdminSidebar = () => {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setTimeout(() => {
      setToggle(!toggle);
    }, 300);
  };
  return (
    <div>
      <div
        className={`md:w-[250px] w-[200px] max-h-screen min-h-screen border-r border-[#DCDEDF] ml-[-400px] pt-2 transition-all duration-300 ease-in-out  md:ml-0 relative ${
          toggle ? "" : " ml-[0px]"
        } `}
      >
        <RxCross2
          onClick={() => handleToggle()}
          className="absolute top-2 right-2 cursor-pointer block md:hidden"
        />
        <div className="p-5 pt-0 h-full flex flex-col justify-between">
          <div>
            {/* navigation */}
            <div className="">
              <div className="mb-7">
                <img src={sitelogo} alt="" />
              </div>
              <div>
                {adminNav.map((item, index) => (
                  <div key={index}>
                    <NavLink
                      key={index}
                      to={item.path}
                      className={({ isActive }) =>
                        `font-poppins flex items-center text-[#36383A] mt-1.5 gap-3 py-2 cursor-pointer rounded-sm transition-all duration-300 hover:bg-[#DCDEDF] hover:pl-3 ${
                          isActive ? "bg-[#DCDEDF]  pl-3" : ""
                        }`
                      }
                    >
                      {item.icon} {item.title}
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;