import React from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { Link, useParams } from "react-router";
import { LeftArrowIcon } from "../../../../../../utils/icons";
import OrderStatusAndChat from "./OrderStatusAndChat";
import { useOrderQuery } from "../../../../../../redux/api/orderApi";
import { formattedDate } from "../../../../../../utils/function";

const Order = () => {
  const { id } = useParams();
  const { data, isLoading } = useOrderQuery(id)

  if (isLoading) {
    return <div className="h-[70vh] w-full flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      {/* back button */}
      <button
        className="text-[#002747] hover:text-[#075ca1] hover:fill-[#075ca1] text-[16px] flex items-center gap-2.5 cursor-pointer"
        onClick={() => window.navigation.back()}
      >
        <LeftArrowIcon />
        Back
      </button>
      <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare mt-11 mb-6">
        Order Details
      </h2>
      <div className="w-full h-full flex gap-6 flex-col md:flex-row">
        {/* order details */}
        <div className="w-full md:w-[70%]">
          <div className="w-full border p-6 border-[#DCDEDF]">
            <h3 className="text-[#222425] text-[20px] font-glare mb-2 border-b border-[#DCDEDF] pb-3">
              Submitted Information
            </h3>
            <p className="text-[#5F6368] text-sm pt-3 pb-2.5">Article</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-[16px] font-normal overflow-x-scroll table-fixed">
                <thead className="bg-[#F6F7F7] border-b border-[#DCDEDF]">
                  <tr className="text-left py-2">
                    <th className="px-3 py-3 text-[#222425] font-medium w-[5%]">
                      SL
                    </th>
                    <th className="px-3 py-3 text-[#222425] font-medium">
                      File
                    </th>
                    <th className="px-3 py-3 text-[#222425] font-medium w-[50%]">
                      Order ID
                    </th>
                    <th className="px-3 py-3 text-[#222425] font-medium">
                      Publication
                    </th>
                    <th className="px-3 py-3 text-[#222425] font-medium">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className=" text-[#36383A]">
                  <tr className="border-b border-[#DCDEDF] hover:bg-[#F6F7F7] transition-all duration-300">
                    <td className="px-3 py-3">
                      1
                    </td>
                    <td className="px-3 py-3">
                      <a
                        href={data?.wonArticle?.file? JSON.parse(data?.wonArticle?.file )[0]:""}
                          className="tooltip"
                        data-tip='Click to download'
                        {...(data?.wonArticle?.file?{download:true}:{})}
                        >
                          <BsFileEarmarkText className="text-[#36383A] text-[20px]" />
                        </a>
                    </td>
                    <td className="px-3 py-3">
                        {data?.id}
                    </td>
                    <td className="px-3 py-3">
                        {data?.publication?.title}
                    </td>
                    <td className="px-3 py-3">
                        {formattedDate(data?.createdAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* message */}
            {
              data?.wonArticle?.message && <div className="w-full mt-14">
                <p className="text-[#5F6368] text-sm mb-3">Message</p>
                <div className="text-[#222425] bg-[#F6F7F7] border border-[#DCDEDF] p-3 w-full">
                  {data?.wonArticle?.message}
                </div>
              </div>

            }
    
          </div>
        </div>

        {/* order status and order message */}
        <OrderStatusAndChat orderDetails={data} />
      </div>
    </div>
  );
};

export default Order;
