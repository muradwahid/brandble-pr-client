import { useState } from "react";
import AdminPagination from "../../../common/AdminPagination";
import { EmailIcon, PhoneIcon } from "../../../../utils/icons";
import { useSpecificUserOrdersQuery } from "../../../../redux/api/orderApi";
import { useParams } from "react-router";
import { useUserQuery } from "../../../../redux/api/authApi";
import { formattedDate } from "../../../../utils/function";

const SingleUser = () => {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { id } = useParams()

  const { data: userData, isLoading: userLoading } = useUserQuery(id);

  const { data } = useSpecificUserOrdersQuery({
    userId:id,
    searchTerm: search,
    page: currentPage,
    limit: itemsPerPage,
  });

  const orders = data?.data || [];
  const meta = data?.meta;

  const totalPages = meta?.totalPage || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (userLoading) {
    return <div className="text-[#5F6368] flex items-center justify-center h-[60dvh] w-full">Loading...</div>
  }

  return (
    <div>
      <div>
        <h3 className="text-[#5F6368] font-poppins mb-4">User Profile</h3>
        <div className="flex gap-2 items-end">
          <div className={`h-[80px] w-[80px] ${!userData?.image ?'bg-[#5F6368]':''} rounded-sm`}>
            <img src={userData?.image} alt="" className="h-full w-full rounded-sm"/>
          </div>
          <div className="">
            <p className="text-[#36383A] mb-2">{userData?.name}</p>
            <div className="text-[#878C91] text-sm flex items-center md:gap-[60px] flex-wrap gap-3.5">
              {userData?.designation && <p>{userData?.designation}</p>}
{ userData?.email &&             <p className="flex items-center gap-2">
                <EmailIcon /> {userData?.email}
              </p>}
              {userData?.phoneNumber &&              <p className="flex items-center gap-2">
                <PhoneIcon /> {userData?.phoneNumber}
              </p>}
            </div>
          </div>
        </div>
      </div>

      {
        meta?.total > 0? <>
      <h3 className="text-[#5F6368] font-poppins border-b border-[#DCDEDF] pb-4 mb-4 mt-9">
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
              {orders && orders?.map((order, index) => (
                <tr key={index} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3 text-nowrap">{(index + currentPage) > 9 ? index + currentPage : '0' + (index + currentPage)}</td>
                  <td className="px-3 py-3 text-nowrap text-[#006AC2] cursor-pointer">
                    {order?.id}
                  </td>
                  <td className="px-3 py-3 text-nowrap">{order?.publication?.title}</td>
                  <td className="px-3 py-3 text-nowrap">{formattedDate(order?.createdAt)}</td>
                  <td className="px-3 py-3 text-nowrap">{order?.status == 'published' ? formattedDate(order?.createdAt) :'00/00/0000'}</td>
                  <td className="px-3 py-3 text-nowrap">
                    <button className={`text-white px-3 py-1 w-full capitalize ${order.status === "pending"
                        ? "bg-[#FFAB00]"
                        : order.status == "processing"
                          ? "bg-[#36B37E]"
                          : "bg-[#008CFF]"
                  }`}>
                      {order?.status}
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
        </> : <div className="flex items-center justify-center h-[60dvh] w-full">
            <p className="text-[#5F6368] font-medium capitalize text-2xl">No orders found</p>
        </div>
      }
    </div>
  );
};

export default SingleUser;
