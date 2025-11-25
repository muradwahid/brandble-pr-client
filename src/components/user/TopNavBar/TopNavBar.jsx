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
import NavBarNotification from "../Pages/NavBarNotification/NavBarNotification";
const TopNavBar = () => {
  const btnRef = useRef(null);
  const [openCart, setOpenCart] = useState(false);
  const [toggleNotification, seToggleNotification] = useState(false);
  const cartRef = useRef();
  const notificationRef = useRef(null);
  const bellIconRef = useRef(null);

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

  useEffect(() => {
    function handleClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        bellIconRef.current &&
        !bellIconRef.current.contains(event.target)
      ) {
        seToggleNotification(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [bellIconRef]);


  return (
    <nav className="w-full border-b-[1px] border-b-[#171819]">
      <div className="py-5 xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto flex items-center justify-between relative">
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
          <div ref={bellIconRef} onClick={() => seToggleNotification(!toggleNotification)}>
            <BellIcon className="cursor-pointer" />
          </div>
            {toggleNotification &&<NavBarNotification ref={notificationRef} seToggleNotification={seToggleNotification} />}
          <div ref={btnRef} onClick={() => setOpenCart(!openCart)}>
            <CartIcon className="cursor-pointer" />
          </div>
          <div>
            {
              data?.image ? <div className="w-[40px] h-[40px] border rounded-full overflow-hidden">
                <img className="w-full h-full" src={data?.image} alt="" />
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
