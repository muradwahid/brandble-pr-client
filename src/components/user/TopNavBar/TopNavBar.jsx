//icons from utils/icons.js
import { BellIcon, CartIcon } from "../../../utils/icons";

//images from assets folder
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import siteLogo from "../../../assets/logo.png";
import Cart from "../../ui/Card/Cart";
import { FaUser } from "react-icons/fa";
import { getUserInfo } from "../../../helpers/user/user";
import { useUserQuery } from "../../../redux/api/authApi";
const TopNavBar = () => {
  const btnRef = useRef();
  const [openCart, setOpenCart] = useState(false);
  const cartRef = useRef();

    const user = getUserInfo();
    const { data } = useUserQuery(user?.id);

  useEffect(() => {
    function handleClick(event) {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        btnRef.current &&
        !btnRef.current.contains(event.target)
      ) {
        setOpenCart(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [btnRef]);
  return (
    <nav className="w-full py-5 border-b-[1px] border-b-[#171819]">
      <div className="xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto flex items-center justify-between relative">
        <Link to="/user/profile">
          <img className="w-[116px] h-[52px]" src={siteLogo} alt="" />
        </Link>
        <div className="hidden md:block">
          <div className="flex gap-12">
            <p className="text-[15px]">Publications</p>
            <p className="text-[15px]">Conferences</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <BellIcon className="cursor-pointer" />
          <div ref={btnRef} onClick={() => setOpenCart(!openCart)}>
            <CartIcon className="cursor-pointer" />
          </div>
          <div>
            {
              data?.image ? <div className="w-[40px] h-[40px] border rounded-full overflow-hidden">
                <img className="w-full h-full" src={'userImage'} alt="" />
              </div> : <FaUser className="text-2xl text-gray-500 cursor-pointer"/>
            }
          </div>
        </div>
        {openCart && <Cart ref={cartRef} setOpenCart={setOpenCart} />}
      </div>
    </nav>
  );
};

export default TopNavBar;
