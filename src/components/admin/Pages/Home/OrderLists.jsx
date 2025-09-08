import {
  AccountCircle,
  ArrowDownIcon,
  ArrowUploadCircleIcon,
  ClearAllIcon,
  CurrencyIcon,
  DueDateIcon,
  PublicationBadgeIcon,
  ServicesIcon,
  SwapVertical,
} from "../../../../utils/icons";
import { tableData } from "../../../user/Pages/MyOrders/RunningOrder/data";

const OrderLists = () => {
  return (
    <div className="mt-10 pt-10 border-t border-[#DCDEDF]">
      <div className="mb-2.5 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <p className="font-poppins text-[#5F6368] font-poppins ">
            Today’s Orders
          </p>
          <div className="flex gap-2 items-center border border-[#DCDEDF] py-1 px-2.5 rounded-md cursor-pointer">
            <SwapVertical />
            <p className="text-[#878C91] text-sm">Sort by</p>
            <ArrowDownIcon className="ml-2.5" />
          </div>
        </div>
        <p className="text-[#5F6368] text-sm underline cursor-pointer">
          view all
        </p>
      </div>
      <div className="adminHomeTableWrapper">
        <table className="min-w-full text-sm font-normal overflow-y-scroll table-fixed border border-[#DCDEDF] border-l-0 overflow-hidden">
          <thead className="bg-[#F6F7F7]">
            <tr className="text-left py-2">
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5">
                  <ClearAllIcon /> Order ID
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5">
                  <AccountCircle /> User Name
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5">
                  <ServicesIcon /> Services
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5">
                  <PublicationBadgeIcon />
                  Publication
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5">
                  <CurrencyIcon />
                  Amount
                </span>{" "}
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5">
                  <DueDateIcon />
                  Due Date
                </span>
              </th>
              <th className="px-3 py-3 text-[#5F6368] font-normal">
                <span className=" flex items-center gap-1.5">
                  <ArrowUploadCircleIcon />
                  Status
                </span>
              </th>
            </tr>
          </thead>
          <tbody className=" text-[#36383A]">
            {tableData.map((item, index) => (
              <tr key={index} className="border-t border-[#DCDEDF]">
                <td className="px-3 py-3">{item.id}</td>
                <td className="px-3 py-3">{item.username}</td>
                <td className="px-3 py-3">{item.service}</td>
                <td className="px-3 py-3">{item.publication}</td>
                <td className="px-3 py-3">${item.amount}</td>
                <td className="px-3 py-3">{item.date}</td>
                <td className="pr-2.5">
                  <button
                    className={` text-white cursor-pointer px-1 py-1 rounded-sm capitalize font-normal w-28 ${
                      item.status === "pending"
                        ? "bg-[#FFAB00]"
                        : item.status == "processing"
                        ? "bg-[#004a87]"
                        : "bg-[#171819]"
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderLists;
