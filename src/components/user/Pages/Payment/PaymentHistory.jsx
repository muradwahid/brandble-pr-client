import { DownloadIcon } from "../../../../utils/icons";

const PaymentHistory = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 mt-6">
        <p className="font-glare text-[#777980] font-normal">History</p>
        <button className="bg-[#24A4FF] flex cursor-pointer items-center gap-2.5 py-2.5 px-4 text-xs font-medium text-white">
          <DownloadIcon className="fill-white w-2.5" /> Download
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-[#DCDEDF] payment-history-table">
          <thead className="bg-[#DCDEDF]">
            <tr>
              <th
                scope="col"
                className="px-3 py-2.5 text-left text-sm text-[#5F6368]"
              >
                <input
                  type="checkbox"
                  name="check_all"
                  className="accent-[#222425]  h-4 w-4 text-blue-600"
                />
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-left text-sm text-[#5F6368] font-normal"
              >
                Payment Invoice
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-left text-sm text-[#5F6368] font-normal"
              >
                Service
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-left text-sm text-[#5F6368] font-normal"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-left text-sm text-[#5F6368] font-normal"
              >
                Publication
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-left text-sm text-[#5F6368] font-normal"
              >
                Method
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-left text-sm text-[#5F6368] font-normal "
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <input
                  type="checkbox"
                  name="check_all"
                  className="accent-[#222425]  h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                #90987657
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Write & Publish
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                $150
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Hood Critic
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Card
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                03/03/2025
              </td>
            </tr>

            <tr>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="accent-[#222425]  h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                #90987657
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Write & Publish
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                $150
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Hood Critic
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Card
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                03/03/2025
              </td>
            </tr>

            <tr>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="accent-[#222425]  h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                #90987657
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Refine & Publish
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                $150
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Hood Critic
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Card
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                03/03/2025
              </td>
            </tr>

            <tr>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="accent-[#222425]  h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                #90987657
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Write & Publish
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                $150
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Hood Critic
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Card
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                03/03/2025
              </td>
            </tr>

            <tr>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="accent-[#222425]  h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                #90987657
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Refine & Publish
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                $150
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Hood Critic
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Card
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                03/03/2025
              </td>
            </tr>

            <tr>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="accent-[#222425]  h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                #90987657
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Write & Publish
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                $150
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Hood Critic
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Card
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                03/03/2025
              </td>
            </tr>

            <tr>
              <td className="px-3 py-2.5 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="accent-[#222425]  h-4 w-4 text-blue-600"
                />
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                #90987657
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Write & Publish
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                $150
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Hood Critic
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                Card
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                03/03/2025
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
