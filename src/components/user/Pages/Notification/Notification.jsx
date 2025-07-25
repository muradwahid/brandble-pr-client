import { LuCheckCheck } from "react-icons/lu";
import { BellIconSecond, CirclePen } from "../../../../utils/icons";
import Pagination from "../../../common/Pagination";
import { useState } from "react";

const Notification = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = 50; // Example: total number of items
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
    <div className="w-full max-w-3xl md:mx-auto">
      <div className="bg-white border border-[#DCDEDF]">
        <div className="flex justify-end items-center p-4 ">
          <a
            href="#"
            className="text-[#878C91] text-[12px] font-medium mr-4 flex items-center gap-1"
          >
            <BellIconSecond />
            Unread
          </a>
          <a
            href="#"
            className="text-[#006AC2] hover:text-blue-800 text-[12px] font-medium flex gap-1 items-center"
          >
            <LuCheckCheck />
            Mark all as read
          </a>
        </div>

        <div className="p-4">
          <h2 className="text-[#878C91] bg-[#DCDEDF] text-[12px] px-3 py-1 font-semibold mb-3">
            Today
          </h2>

          <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
              <CirclePen />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                Article Submission Confirmation
                {/* <span className="text-red-500 ml-1">•</span> */}
              </p>
              <p className="text-sm text-gray-600">
                Your article '[Title]' has been submitted! We'll notify you once
                our editors review it (ETA: 24hrs).
              </p>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
              30m ago
            </div>
          </div>

          <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
              <CirclePen />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                Article Submission Confirmation
                {/* <span className="text-red-500 ml-1">•</span> */}
              </p>
              <p className="text-sm text-gray-600">
                Your article '[Title]' has been submitted! We'll notify you once
                our editors review it (ETA: 24hrs).
              </p>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
              5h ago
            </div>
          </div>

          <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
              <CirclePen />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                Article Submission Confirmation
                {/* <span className="text-red-500 ml-1">•</span> */}
              </p>
              <p className="text-sm text-gray-600">
                Your article '[Title]' has been submitted! We'll notify you once
                our editors review it (ETA: 24hrs).
              </p>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
              7h ago
            </div>
          </div>

          <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
              <CirclePen />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                Article Submission Confirmation
                {/* <span className="text-red-500 ml-1">•</span> */}
              </p>
              <p className="text-sm text-gray-600">
                Your article '[Title]' has been submitted! We'll notify you once
                our editors review it (ETA: 24hrs).
              </p>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
              7h ago
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-[#878C91] bg-[#DCDEDF] text-[12px] px-3 py-1 font-semibold mb-3">
            Yesterday
          </h2>

          <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
              <CirclePen />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                Article Submission Confirmation
              </p>
              <p className="text-sm text-gray-600">
                Your article '[Title]' has been submitted! We'll notify you once
                our editors review it (ETA: 24hrs).
              </p>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
              11/25/2025
            </div>
          </div>

          <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
              <CirclePen />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                Article Submission Confirmation
              </p>
              <p className="text-sm text-gray-600">
                Your article '[Title]' has been submitted! We'll notify you once
                our editors review it (ETA: 24hrs).
              </p>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
              11/25/2025
            </div>
          </div>

          <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
              <CirclePen />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                Article Submission Confirmation
              </p>
              <p className="text-sm text-gray-600">
                Your article '[Title]' has been submitted! We'll notify you once
                our editors review it (ETA: 24hrs).
              </p>
            </div>
            <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
              11/25/2025
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex items-center justify-end md:gap-28 sm:gap-10 my-8">
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
  );
};

export default Notification;
