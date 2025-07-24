import { tableData } from "./data";

const Table = () => {
  return (
    <div className="w-full mt-6">
      <h5 className="text-[#222425] font-medium text-[18px] mb-4">
        Running Order
      </h5>
      <table border className="w-full bg-[#F6F7F7] text-[16px] font-normal">
        <thead className="w-full">
          <tr className="text-left py-2">
            <th className="px-3 py-3 text-[#222425]">SL</th>
            <th className="px-3 py-3 text-[#222425]">Order ID</th>
            <th className="px-3 py-3 text-[#222425]">Publication</th>
            <th className="px-3 py-3 text-[#222425]">Service</th>
            <th className="px-3 py-3 text-[#222425]">Details Submitted</th>
            <th className="px-3 py-3 text-[#222425]">Order Date</th>
            <th className="px-3 py-3 text-[#222425]">Status</th>
          </tr>
        </thead>
        <tbody className="w-full text-[#36383A]">
          {tableData.map((item, index) => (
            <tr key={index} className="border-t border-[#DCDEDF]">
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
              <td className={`px-3 py-3 capitalize`}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
