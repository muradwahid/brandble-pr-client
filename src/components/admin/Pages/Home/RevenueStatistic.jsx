import { tableData } from "../../../user/Pages/DashboardPage/data";
import HBarChart from "./HBarChart";

const RevenueStatistic = () => {
  const totalRevenue = "15,000";
  const runningOrders = 15;
  return (
    <div className="mt-10 lg:flex flex-wrap">
      <div className="border-r border-[#DCDEDF] pr-4 flex-1">
        <div className="mb-11">
          <p className="font-poppins text-[#5F6368] ">
            Revenue Statistics{" "}
            <span className="text-[#B2B5B8]">(last 7 days)</span>
          </p>
          <h2 className="font-poppins text-2xl font-medium text-[#171819] mt-2.5">
            ${totalRevenue}
          </h2>
        </div>
        <HBarChart />
      </div>
      <div className="flex-1 md:pl-4 lg:mt-0 mt-6">
        <div className="mb-3.5">
          <p className="font-poppins text-[#5F6368] ">
            Revenue Statistics (next 3 days)
          </p>
          <p className="text-[#B2B5B8] text-sm mt-1.5">
            {runningOrders} Orders are in deadline
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
              {tableData.slice(0, 1).map((item, index) => (
                <tr key={index} className="border-t border-[#DCDEDF]">
                  <td className="px-3 py-3">{item.id}</td>
                  <td className="px-3 py-3">{item.service}</td>
                  <td className="px-3 py-3">{item.date}</td>
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
