import { useState } from "react";
import AdminPagination from "../../../common/AdminPagination";
import { publicationData } from "../../../user/Pages/Publications/data";
import { EmailIcon, PhoneIcon } from "../../../../utils/icons";
import { tableData } from "../../../user/Pages/DashboardPage/data";

const SingleUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = 90; // Example: total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const orderDetails = tableData.find((order) => order.id === 'fsadf');

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Here you would typically fetch new data based on the selected page
      console.log(`Fetching data for page: ${page}`);
    }
  };
  return (
    <div>
      <div>
        <h3 className="text-[#5F6368] font-poppins mb-4">User Profile</h3>
        <div className="flex gap-2 items-end">
          <div className="h-[80px] w-[80px] bg-[#5F6368] rounded-sm">
            <img src="" alt="" />
          </div>
          <div className="">
            <p className="text-[#36383A] mb-2">User Name</p>
            <div className="text-[#878C91] text-sm flex items-center md:gap-[60px] flex-wrap gap-3.5">
              <p>CEO & Founder</p>
              <p className="flex items-center gap-2">
                <EmailIcon /> demo@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon /> +11111111
              </p>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-[#5F6368] font-poppins border-b border-[#DCDEDF] mb-4 mt-9">
        Orders
      </h3>
      <div className=" w-full overflow-x-auto pb-3">
        <div className="rounded-md w-fit">
          <table className="min-w-[1055px] text-sm font-normal overflow-x-scroll table-fixed overflow-hidden">
            <thead className="">
              <tr className="text-left">
                <th className="px-3 py-3 text-[#222425] font-medium">SL</th>
                <th className="px-3 py-3 text-[#222425] font-medium">ID</th>
                <th className="px-3 py-3 text-[#222425] font-medium">
                  Publication
                </th>
                <th className="px-3 py-3 text-[#222425] font-medium">
                  Order Date
                </th>
                <th className="px-3 py-3 text-[#222425] font-medium">
                  Completion Date
                </th>
                <th className="px-3 py-3 text-[#222425] font-medium">Status</th>
              </tr>
            </thead>
            <tbody className=" text-[#36383A]">
              {publicationData.slice(0, 1).map((item, index) => (
                <tr key={index} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3 text-nowrap">0{index + 1}</td>
                  <td className="px-3 py-3 text-nowrap text-[#006AC2] cursor-pointer">
                    653BSBE2-1O
                  </td>
                  <td className="px-3 py-3 text-nowrap">New York Times</td>
                  <td className="px-3 py-3 text-nowrap">04/15/2025</td>
                  <td className="px-3 py-3 text-nowrap">04/15/2025</td>
                  <td className="px-3 py-3 text-nowrap">
                    <button className="text-white bg-[#008CFF] px-3 py-1 w-full">
                      Published
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sm:flex items-center justify-end gap-2 mt-6">
        <AdminPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <select
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          defaultValue="10"
          className="text-[#878C91] text-sm border border-[#DCDEDF] px-0.5 py-[3.5px] focus:outline-2 focus:outline-[#004A87] rounded-md "
        >
          <option value="5">5 Result</option>
          <option value="10">10 Result</option>
          <option value="15">15 Result</option>
          <option value="20">20 Result</option>
          <option value="30">30 Result</option>
        </select>
      </div>
    </div>
  );
};

export default SingleUser;
