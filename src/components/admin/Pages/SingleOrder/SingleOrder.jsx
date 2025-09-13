import { BsFileEarmarkText } from "react-icons/bs";
import { Link, useParams } from "react-router";
import { DownloadFileIcon } from "../../../../utils/icons";
import { tableData } from "../../../user/Pages/DashboardPage/data";
import { useState } from "react";

const SingleOrder = () => {
  // const [toggle, setToggle] = useState(true);
  const { id } = useParams();
  const orderDetails = tableData.find((order) => order.id === 'fsadf');

  return (
    <div>
      <div className="w-full h-full">
        <div className="w-full h-full flex gap-6 flex-col md:flex-row">
          {/* order details */}

          <div className="w-full md:w-[70%]">
            <div className="flex items-center justify-between mb-6">
              <h2 className=" text-[#5F6368] font-glare">Order Details</h2>
              <button
                type="button"
                className="text-[#222425] bg-[#F6F7F7] px-3 py-1 flex items-center gap-2 cursor-pointer"
              >
                <DownloadFileIcon className="-mt-1" /> Download
              </button>
            </div>
            <p className="text-[#222425] font-glare mb-6 border-b border-[#DCDEDF] pb-3">
              Submitted information
            </p>
            <div className="w-full mt-6">
              <p className="text-[#5F6368] text-sm mb-3">Submitted Article</p>
              <div className="overflow-x-auto">
                <table className="min-w-full  font-normal overflow-x-scroll table-fixed">
                  <thead className="bg-[#F6F7F7] border-b border-[#DCDEDF]">
                    <tr className="text-left py-2">
                      <th className="px-3 py-3 text-[#222425] font-normal ">
                        Order ID
                      </th>
                      <th className="px-3 py-3 text-[#222425] font-normal">
                        Date
                      </th>
                      <th className="px-3 py-3 text-[#222425] font-normal">
                        File
                      </th>

                      <th className="px-3 py-3 text-[#222425] font-normal">
                        Download File
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" text-[#36383A]">
                    <tr className="border-b border-[#DCDEDF] hover:bg-[#F6F7F7] transition-all duration-300">
                      <td className="px-3 py-3">
                        <Link to={`/user/orders/running/${id}/details`}>
                          {orderDetails.id}
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        <Link to={`/user/orders/running/${id}/details`}>
                          {orderDetails.date}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="px-3 py-3"
                          to={`/user/orders/running/${id}/details`}
                        >
                          <div
                            className="tooltip"
                            data-tip={orderDetails?.publication}
                          >
                            <BsFileEarmarkText className="text-[#36383A] text-[20px]" />
                          </div>
                        </Link>
                      </td>

                      <td>
                        <Link
                          className="px-3 py-3 flex gap-1.5 items-center"
                          to={`/user/orders/running/${id}/details`}
                        >
                          <DownloadFileIcon className="-mt-1" /> Download
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* order status */}
          <div className="w-full md:w-[30%] space-y-16">
            {/* order status */}
            <div className="space-y-6 bg-[#F6F7F7] p-5">
              <div>
                <p className="text-[#878C91]">Update Status</p>
              </div>
              <div className="flex justify-between">
                <div className="">
                  <p className="text-[#5F6368] text-sm mb-2">Order ID</p>
                  <p className="text-[#36383A]">{orderDetails.id}</p>
                </div>
                <p className="bg-[#FFAB00] text-white h-7 text-sm font-medium flex items-center justify-center px-10 capitalize">
                  {orderDetails.status}
                </p>
              </div>
              <div>
                <p className="text-[#5F6368] text-sm mb-1.5">Service</p>
                <p className="text-[#36383A]">{orderDetails.service}</p>
              </div>
              <div>
                <p className="text-[#5F6368] text-sm mb-1.5">Order Date</p>
                <p className="text-[#36383A]">{orderDetails.date}</p>
              </div>
              <div>
                <p className="text-[#5F6368] text-sm mb-1.5">Publication</p>
                <p className="text-[#36383A]">{orderDetails.publication}</p>
              </div>
              <div>
                <p className="text-[#5F6368] text-sm mb-1.5">Amount</p>
                <p className="text-[#36383A]">${orderDetails.amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
