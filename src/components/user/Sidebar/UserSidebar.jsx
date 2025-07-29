import { NavLink } from "react-router";
import userImage from "../../../assets/profile.png";
import { userNav } from "../../../utils/navData";
import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

const UserSidebar = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setTimeout(() => {
      setToggle(!toggle);
    }, 300);
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
            <div className="md:flex gap-5 items-end border-b-[1px] border-[#b2b5b8] pb-5">
              <div className="w-[60px] h-[60px]">
                <img className="w-full" src={userImage} alt="" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[#222425] text-[20px] font-glare ">
                  John Doe
                </h4>
                <small className="text-[#5F6368]">john.doe@gmail.com</small>
              </div>
            </div>

            {/* navigation */}
            <div className="mt-5">
              <div>
                {userNav.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center text-[#222425] mt-1.5 gap-3 py-1.5 cursor-pointer transition-all duration-300 hover:bg-[#004A87] hover:pl-3 hover:text-white ${
                        isActive ? "bg-[#004A87] text-white pl-3" : ""
                      }`
                    }
                  >
                    <p className="text-[15px] ">{item.title}</p>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center text-[#222425] mt-1.5 gap-3 py-1.5 cursor-pointer transition-all duration-300 hover:bg-[#004A87] hover:pl-3 hover:text-white ">
            <button>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
