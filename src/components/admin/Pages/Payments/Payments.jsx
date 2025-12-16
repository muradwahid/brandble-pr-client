import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ClearAllIcon,
  ClearAllSecond,
  CurrencyIcon,
  OrderIconCalender,
  PaymentCardIcon,
  PublicationBadgeIcon,
  ServicesIcon,
  UserIcon,
} from "../../../../utils/icons";
import AdminPagination from "../../../common/AdminPagination";
import RevenuePayment from "./RevenuePayment";
import { useAdminOrdersQuery, useAdminPaymentsStatisticQuery } from "../../../../redux/api/orderApi";
import { formattedDate } from "../../../../utils/function";

const Payments = () => {
  const [filter, setFilter] = useState("lastMonth");
  const [toggle, setToggle] = useState(false);

  const targetRef = useRef(null);
  const filterRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isLoading } = useAdminPaymentsStatisticQuery();

  const { data: orders, isLoading: isOrderLoading } = useAdminOrdersQuery({ page: currentPage, limit: itemsPerPage });
  const ordersData = orders?.orders?.data || [];
  const meta = orders?.orders?.meta || {
    page: 1,
    limit: 10,
    total: 0,
  };

  const totalItems = meta.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const revenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(data?.revenue?.[filter]);


  useEffect(() => {
    function handleClick(event) {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [targetRef]);


  const filterData = [
    { title: "This Month", value: "thisMonth" },
    { title: "Today", value: "today" },
    { title: "This Year", value: "thisYear" },
    { title: "Last 7 Day", value: "last7Days" },
    { title: "Last Month", value: "lastMonth" },
  ];

  return (
    <div>
      <div>
        <div className="">
          <h2 className="text-[#36383A] font-poppins text-xl font-medium tracking-[0.1px] border-b border-[#DCDEDF] pb-2 mb-4">
            Revenue Statistics
          </h2>
          <div className="flex items-center gap-20 mb-12">
            <h2 className="text-[#36383A] font-poppins text-xl font-medium tracking-[0.1px]">
              {revenue}
            </h2>
            <div className="relative w-fit" onClick={() => setToggle(!toggle)}>
              <p
                className="flex items-center gap-12 font-poppins text-sm text-[#878C91] cursor-pointer tracking-[0.1px] px-2 py-1.5 pr-3 border border-[#F2F2F3] rounded-md shadow"
                ref={filterRef}
              >
                {filterData.find((value) => value.value === filter)?.title}
                <span>
                  <ArrowDown />
                </span>
              </p>
              <div
                className={`rounded-[8px] w-full absolute bg-white z-50 top-8 shadow-xl ${
                  toggle ? "block " : "hidden"
                }`}
                ref={targetRef}
              >
                {filterData.map((value, index) => (
                  <p
                    className={`flex items-center gap-12 font-poppins text-sm text-[#878C91] cursor-pointer tracking-[0.1px] px-2 py-1.5 pr-3 border-t border-[#F2F2F3] ${
                      value.value === filter ? "bg-[#F2F2F3]" : ""
                    }`}
                    onClick={() => setFilter(value.value)}
                    key={index}
                  >
                    {value.title}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <RevenuePayment filter={filter} data={data?.[filter]} isLoading={isLoading} />
      </div>

      {
        isOrderLoading ? <div className="flex items-center justify-center h-[30dvh] w-full">Loading...</div> : <>
          <div className="mt-20">
            <h2 className="text-[#36383A] font-poppins text-xl font-medium tracking-[0.1px] border-b border-[#DCDEDF] pb-2 mb-4">
              Payments
            </h2>

            <div className=" w-full overflow-x-auto pb-3">
              <div className="rounded-md  border border-[#DCDEDF] w-fit">
                <table className="min-w-[1055px] text-sm font-normal overflow-x-scroll table-fixed overflow-hidden">
                  <thead className="bg-[#F6F7F7]">
                    <tr className="text-left py-2">
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          SL
                        </span>
                      </th>
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          <ClearAllSecond /> Payment ID
                        </span>
                      </th>
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          <ClearAllIcon /> Order ID
                        </span>
                      </th>
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          <UserIcon />
                          User Name
                        </span>
                      </th>
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          <ServicesIcon /> Services
                        </span>
                      </th>
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          <PublicationBadgeIcon />
                          Publication
                        </span>
                      </th>
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          <CurrencyIcon /> Amount Paid
                        </span>
                      </th>
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          <PaymentCardIcon /> Payment Method
                        </span>
                      </th>
                      <th className="px-3 py-2 text-[#5F6368] font-normal">
                        <span className=" flex items-center gap-1.5 text-nowrap">
                          <OrderIconCalender /> Date
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" text-[#5F6368] text-sm">
                    {ordersData && ordersData?.map((order, index) => (
                      <tr key={index} className="border-t border-[#DCDEDF]">
                        <td className="px-3 py-3 text-nowrap">{index * currentPage + 1}</td>
                        <td className="px-3 py-3 text-nowrap"><div className="max-w-44 truncate">{order?.paymentMethodId}</div></td>
                        <td className="px-3 py-3 text-nowrap"><div className="max-w-44 truncate">{order?.id}</div></td>
                        <td className="px-3 py-3 text-nowrap ">{order?.user?.name}</td>
                        <td className="px-3 py-3 text-nowrap text-[#222425]">
                          {order?.orderType == 'wonArticle' ? 'Publish my own article' : 'Write Article'}
                          
                        </td>
                        <td className="px-3 py-3 text-nowrap overflow-hidden whitespace-nowrap text-ellipsis w-[92px]">
                          {order?.publication?.title}
                        </td>
                        <td className="px-3 py-3 text-nowrap">
                          ${order?.amount}
                        </td>
                        <td className="px-3 py-3 text-nowrap capitalize">{order?.paymentMethod?.type}</td>
                        <td className="px-3 py-3 text-nowrap">{formattedDate(order?.createdAt)}</td>
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
        </>
      }

 
    </div>
  );
};

export default Payments;
