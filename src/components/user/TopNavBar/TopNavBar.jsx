//icons from utils/icons.js
import { BellIcon, BellIconSecond, CartIcon } from "../../../utils/icons";

//images from assets folder
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import siteLogo from "../../../assets/logo.png";
import Cart from "../../ui/Card/Cart";
import { FaUser } from "react-icons/fa";
import { getUserInfo } from "../../../helpers/user/user";
import { useUserQuery } from "../../../redux/api/authApi";
import { getFromLocalStorage } from "../../../utils/local-storage";
import { useGetNotificationsQuery, useGetUnreadCountQuery } from "../../../redux/api/notificationApi";
import { useSocketListener } from "../../../hooks/useSocketListener";
import NavBarNotification from "../../ui/NavBarNotification/NavBarNotification";
import { useOutsideClickClose } from "../../../hooks/useOutsideClickClose";
const TopNavBar = () => {
  // const btnRef = useRef(null);
  const [openCart, setOpenCart] = useState(false);
  const [toggleNotification, seToggleNotification] = useState(false);
  const [savedData, setSavedData] = useState(0);
  // const cartRef = useRef();
  // const notificationRef = useRef(null);
  // const bellIconRef = useRef(null);

  const user = getUserInfo();
  const { data } = useUserQuery(user?.id);

  const { data: unreadCountData = 0, isLoading, refetch } = useGetUnreadCountQuery();
    const notifArg = useMemo(() => ({ limit: 20 }), []);
  
  
    const { data: notificationsData, refetch: refetchNotifications, isLoading: isLoadingNotifications } = useGetNotificationsQuery(notifArg);

  useSocketListener("new_notification", () => {
      refetch();
    }, [refetch]);
  
  const location = useLocation().pathname;
  const publication = location == "/user/publications"
  
  const { btnRef: notificationRef, ref: bellIconRef } =useOutsideClickClose(() => {
    seToggleNotification(false);
  });
  const { btnRef: btnRef, ref: cartRef } =useOutsideClickClose(() => {
    setOpenCart(false);
  });

  useEffect(() => {
    const updateCount = () => {
      const data = JSON.parse(getFromLocalStorage("brandableCardData")) || [];
      setSavedData(data.length);
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);

    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);


  return (
    <nav className="w-full border-b-[1px] border-b-[#171819]">
      <div className="py-5 xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto flex items-center justify-between relative">
        <Link to="/user/dashboard">
          <img className="w-[116px] h-[52px]" src={siteLogo} alt="" />
        </Link>
        <div className="hidden md:block">
          <div className="flex gap-12">
            {publication ? <Link to={'/user/dashboard'}><p className="text-[15px]">Dashboard</p></Link>:
          <Link to={'/user/publications'}><p className="text-[15px]">Publications</p></Link>}
            <p className="text-[15px]">Conferences</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div key={JSON.stringify(unreadCountData + isLoading)} ref={bellIconRef} onClick={() => seToggleNotification(!toggleNotification)} className="relative">
            <BellIcon className="cursor-pointer" dotColor={unreadCountData > 0 ?"#FF5630"  :"#171819" } />
          </div>
          {toggleNotification && <NavBarNotification ref={notificationRef} seToggleNotification={seToggleNotification} unreadCount={unreadCountData} type="client" refetch={refetchNotifications} notificationsData={notificationsData} isLoading={isLoadingNotifications} />}
          <div ref={btnRef} onClick={() => setOpenCart(!openCart)} className="relative">
            <CartIcon className="cursor-pointer" />
            {savedData > 0 && <div className="absolute -top-3 -right-3 h-4 w-4 bg-blue-600 rounded-full  flex items-center justify-center text-[8px] text-white">
              {savedData}
            </div>}
          </div>
          <Link to="/user/profile">
            {
              data?.image ? <div className="w-[40px] h-[40px] border overflow-hidden">
                <img className="w-full h-full" src={data?.image} alt="" />
              </div> : <FaUser className="text-2xl text-gray-500 cursor-pointer"/>
            }
          </Link>
        </div>
        {openCart && <Cart ref={cartRef} setOpenCart={setOpenCart} setSavedData={setSavedData} />}
      </div>
    </nav>
  );
};

export default TopNavBar;
