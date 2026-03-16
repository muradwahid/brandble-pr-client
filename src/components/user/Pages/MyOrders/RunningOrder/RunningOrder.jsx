import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router";
import { useRunningOrderQuery } from "../../../../../redux/api/orderApi";
import { formattedDate } from "../../../../../utils/function";
import { useState } from "react";
import { useDebounced } from "../../../../../redux/hooks";
import Pagination from "../../../../common/Pagination";
import { useSocketListener } from "../../../../../hooks/useSocketListener";

const RunningOrder = () => {
  const [searchData, setSearchData] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchData,
    delay: 500
  });

  const { data, isLoading,refetch } = useRunningOrderQuery({
    searchTerm: debouncedSearchTerm,
    page: currentPage,
    limit: itemsPerPage
  });

  useSocketListener("order_updated", () => {
    refetch();
  }, [refetch]);

  const { meta = {}, data: orderData = [] } = data || {}

  const handlePageChange = (page) => {
    if (page >= 1 && page <= meta?.totalPage) {
      setCurrentPage(page);
    }
  };


  if (isLoading) {
    return <div className="h-[70vh] w-full flex justify-center items-center">Loading...</div>;
  }


  const detailsSubmitted = (val, id, hrefTo) => {
    const isDetailSubmitted = val === 'not-yet'
    
    return isDetailSubmitted ? <Link className={`bg-[#FF5630] text-white text-sm font-medium font-poppins shadow py-1 px-3 rounded-[8px] tracking-[0px]`} to={`/user/checkout/order-submit/${id}`} >
      Submit Information
    </Link> : <Link className="text-[#00875A]" to={hrefTo}>Submitted</Link>
  }
  return (
    <div>
      {meta?.totalOrders>0 ? <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-5 border-b-2 border-[#DCDEDF] pb-3 flex-wrap gap-1.5">
          <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare">
            Orders
          </h2>
          <div className="flex gap-1.5 mt-[2px]">
            <input
              type="text"
              id="orderSearch"
              placeholder="Search Here..."
              onChange={e => setSearchData(e.target.value)}
              className=" border border-[#DCDEDF] py-1 px-3 text-[14px] focus:outline-2 focus:outline-[#004A87] text-[#5F6368] placeholder-[#5F6368] bg-white rounded-sm w-full"
            />
            <button className="border border-[#DCDEDF] px-2 rounded-sm cursor-pointer">
              <label htmlFor="orderSearch">
                <FaMagnifyingGlass className="cursor-pointer text-[#B2B5B8]" />
              </label>
            </button>
          </div>
        </div>
         <table className="min-w-full bg-[#F6F7F7] text-[16px] font-normal overflow-x-scroll table-fixed">
          <thead className="">
            <tr className="text-left py-2">
              <th className="px-3 py-3 text-[#222425] font-medium w-[5%]">
                SL
              </th>
              <th className="px-3 py-3 text-[#222425] font-medium">Order ID</th>
              <th className="px-3 py-3 text-[#222425] font-medium">
                Publication
              </th>
              <th className="px-3 py-3 text-[#222425] font-medium">
                Order Date
              </th>
              <th className="px-3 py-3 text-[#222425] font-medium">Completion Date</th>
              <th className="px-3 py-3 text-[#222425] font-medium">Status</th>
              <th className="px-3 py-3 text-[#222425] font-medium">Details Submitted</th>
            </tr>
          </thead>
          <tbody className=" text-[#36383A]">
            {orderData?.map((item, index) => {
              const hrefTo = item.orderType === 'wonArticle' ? `/user/orders/running/${item.id}` : `/user/orders/running/${item.id}/details`;
              return <tr
                key={index}
                className="border-t border-[#DCDEDF] hover:bg-[#DCDEDF] transition-all duration-300 "
              >
                <td className="px-3 py-3">
                  <Link to={hrefTo}>
                    {index + 1}
                  </Link>
                </td>
                <td className="px-3 py-3 cursor-pointer">
                  <Link to={hrefTo}><p className="text-[#006AC2] max-w-[250px] truncate">{item.id}</p></Link>
                </td>
                <td className="px-3 py-3 cursor-pointer">
                  <Link to={hrefTo}>
                    {item.publication.title}
                  </Link>
                </td>
                <td className="px-3 py-3 cursor-pointer">
                  <Link to={hrefTo}>
                    {formattedDate(item.createdAt)}
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <Link to={hrefTo}>
                    {formattedDate(item.updatedAt)}
                  </Link>
                </td>
                <td className="pr-2.5">
                  <button
                    className={` text-white cursor-pointer py-1 px-4 capitalize font-medium w-full text-sm font-poppins ${
                      item.status === "pending"
                        ? "bg-[#FFAB00]"
                        : item.status == "processing"
                        ? "bg-[#36B37E]"
                        : "bg-[#008CFF]"
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="px-3 py-3 cursor-pointer capitalize">
                  {detailsSubmitted(item.detailsSubmitted, item.id, hrefTo)}
                </td>
              </tr>
            })}
          </tbody>
        </table>

        <div className="sm:flex items-center justify-end md:gap-28 sm:gap-10 my-8">
          <select
            defaultValue="12"
            className="text-[#878C91] text-[14px] border border-[#B2B5B8] px-2 py-[5.5px] focus:outline-2 focus:outline-[#004A87] md:mt-0 mt-1.5 sm:mb-0 mb-5 "
            onChange={e => setItemsPerPage(e.target.value)}
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
            totalPages={meta?.totalPage}
            currentPage={meta?.page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>:
        <div className="h-[50dvh] flex items-center justify-center ">
          <h1 className="text-3xl text-center leading-[150%]">Your running order is empty.</h1>
        </div>
    }
    </div>
  );
};

export default RunningOrder;
