import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CirclePen, CopyIcon } from "../../../../../utils/icons";
import Pagination from "../../../../common/Pagination";
import { useOrdersQuery } from "../../../../../redux/api/orderApi";
import { formattedDate } from "../../../../../utils/function";

const OrderHistory = () => {


  const [tooltip, setTooltip] = useState({ visible: false, text: 'Copy ID' });
  const hideTimer = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 40; // Example: total number of items
  const itemsPerPage = 10; // Example: items to display per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  

  const { data, isLoading } = useOrdersQuery()
  const ordersData = data?.orders?.data || []
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Here you would typically fetch new data based on the selected page
      console.log(`Fetching data for page: ${page}`);
    }
  };



  const handleCopy = async (orderId) => {
    try {
      await navigator.clipboard.writeText(orderId);
      setTooltip({ visible: true, text: 'Copied!' });
      // Optional: auto-hide after a moment
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        setTooltip({ visible: false, text: 'Copy ID' });
      }, 1500);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setTooltip({ visible: true, text: 'Copy failed' });
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        setTooltip({ visible: false, text: 'Copy ID' });
      }, 1500);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);


  if (isLoading) {
    return <div className="h-[50dvh] flex items-center justify-center text-center leading-[150%]">
      <p className="text-[#222425]">Loading...</p>
    </div>
  }

  return (
    <div className="w-full max-w-3xl md:mx-auto">
{ordersData.length >0?      <div className="w-full">
      <div className="flex justify-between items-center mb-4  flex-wrap gap-1.5">
        <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare">
          History
        </h2>
        <div className="flex gap-1.5">
          <input
            type="text"
            id="orderSearch"
            placeholder="Search Here..."
            className="w-full border border-[#DCDEDF] py-1 px-3 text-[14px] focus:outline-2 focus:outline-[#004A87] text-[#5F6368] placeholder-[#5F6368] bg-white rounded-sm"
          />
          <button className="border border-[#DCDEDF] px-2 rounded-sm cursor-pointer">
            <label htmlFor="orderSearch">
              <FaMagnifyingGlass className="cursor-pointer text-[#B2B5B8]" />
            </label>
          </button>
        </div>
      </div>

      <div>
        {
          ordersData.map((order) => <div key={order.id} className="border border-[#DCDEDF] p-2.5 mb-5">
            <div className="flex items-center justify-between">
              <div onClick={() => handleCopy(order.id)} className=" text-[#878C91] md:text-[16px] text-[14px] flex items-center gap-3" onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))} onMouseEnter={() => setTooltip(t => ({ ...t, visible: true }))}>
                {order.id} <div className="relative">
                  <CopyIcon className="fill-[#878C91] cursor-pointer" />
                {tooltip.visible && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2
                         bg-gray-800 text-white text-xs rounded px-2 py-1
                         whitespace-nowrap">
                    {tooltip.text}
                  </span>
                )}
                </div>
              </div>
              <p className={` text-white text-sm font-medium md:px-7 px-4 py-1 capitalize tracking-wide ${order.status === "pending"
                  ? "bg-[#FFAB00]"
                  : order.status == "processing"
                    ? "bg-[#36B37E]"
                    : "bg-[#008CFF]"
                    }`}>
                {order.status}
                
              </p>
            </div>
            <div className="flex gap-3">
              <CirclePen className="mt-[3px]" />
              <h4 className="text-[#36383A] md:text-[20px] text-[18px] font-glare whitespace-nowrap overflow-hidden text-ellipsis">
                {order.orderType==='wonArticle'?'Won Article' :'Write Article'}
              </h4>
            </div>
            <div className="flex justify-between mt-3 flex-wrap gap-3">
              <div className="text-[#878C91] text-sm">
                <div className="flex gap-3">
                  <p className="">Sponsored</p>
                  <p className="capitalize">: {order?.publication[0]?.sponsor}</p>
                </div>
                <div className="flex gap-3 mt-1">
                  <p className="">Date</p>
                  <p className="">: {formattedDate(order.createdAt)}</p>
                </div>
              </div>
              <div className="text-[#878C91] text-sm">
                <div className="flex gap-3">
                  <p className="">Genre</p>
                  <p className="">
                    :{" "}
                    <span className="bg-[#DCDEDF] px-3 py-0.5">
                      {order?.publication[0]?.genre}
                    </span>
                  </p>
                </div>
                <div className="flex gap-3 mt-1">
                  <p className="">Region</p>
                  <p className="">: {order?.publication[0]?.region}</p>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
      <div className="sm:flex items-center justify-between md:gap-28 sm:gap-10 my-8">
        <select
          defaultValue="10"
          className="text-[#878C91] text-[14px] border border-[#B2B5B8] px-2 py-[5.5px] focus:outline-2 focus:outline-[#004A87] md:mt-0 mt-1.5 sm:mb-0 mb-5 "
        >
          <option value="5" defaultValue="5">
            5 Result
          </option>
          <option value="10">10 Result</option>
          <option value="15">15 Result</option>
          <option value="20">20 Result</option>
          <option value="30">30 Result</option>
        </select>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div> 

      </div>
      :  
      <div className="h-[50dvh] flex items-center justify-center text-center leading-[150%]">
        <p className="text-[#222425] text-xl">No orders found. Start by browsing our <strong>Publications</strong> and adding items to your cart.</p>
      </div>
    }

    </div>
  );
};

export default OrderHistory;


