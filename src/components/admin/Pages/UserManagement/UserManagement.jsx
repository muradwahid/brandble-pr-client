import { useState } from 'react';
import { ArticlePublishedIcon, DraftIcon, EmailIcon, GenreIcon, LoginIcon, OrderBox, RegistrationIcon, UserIcon } from '../../../../utils/icons';
import AdminPagination from '../../../common/AdminPagination';
import { useUserAllInfoQuery } from '../../../../redux/api/authApi';
import { formattedDate } from '../../../../utils/function';
import { Link } from 'react-router';

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');

  // Build query params
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    ...(search && { searchTerm: search }),
  };
  
  const { data,isLoading} = useUserAllInfoQuery(queryParams);

  const userData = data?.data || [];
  const meta = data?.meta || {};
  const totalItems = meta.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <div className='flex items-center justify-center h-[60dvh] w-full'>Loading...</div>;
  }

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
                {/* <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <GenreIcon /> Genres
                  </span>
                </th> */}
                <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <RegistrationIcon /> Joining Date
                  </span>
                </th>
                {/* <th className="px-3 py-2 text-[#5F6368] font-normal">
                  <span className=" flex items-center gap-1.5 text-nowrap">
                    <LoginIcon /> Last Login
                  </span>
                </th> */}
              </tr>
            </thead>
            <tbody className=" text-[#5F6368] text-sm">
              {userData?.map((user,index) => (
                <tr key={user?.id} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3 text-nowrap"><Link to={`/admin/users/${user?.id}`}>{index + 1}</Link></td>
                  <td className="px-3 py-3 text-nowrap"><Link to={`/admin/users/${user?.id}`}>{user?.name}</Link></td>
                  <td className="px-3 py-3 text-nowrap text-center overflow-hidden whitespace-nowrap text-ellipsis">
                    <Link to={`/admin/users/${user?.id}`}>{user?.email}</Link>
                  </td>
                  <td className="px-3 py-3 text-nowrap text-center">{user?.totalOrders}</td>
                  <td className="px-3 py-3 text-nowrap text-center">{user?.runningOrders}</td>
                  <td className="px-3 py-3 text-nowrap">{user?.publishedOrders}</td>
                  {/* <td className="px-3 py-3 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis">
                    
                  </td> */}
                  <td className="px-3 py-3 text-nowrap">{formattedDate(user?.createdAt)}</td>
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