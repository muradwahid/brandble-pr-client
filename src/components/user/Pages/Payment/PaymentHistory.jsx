import {  useRef, useState } from "react";
import { useUserOrdersQuery } from "../../../../redux/api/orderApi";
import { formattedDate } from "../../../../utils/function";
import { DownloadIcon, LoadingIcon } from "../../../../utils/icons";
import Invoice from "../../../common/Invoice";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { createInvoiceDataFromOrder } from "../../../../utils/data";

const PaymentHistory = ({ search }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const invoiceRef = useRef();
  const { data } = useUserOrdersQuery({
    ...(search && { searchTerm: search })
  });

  const orderData = data?.data;
  // console.log(orderData);

  const downloadPDF = async () => {
    if (selectedOrders.length === 0) {
      // alert("Please select at least one order to generate an invoice.");
      return;
    }

    const element = invoiceRef.current;
    if (!element) {
      // alert("Invoice not ready. Please try again.");
      return;
    }

    setLoadingDownload(true);

    try {
      const canvas = await html2canvas(element, {
        scale: 1.4,                  // Good quality + faster than 2.0
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1100,           // Prevents oversized canvas on big screens
      });

      if (canvas.width < 100 || canvas.height < 100) {
        // alert("Invoice failed to render properly.");
        return;
      }

      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
      const width = canvas.width * ratio;
      const height = canvas.height * ratio;

      pdf.addImage(imgData, 'JPEG', (pdfWidth - width) / 2, 10, width, height);
      pdf.save(`Order_Invoice.pdf`);

    } catch (error) {
      console.error("PDF generation error:", error);
      // alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoadingDownload(false);
    }
  };


  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
      setSelectAll(false);
    } else {
      const allOrderIds = orderData?.map(order => order.id) || [];
      setSelectedOrders(allOrderIds);
      setSelectAll(true);
    }
  };

  // Toggle individual row
  const handleSelectRow = (orderId) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        const newSelected = prev.filter(id => id !== orderId);
        // If nothing selected anymore, uncheck "Select All"
        if (newSelected.length === 0) setSelectAll(false);
        return newSelected;
      } else {
        const newSelected = [...prev, orderId];
        // If all are now selected, check "Select All"
        if (newSelected.length === orderData?.length) setSelectAll(true);
        return newSelected;
      }
    });
  };

  return (
    <div className="w-full">
      <div className="invisible overflow-hidden h-0">
        <div className="visible">
          <Invoice ref={invoiceRef} data={createInvoiceDataFromOrder(selectedOrders)} />
        </div>
      </div>
      <div className="flex items-center justify-between mb-3 mt-6">
        <p className="font-glare text-[#777980] font-normal">History</p>
        <button onClick={downloadPDF} className="bg-[#24A4FF] flex cursor-pointer items-center gap-2.5 py-2.5 px-4 text-xs font-medium text-white">
          <DownloadIcon className="fill-white w-2.5" /> {loadingDownload ?'Downloading...':'Download'}
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
                  checked={selectAll}
                  onChange={handleSelectAll}
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
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectRow(order.id)}
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
