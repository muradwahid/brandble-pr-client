import { tableData } from "./data";

const Table = () => {
  return (
    <div className="mt-6 overflow-x-auto">
      <h5 className="text-[#222425] font-medium text-[18px] mb-4 font-glare">
        Running Order
      </h5>
      <table className="min-w-full bg-[#F6F7F7] text-[16px] font-normal overflow-x-scroll table-fixed">
        <thead className="">
          <tr className="text-left py-2">
            <th className="px-3 py-3 text-[#222425] font-medium w-[5%]">SL</th>
            <th className="px-3 py-3 text-[#222425] font-medium">Order ID</th>
            <th className="px-3 py-3 text-[#222425] font-medium">
              Publication
            </th>
            <th className="px-3 py-3 text-[#222425] font-medium">Service</th>
            <th className="px-3 py-3 text-[#222425] font-medium">
              Details Submitted
            </th>
            <th className="px-3 py-3 text-[#222425] font-medium">Order Date</th>
            <th className="px-3 py-3 text-[#222425] font-medium">Status</th>
          </tr>
        </thead>
        <tbody className=" text-[#36383A]">
          {tableData.map((item, index) => (
            <tr
              key={index}
              className="border-t border-[#DCDEDF] hover:bg-[#DCDEDF] transition-all duration-300 "
            >
              <td className="px-3 py-3">{index + 1}</td>
              <td className="px-3 py-3">{item.id}</td>
              <td className="px-3 py-3">{item.publication}</td>
              <td className="px-3 py-3">{item.service}</td>
              <td
                className={`px-3 py-3 ${
                  item.submitted ? "text-[#00875A]" : "text-[#FF5630]"
                }`}
              >
                {item.submitted ? "Submitted" : "Not Yet"}
              </td>
              <td className="px-3 py-3">{item.date}</td>
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
  );
};

export default Table;
