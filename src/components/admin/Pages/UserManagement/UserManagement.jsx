import React, { useState } from 'react';
import { publicationData } from '../../../user/Pages/Publications/data';
import { ArticlePublishedIcon, DraftIcon, EmailIcon, GenreIcon, LoginIcon, OrderBox, RegistrationIcon, UserIcon } from '../../../../utils/icons';
import AdminPagination from '../../../common/AdminPagination';

const UserManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalItems = 90; // Example: total number of items
    const totalPages = Math.ceil(totalItems / itemsPerPage);

  
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        // Here you would typically fetch new data based on the selected page
        console.log(`Fetching data for page: ${page}`);
      }
    };
  return (
    <div>
      <h2 className="text-[#5F6368] font-poppins leading-[140%] mb-5">
        User Management
      </h2>
      <div className=" w-full overflow-x-auto pb-3">
        <div className="rounded-md  border border-[#DCDEDF] w-fit">
          <table className="min-w-[1055px] text-sm font-normal overflow-x-scroll table-fixed overflow-hidden">
            <thead className="bg-[#F6F7F7] text-sm">
              <tr className="text-left py-2">
                <th className="px-3 py-2 text-[#5F6368] font-normal border-r border-[#DCDEDF]">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    SL
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <UserIcon />
                    Name
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <EmailIcon /> Email
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <OrderBox /> Total Order
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <DraftIcon /> Running Order
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <ArticlePublishedIcon /> Article Published
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <GenreIcon /> Genres
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <RegistrationIcon /> Joining Date
                  </span>
                </th>
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <LoginIcon /> Last Login
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className=" text-[#5F6368] text-sm">
              {publicationData.slice(0, 1).map((item, index) => (
                <tr key={index} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3 text-nowrap">{index + 1}</td>
                  <td className="px-3 py-3 text-nowrap">Lee</td>
                  <td className="px-3 py-3 text-nowrap text-center overflow-hidden whitespace-nowrap text-ellipsis">
                    demo@gmail.com
                  </td>
                  <td className="px-3 py-3 text-nowrap text-center">11</td>
                  <td className="px-3 py-3 text-nowrap text-center">1</td>
                  <td className="px-3 py-3 text-nowrap">11</td>
                  <td className="px-3 py-3 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">
                    Business
                  </td>
                  <td className="px-3 py-3 text-nowrap">1/1/2023</td>
                  <td className="px-3 py-3 text-nowrap">1/1/2023</td>
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

export default UserManagement;