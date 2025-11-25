import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CopyIcon, DownloadIcon } from "../../../../utils/icons";
import Pagination from "../../../common/Pagination";
import wordfileXl from "../../../../assets/wordfileXl.png";
import { useOrdersQuery } from "../../../../redux/api/orderApi";
import { formattedDate } from "../../../../utils/function";
const MyArticles = () => {
 const [tooltip, setTooltip] = useState({ visible: false, text: 'Copy ID' });
  const hideTimer = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [inputSearch, setInputSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(inputSearch);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputSearch]);

  const { data, isLoading } = useOrdersQuery({
    page: currentPage,
    limit: itemsPerPage,
    ...(debouncedSearch && { searchTerm: debouncedSearch })
  });

  // Extract data from response
  const ordersData = data?.orders?.data || [];
  const meta = data?.orders?.meta || {
    total: 0,
    page: 1,
    limit: itemsPerPage
  };

  const totalPages = Math.ceil(meta?.total / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setInputSearch(e.target.value);
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
      {
        meta?.total >0 ?
      <div className="w-full">
        <div className="flex justify-between items-center mb-4  flex-wrap gap-1.5">
          <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare">
            My Article
          </h2>
          <div className="flex gap-1.5">
            <input
              type="text"
              id="orderSearch"
              placeholder="Search Here..."
                  className=" border border-[#DCDEDF] py-1 px-3 text-[14px] focus:outline-2 focus:outline-[#004A87] text-[#5F6368] placeholder-[#5F6368] bg-white rounded-sm w-full"
                  onChange={e => handleSearchChange(e)}
            />
            <button className="border border-[#DCDEDF] px-2 rounded-sm cursor-pointer">
              <label htmlFor="orderSearch">
                <FaMagnifyingGlass className="cursor-pointer text-[#B2B5B8]" />
              </label>
            </button>
          </div>
        </div>

        <div>
          {ordersData.map((item, index) => (
            <div
              key={index}
              className="border border-[#DCDEDF] p-2.5 mb-5 flex gap-4"
            >
              <div className="flex md:block hidden items-center bg-[#F2F2F3] p-3">
                <img src={wordfileXl} alt="" className="w-[75px] h-[89px]" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="relative group text-[#878C91] md:text-[16px] text-[14px] flex items-center gap-3">
                    {item.id} <CopyIcon onClick={() => handleCopy(item.id)} className="fill-[#878C91] cursor-pointer" onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))} onMouseEnter={() => setTooltip(t => ({ ...t, visible: true }))} />
                    {/* {tooltip.visible && ( */}
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-8 right-0 transform translate-x-1/2
                         bg-gray-800 text-white text-xs rounded px-2 py-1
                         whitespace-nowrap">
                        {tooltip.text}
                      </span>
                    {/* )} */}
                  </p>
                  <div className="flex gap-1.5">
                    <p className="bg-[#222425] text-white text-sm font-medium md:px-7 px-4 py-1 md:w-48 w-40 text-center capitalize">
                      {item.status}
                    </p>
                    {/* <button className="border border-[#0000] hover:border-[#DCDEDF] transition-all duration-200 cursor-pointer px-1.5">
                      <DownloadIcon />
                    </button> */}
                  </div>
                </div>
                <div className="">
                  <div className="md:text-[20px] text-[18px] font-glare whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </div>
                </div>
                <div className="flex justify-between mt-3 flex-wrap gap-3">
                  <div className="text-[#878C91] text-sm">
                    <div className="flex gap-3">
                      <p className="">Sponsored</p>
                      <p className="capitalize">: {item?.publication?.sponsor}</p>
                    </div>
                    <div className="flex gap-3 mt-1">
                      <p className="">Date</p>
                      <p className="">: {formattedDate(item.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-[#878C91] text-sm">
                    <div className="flex gap-3">
                      <p className="">Genre</p>
                      <p className="">
                        :{" "}
                        <span className="bg-[#DCDEDF] px-3 py-0.5 poppins-regular capitalize">
                          {item?.publication?.genre}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-3 mt-1">
                      <p className="">Region</p>
                      <p className="">: {item?.publication?.region}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      <div className="flex items-center justify-between md:gap-28 sm:gap-10 my-8">
          <select
            defaultValue="10"
                className="text-[#878C91] text-[14px] border border-[#B2B5B8] sm:px-2 sm:py-[5.5px] focus:outline-2 focus:outline-[#004A87] sm:h-auto h-[27px]"
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
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div> 
          </div> :
          <div className="h-[50dvh] flex items-center justify-center text-center leading-[150%]">
            <p className="text-[#222425] text-xl">No articles are currently available.</p>
          </div>
      }
    </div>
  );
};

export default MyArticles;
