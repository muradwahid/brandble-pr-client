import { PiMagnifyingGlassLight } from "react-icons/pi";
import Table from "./Table";
import { useState } from "react";
import Pagination from "../../../common/Pagination";
import Chat from "./Chat";

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 90; // Example: total number of items
  const itemsPerPage = 10; // Example: items to display per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Here you would typically fetch new data based on the selected page
      console.log(`Fetching data for page: ${page}`);
    }
  };
  return (
    <div className="w-full">
      <div className="lg:flex justify-between items-center border-b border-[#DCDEDF] pb-4">
        <div className="md:flex gap-8 items-center">
          <h3 className="text-2xl font-semibold text-[#222425]">Dashboard</h3>
          <select
            className="text-[#878C91] text-[14px] border border-[#B2B5B8] lg:w-[180px] lg:h-[34px] w-[120px] h-[26px] px-2 rounded-[4px] focus:outline-2 focus:outline-[#004A87] md:mt-0 mt-1.5"
          >
            <option
              className="text-[#878C91]"
              disabled
              defaultValue="status"
            >
              Status
            </option>
            <option value="published">Published</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex gap-0.5 items-center md:mt-0 mt-1.5">
          <input
            type="text"
            id="tableSearch"
            placeholder="Search Here..."
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
      <Table />
      <div className="sm:flex items-center justify-end md:gap-28 sm:gap-10 my-8">
        <select
          defaultValue="10"
          className="text-[#878C91] text-[14px] border border-[#B2B5B8] px-2 py-[5.5px] focus:outline-2 focus:outline-[#004A87] md:mt-0 mt-1.5 sm:mb-0 mb-5 "
        >
          <option value="5" defaultValue="5">
            5 Result
          </option>
          <option value="10" >
            10 Result
          </option>
          <option value="15" >
            15 Result
          </option>
          <option value="20" >
            20 Result
          </option>
          <option value="30">
            30 Result
          </option>
        </select>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div>
        <p className="text-[#222425] py-5 font-medium border-t border-[#DCDEDF]">
          Conversation With Admin
        </p>
        <Chat />
      </div>
    </div>
  );
};

export default DashboardPage;
