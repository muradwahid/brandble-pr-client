import { BsFileEarmarkText } from "react-icons/bs";
import { Link, useParams } from "react-router";
import { DownloadFileIcon } from "../../../../utils/icons";
import { tableData } from "../../../user/Pages/DashboardPage/data";
import OrderStatus from "./OrderStatus";

const SingleOrder = () => {
  const { id } = useParams();
  const orderDetails = tableData.find((order) => order.id === "653BSBE2-1O");

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
                        <Link to={`/admin/orders/${id}/details`}>
                          {orderDetails?.id}
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        <Link to={`/admin/orders/${id}/details`}>
                          {orderDetails?.date}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="px-3 py-3"
                          to={`/admin/orders/${id}/details`}
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
                          to={`/admin/orders/${id}/details`}
                        >
                          <DownloadFileIcon className="-mt-1" /> Download
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-14">
              <p className="text-[#5F6368] text-sm mb-3">Message</p>
              <div className="text-[#36383A] bg-[#F6F7F7] border border-[#DCDEDF] p-3">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Ornare vitae posuere
                  faucibus sit dis vulputate sed. Aliquam diam sem sed nisi sed
                  velit ipsum. Ullamcorper amet posuere mi diam habitasse
                  ullamcorper arcu sed ipsum. Amet sed convallis suscipit
                  molestie a ut. Lorem ipsum dolor sit amet consectetur. Ornare
                  vitae posuere faucibus sit dis vulputate sed. Aliquam diam sem
                  sed nisi sed velit ipsum. Ullamcorper amet posuere mi diam
                  habitasse ullamcorper arcu sed ipsum. Amet sed convallis
                  suscipit molestie a ut.
                </p>
              </div>
            </div>
          </div>

          {/* order status */}
          <div className="md:w-[30%] w-full">
            <OrderStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
