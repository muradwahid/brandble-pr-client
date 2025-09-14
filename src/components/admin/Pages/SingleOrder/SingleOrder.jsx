import { useState } from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { Link, useParams } from "react-router";
import { useOutsideClickClose } from "../../../../hooks/useOutsideClickClose";
import { publicationStatus } from "../../../../utils/data";
import { ArrowDown, DownloadFileIcon } from "../../../../utils/icons";
import { tableData } from "../../../user/Pages/DashboardPage/data";

const SingleOrder = () => {
  // const [toggle, setToggle] = useState(true);
  const [updateStatus, setUpdateStatus] = useState({
    label: "Submitted",
    value: "submitted",
    color: "bg-[#222425]",
  });
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { ref, btnRef } = useOutsideClickClose(() => setIsOpen(false));

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
                        <Link to={`/user/orders/running/${id}/details`}>
                          {orderDetails?.id}
                        </Link>
                      </td>
                      <td className="px-3 py-3">
                        <Link to={`/user/orders/running/${id}/details`}>
                          {orderDetails?.date}
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
          <div className="w-full md:w-[30%] space-y-16">
            {/* order status */}
            <div className="space-y-6 bg-[#F6F7F7] p-5">
              <div>
                <p className="text-[#878C91] mb-2 text-sm">Update Status</p>
                <div className="border border-[#DCDEDF] bg-white relative">
                  <div
                    className="flex items-center px-3 py-2 justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    ref={btnRef}
                  >
                    <p
                      className={`${updateStatus.color} text-sm font-medium px-3 py-1 text-white w-[164px]`}
                    >
                      {updateStatus.label}
                    </p>
                    <ArrowDown
                      fill="#171819"
                      className={`${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  {isOpen && (
                    <div
                      ref={ref}
                      className="absolute left-0 right-0 bg-white border border-[#DCDEDF] border-t-0 singleOrderPageUpdateStatus"
                    >
                      {publicationStatus.map(
                        (status, index) =>
                          status?.value !== updateStatus?.value && (
                            <div
                              key={index}
                              className="flex px-3 py-2 border-t border-[#DCDEDF] cursor-pointer "
                              onClick={() => {
                                setUpdateStatus(status);
                                setIsOpen(false);
                              }}
                            >
                              <p
                                className={`${status.color} px-3 py-1  text-sm font-medium  text-white w-[164px] text-center`}
                              >
                                {status.label}
                              </p>
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <p className="text-[#878C91] mb-2 text-sm">Name</p>
                <p className="text-[#36383A]">Lee Carter</p>
              </div>
              <div className="">
                <p className="text-[#878C91] mb-2 text-sm">Order Id</p>
                <p className="text-[#36383A]">653BSBE2-1O</p>
              </div>
              <div className="">
                <p className="text-[#878C91] mb-2 text-sm">Services</p>
                <p className="text-[#36383A]">Publish my own article</p>
              </div>
              <div className="">
                <p className="text-[#878C91] mb-2 text-sm">Publication</p>
                <p className="text-[#36383A]">Hood Critic</p>
              </div>
              <div className="">
                <p className="text-[#878C91] mb-2 text-sm">Amount</p>
                <p className="text-[#36383A]">$ 150</p>
              </div>
              <div className="">
                <p className="text-[#878C91] mb-2 text-sm">Order Date</p>
                <p className="text-[#36383A]">04/15/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
