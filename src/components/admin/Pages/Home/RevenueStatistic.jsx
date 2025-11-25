import { Link } from "react-router";
import { useOrderRevenueQuery, useUpcomingOrdersQuery } from "../../../../redux/api/orderApi";
import { formattedDate } from "../../../../utils/function";
import HBarChart from "./HBarChart";

const RevenueStatistic = () => {
  const { data, isLoading } = useOrderRevenueQuery()
  const { data: upcomingOrders } = useUpcomingOrdersQuery();
  const orders = upcomingOrders?.orders || [];

  return (
    <div className="mt-10 lg:flex flex-wrap">
      <div className="border-r border-[#DCDEDF] pr-4 flex-1">
        <div className="mb-11">
          <p className="font-poppins text-[#5F6368] ">
            Revenue Statistics{" "}
            <span className="text-[#B2B5B8]">(last 7 days)</span>
          </p>
          <h2 className="font-poppins text-2xl font-medium text-[#171819] mt-2.5">
            ${data?.weekRevenue|| 0}
          </h2>
        </div>
        <HBarChart data={data} isLoading={isLoading} />
      </div>
      <div className="flex-1 md:pl-4 lg:mt-0 mt-6">
        <div className="mb-3.5">
          <p className="font-poppins text-[#5F6368] ">
            Upcoming Deadlines (next 3 days)
          </p>
          <p className="text-[#B2B5B8] text-sm mt-1.5">
            {upcomingOrders?.total || 0} Orders are in deadline
          </p>
        </div>
        <div className="overflow-y-auto max-h-72 pr-3">
          <table
            className="min-w-full text-sm font-normal overflow-x-scroll table-fixed border border-[#DCDEDF] overflow-hidden"
            style={{ height: "max-content" }}
          >
            <thead className="bg-[#F6F7F7]">
              <tr className="text-left py-2">
                <th className="px-3 py-3 text-[#5F6368] font-normal">
                  Order ID
                </th>
                <th className="px-3 py-3 text-[#5F6368] font-normal">
                  Services
                </th>
                <th className="px-3 py-3 text-[#5F6368] font-normal">
                  Due Date
                </th>
                <th className="px-3 py-3 text-[#5F6368] font-normal">Status</th>
              </tr>
            </thead>
             <tbody className=" text-[#36383A]">
              {orders && orders?.map((item) => (
                <tr key={item?.id} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3"><div className="max-w-52 truncate"><Link to={`/admin/orders/${item?.id}`}>{item?.id}</Link></div></td>
                  <td className="px-3 py-3"><Link to={`/admin/orders/${item?.id}`}><div className="max-w-40 truncate">{item.orderType === 'wonArticle' ? 'Publish My Own Article' : 'Write & Publish Article For Me'}</div></Link></td>
                  <td className="px-3 py-3"><Link to={`/admin/orders/${item?.id}`}>{formattedDate(item?.createdAt)}</Link></td>
                  <td className="pr-2.5">
                    <button
                      className={` text-white cursor-pointer px-1 py-0.5 rounded-sm capitalize font-normal w-full ${
                        item.status === "pending"
                          ? "bg-[#FFAB00]"
                          : item.status == "processing"
                          ? "bg-[#004a87]"
                          : "bg-[#171819]"
                      }`}
                    >
                      {item.status === "published" ? "writing" : item.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> 
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueStatistic;
