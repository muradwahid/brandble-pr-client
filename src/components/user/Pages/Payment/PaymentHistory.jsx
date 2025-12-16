import {  useState } from "react";
import { useUserOrdersQuery } from "../../../../redux/api/orderApi";
import { formattedDate } from "../../../../utils/function";
import { DownloadIcon } from "../../../../utils/icons";
// import Invoice from "../../../common/Invoice";
// import { useReactToPrint } from "react-to-print";
// import jsPDF from "jspdf";

const PaymentHistory = ({ search }) => {
  const [singleOrder, setSingleOrder] = useState({});
  // const invoiceRef = useRef();
  const { data } = useUserOrdersQuery({
    ...(search && { searchTerm: search })
  });

  const orderData = data?.data;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 mt-6">
        <p className="font-glare text-[#777980] font-normal">History</p>
        <button className="bg-[#24A4FF] flex cursor-pointer items-center gap-2.5 py-2.5 px-4 text-xs font-medium text-white">
          <DownloadIcon className="fill-white w-2.5" /> Download
        </button>
        {/* <div ref={invoiceRef}>
          <Invoice data={mockInvoiceData}/>

        </div> */}
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
          {
            orderData?.map(order => <tbody className="bg-white">
              <tr>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={order?.id === singleOrder?.id}
                    onChange={() =>
                      setSingleOrder(prev =>
                        prev?.id === order.id ? {} : order
                      )
                    }
                    className="accent-[#222425]  h-4 w-4 text-blue-600"
                  />
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                  {order.id}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                  {order.orderType === 'wonArticle' ? 'Won Article' :'Write & Publish'}
                  
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                  ${order.amount }
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                  {order.publication?.title}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368] capitalize">
                  {order.paymentMethod.type}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-[#5F6368]">
                  {formattedDate(order.createdAt)}
                </td>
              </tr>

            </tbody>)
          }
        </table>
      </div> 

      <div className="h-[50dvh] flex items-center justify-center ">
        <h1 className="text-3xl text-center leading-[150%]">No payment history found.</h1>
      </div>
      

    </div>
  );
};

export default PaymentHistory;
