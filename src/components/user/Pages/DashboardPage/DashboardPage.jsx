import { PiMagnifyingGlassLight } from "react-icons/pi";
import Table from "./Table";
import { useCallback, useState } from "react";
import Pagination from "../../../common/Pagination";
import Chat from "./Chat";
import { useOrdersQuery } from "../../../../redux/api/orderApi";
import { debounce } from "lodash";

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState();
  const [statusFilter, setStatusFilter] = useState();

  // Query parameters based on your server interface
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    ...(searchTerm && { searchTerm }),
    ...(statusFilter && { status: statusFilter }),
  };
  const { data, isLoading } = useOrdersQuery(queryParams);

  const meta = data?.orders?.meta || { page: 1, limit: 10, total: 0 };
  const ordersData = data?.orders?.data || [];

  // Calculate total pages
  const totalPages = Math.ceil(meta.total / meta.limit);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      setSearchTerm(searchValue);
      setCurrentPage(1); // Reset to first page when searching
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    // setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    // setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  if (isLoading) { 
    return <div className="h-[70vh] w-full flex justify-center items-center">Loading...</div>;
  } 

  return (
    <div className="w-full overflow-x-auto">
      {meta.total < 1 ? <h3 className="text-2xl text-[#222425] font-glare">
        Dashboard
      </h3>:null}
      {meta.total  ? <>
      <div className="lg:flex justify-between items-center border-b border-[#DCDEDF] pb-4">
        <div className="md:flex gap-8 items-center w-full">
          <h3 className="text-2xl text-[#222425] font-glare">
            Dashboard
          </h3>
          <div className="w-full flex items-center justify-between">
            <select value={statusFilter} onChange={handleStatusChange} className="text-[#878C91] text-[14px] border border-[#B2B5B8] lg:w-[180px] lg:h-[34px] w-[120px] h-[26px] px-2 rounded-[4px] focus:outline-2 focus:outline-[#004A87] md:mt-0 mt-1.5">
              <option className="text-[#878C91]" disabled defaultValue="status">
                Status
              </option>
              <option value="published">Published</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
            </select>
            <div className="flex gap-0.5 items-center md:mt-0 mt-1.5">
              <input
                type="text"
                id="tableSearch"
                placeholder="Search Here..."
                onChange={handleSearchChange}
   
                className="border border-[#B2B5B8] py-1.5 text-[14px] lg:w-[180px] lg:h-[34px] w-[120px] h-[26px] px-2 rounded-[4px] focus:outline-2 focus:outline-[#004A87]"
              />
              <label
                htmlFor="tableSearch"
                className="border border-[#B2B5B8] lg:w-[34px] lg:h-[34px] w-[26px] h-[26px] py-1.5 flex items-center justify-center px-2 rounded-[4px] cursor-pointer"
              >
                <PiMagnifyingGlassLight />
              </label>
            </div>
          </div>
        </div>
      </div>
      <Table data={ordersData} />
      <div className="flex items-center md:justify-end justify-between gap-5 md:gap-28 sm:gap-10 my-8">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          defaultValue="10"
          className="text-[#878C91] text-[14px] border border-[#B2B5B8] sm:px-2 sm:py-[5.5px] focus:outline-2 focus:outline-[#004A87] sm:h-auto h-[27px]"
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
      </> : <div className="h-[50dvh] flex items-center justify-center">
        <h1 className="text-3xl">Your running order is empty.</h1>
      </div>}

      <div>
        <p className="text-[#222425] py-5 font-medium border-t border-[#DCDEDF] font-glare">
          Conversation With Admin
        </p>
        <Chat />
      </div>
    </div>
  );
};

export default DashboardPage;
