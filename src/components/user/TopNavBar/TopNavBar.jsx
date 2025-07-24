//icons from utils/icons.js
import { BellIcon, CartIcon } from "../../../utils/icons";

//images from assets folder
import siteLogo from "../../../assets/logo.png";
import userImage from "../../../assets/profile.png";
const TopNavBar = () => {
  return (
    <nav className="w-full py-5 border-b-[1px] border-b-[#171819]">
      <div className="xl:w-[1440px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto flex items-center justify-between">
        <div>
          <img className="w-[116px] h-[52px]" src={siteLogo} alt="" />
        </div>
        <div className="hidden md:block">
          <div className="flex gap-4">
            <p className="text-[15px]">Publications</p>
            <p className="text-[15px]">Conferences</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <BellIcon className="cursor-pointer" />
          <CartIcon className="cursor-pointer" />
          <div>
            <img src={userImage} alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
