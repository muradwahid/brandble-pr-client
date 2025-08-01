import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router";
import { tableData } from "./data";

const RunningOrder = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-5 border-b-2 border-[#DCDEDF] pb-3 flex-wrap gap-1.5">
          <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare">
            Orders
          </h2>
          <div className="flex gap-1.5 mt-[2px]">
            <input
              type="text"
              id="orderSearch"
              placeholder="Search Here..."
              className=" border border-[#DCDEDF] py-1 px-3 text-[14px] focus:outline-2 focus:outline-[#004A87] text-[#5F6368] placeholder-[#5F6368] bg-white rounded-sm w-full"
            />
            <button className="border border-[#DCDEDF] px-2 rounded-sm cursor-pointer">
              <label htmlFor="orderSearch">
                <FaMagnifyingGlass className="cursor-pointer text-[#B2B5B8]" />
              </label>
            </button>
          </div>
        </div>
        <table className="min-w-full bg-[#F6F7F7] text-[16px] font-normal overflow-x-scroll table-fixed">
          <thead className="">
            <tr className="text-left py-2">
              <th className="px-3 py-3 text-[#222425] font-medium w-[5%]">
                SL
              </th>
              <th className="px-3 py-3 text-[#222425] font-medium">Order ID</th>
              <th className="px-3 py-3 text-[#222425] font-medium">
                Publication
              </th>
              <th className="px-3 py-3 text-[#222425] font-medium">Service</th>
              <th className="px-3 py-3 text-[#222425] font-medium">
                Details Submitted
              </th>
              <th className="px-3 py-3 text-[#222425] font-medium">
                Order Date
              </th>
              <th className="px-3 py-3 text-[#222425] font-medium">Status</th>
            </tr>
          </thead>
          <tbody className=" text-[#36383A]">
            {tableData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-[#DCDEDF] hover:bg-[#DCDEDF] transition-all duration-300 "
              >
                <td className="px-3 py-3">
                  <Link to={`/user/orders/running/${item.id}`}>
                    {index + 1}
                  </Link>
                </td>
                <td className="px-3 py-3 text-[#006AC2] cursor-pointer">
                  <Link to={`/user/orders/running/${item.id}`}>{item.id}</Link>
                </td>
                <td className="px-3 py-3 cursor-pointer">
                  <Link to={`/user/orders/running/${item.id}`}>
                    {item.publication}
                  </Link>
                </td>
                <td className="px-3 py-3 cursor-pointer">
                  <Link to={`/user/orders/running/${item.id}`}>
                    {item.service}
                  </Link>
                </td>
                <td
                  className={`px-3 py-3 ${
                    item.submitted ? "text-[#00875A]" : "text-[#FF5630]"
                  }`}
                >
                  <Link to={`/user/orders/running/${item.id}`}>
                    {item.submitted ? "Submitted" : "Not Yet"}
                  </Link>
                </td>
                <td className="px-3 py-3">
                  <Link to={`/user/orders/running/${item.id}`}>
                    {item.date}
                  </Link>
                </td>
                <td className="pr-2.5">
                  <button
                    className={` text-white cursor-pointer py-1 px-4 capitalize font-medium w-full ${
                      item.status === "pending"
                        ? "bg-[#FFAB00]"
                        : item.status == "processing"
                        ? "bg-[#36B37E]"
                        : "bg-[#008CFF]"
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

export default RunningOrder;
