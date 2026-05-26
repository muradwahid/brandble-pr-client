import { IoCheckmarkCircleOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { BsExclamationOctagon } from "react-icons/bs";
import { LiaExclamationCircleSolid } from "react-icons/lia";


import { Link } from "react-router";
import { ClockLoaderIcon } from "../../../utils/icons";
import { formatDateSmart } from "../../../utils/function";

const NotificationItem = ({ notification,type,...props }) => {
  const icon = {
    'placed': <IoCheckmarkCircleOutline className="text-[#36B37E]  text-xl mt-0.5" />,
    'delay': <BsExclamationOctagon className="text-[#EF873A] mt-0.5" />,
    'published': <IoCheckmarkDoneOutline className="text-[#008CFF] text-[18px]" />,
    'unabletopublish': <LiaExclamationCircleSolid className="text-[#D96612] text-2xl" />,
    "processing": <ClockLoaderIcon/>
  }
  const order = notification?.order || {}

  const orderRedirect = `/user/orders/details/${order?.id}`;
  const subInfo = `/user/checkout/order-submit/${order?.id}`;

  const renderEl = <div className={`flex items-start p-2 ${notification.status === 'unread' ? 'bg-[#004a870d]' : ''}  cursor-pointer mb-2`} {...props}>
    <div className="flex-shrink-0 flex items-center justify-center mr-3">
      {icon?.[notification?.submitStatus]}
    </div>
    <div className="flex-grow">
      <p className="text-sm font-medium font-poppins leading-[140%] text-[#36383A]">
        {notification.title}
        {notification.status === 'unread' ? <span className="text-red-500 ml-1">•</span> : null}
      </p>
      <p className="text-xs font-poppins leading-[140%] text-[#5F6368] mt-1.5" dangerouslySetInnerHTML={{ __html: notification.message }}></p>
    </div>
    <div className="flex-shrink-0 text-xs text-[#5F6368] leading-[140%] tracking-[0.4px] ml-4">
      {formatDateSmart(notification.createdAt)}
    </div>
  </div>
  
  return (
    <>
  { type==='client' && <Link to={order?.detailsSubmitted === 'not-yet' ? subInfo : orderRedirect}>
        {renderEl}
      </Link>}
  { type!=='admin' && renderEl}
    </>
  );
};

export default NotificationItem;
