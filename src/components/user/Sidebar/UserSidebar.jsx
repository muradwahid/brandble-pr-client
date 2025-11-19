import { NavLink, useLocation } from "react-router";
import { userNav } from "../../../utils/navData";
import {  useState } from "react";
import { RxChevronDown, RxChevronRight, RxCross2, RxHamburgerMenu } from "react-icons/rx";
import {  useSignoutMutation, useUserQuery } from "../../../redux/api/authApi";
import { getUserInfo } from "../../../helpers/user/user";
import { FaUser } from "react-icons/fa";

const UserSidebar = () => {
  const user = getUserInfo();
  const [toggle, setToggle] = useState(true);
  const location = useLocation()
  const { data } = useUserQuery(user?.id);
  const [signout] = useSignoutMutation()

  const handleToggle = () => {
    setTimeout(() => {
      setToggle(!toggle);
    }, 300);
  };

  
  // Check if a parent route is active
  const isParentActive = (item) => {
    return (
      location.pathname === item.path ||
      (item.subItems &&
        item.subItems.some((subItem) => location.pathname.startsWith(subItem.path)))
    );
  };

  const handleSignOut = async () => {
    try {
      await signout();
      // window.location.replace(`${import.meta.env.VITE_ROOT_CLIENT_URL}/signin`);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      {toggle && (
        <div
          onClick={() => handleToggle()}
          className="block md:hidden cursor-pointer mt-2"
        >
          {toggle && <RxHamburgerMenu />}
        </div>
      )}
      <div
        className={`md:w-[250px] w-[200px] h-[700px] bg-[#F6F7F7] ml-[-400px] transition-all duration-300 ease-in-out  md:ml-0 relative ${
          toggle ? "" : " ml-[0px]"
        } `}
      >
        <RxCross2
          onClick={() => handleToggle()}
          className="absolute top-2 right-2 cursor-pointer block md:hidden"
        />
        <div className="p-5 h-full flex flex-col justify-between">
          <div>
            {/* profile */}
            <div className="md:flex gap-5 items-center border-b-[1px] border-[#b2b5b8] pb-5">
             { data?.image?<div className="w-[60px] h-[60px] border">
                <img className="w-full h-full" src={data.image} alt="" />
              </div> : <FaUser className="text-2xl text-gray-500 cursor-pointer" />}
              <div className="flex flex-col">
                <h4 className="text-[#222425] text-[20px] font-glare">
                  {data?.name}
                </h4>
                <small className="text-[#5F6368]">{data?.email}</small>
              </div>
            </div>

            {/* navigation */}
            <div className="mt-5">
              <div>
                {userNav.map((item, index) => (
                  <div key={index}>
                    <NavLink
                      key={index}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center text-[#222425] mt-1.5 gap-3 py-1.5 cursor-pointer transition-all duration-300 hover:bg-[#004A87] hover:pl-3 hover:text-white ${
                          isActive ? "bg-[#004A87] text-white pl-3" : ""
                        }`
                      }
                    >
                      <div className="flex items-center justify-between w-full">
                        <p className="text-[15px] ">{item.title}</p>
                        {item.subItems && (isParentActive(item) ? <RxChevronDown className="mr-3" /> : <RxChevronRight className="mr-3" />)}
                      </div>
                    </NavLink>
                    {item.subItems && isParentActive(item) &&
                      item.subItems.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center text-sm text-[#222425] ml-3 mt-1.5 gap-3 py-1.5 cursor-pointer transition-all duration-300 hover:bg-[#006AC2] hover:pl-3 hover:text-white ${
                              isActive ? "bg-[#006AC2] text-white pl-3" : ""
                            }`
                          }
                        >
                          <p className="text-sm ">{subItem.title}</p>
                        </NavLink>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div onClick={handleSignOut} className="flex items-center text-[#222425] mt-1.5 gap-3 py-1.5 cursor-pointer transition-all duration-300 hover:bg-[#004A87] hover:pl-3 hover:text-white ">
            <button>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
