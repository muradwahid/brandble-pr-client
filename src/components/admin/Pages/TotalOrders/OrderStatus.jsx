import {useState } from 'react';
import { useOutsideClickClose } from '../../../../hooks/useOutsideClickClose';
import { publicationStatus, statusBgColor } from '../../../../utils/data';
import { ArrowDown } from '../../../../utils/icons';
import { formattedDate } from '../../../../utils/function';
import { useUpdateOrderStatusMutation } from '../../../../redux/api/orderApi';

const OrderStatus = ({ data }) => {
  const [updateStatus, setUpdateStatus] = useState(data?.status);
    const [isOpen, setIsOpen] = useState(false);
  const { ref, btnRef } = useOutsideClickClose(() => setIsOpen(false));

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleUpdateStatus = async (status) => { 
    console.log(status, ' : status');
    const updateData = { id: data?.id, status }
    console.log(updateData, ' : data');
    try {
      
      const result = await updateOrderStatus({ id: data?.id, body: { status } })
      console.log({result});
    } catch (error) {
      console.error(error);
    }
  }
  const color =
    data?.status === 'published' ? statusBgColor.published :
      data?.status === 'submitted' ? statusBgColor.submitted :
        data?.status === 'processing' ? statusBgColor.processing :
          data?.status === 'unabletopublish' ? statusBgColor.unabletopublish :
            'bg-[#FFAB00]';

  return (
    <div className="w-full space-y-16">
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
                className={`${color} text-sm font-medium px-3 py-1 text-white w-[164px] capitalize`}
              >
                {data?.status}
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
                    status?.value !== updateStatus && (
                      <div
                        key={index}
                        className="flex px-3 py-2 border-t border-[#DCDEDF] cursor-pointer "
                        onClick={() => {
                          setUpdateStatus(status.value);
                          setIsOpen(false);
                          handleUpdateStatus(status.value);
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
          <p className="text-[#36383A]">{data?.name}</p>
        </div>
        <div className="">
          <p className="text-[#878C91] mb-2 text-sm">Order Id</p>
          <p className="text-[#36383A]">{data?.id}</p>
        </div>
        <div className="">
          <p className="text-[#878C91] mb-2 text-sm">Services</p>
          <p className="text-[#36383A]">{data?.orderType === "wonArticle" ? "Publish my own article" : "Write & Publish Article For Me"}</p>
        </div>
        <div className="">
          <p className="text-[#878C91] mb-2 text-sm">Publication</p>
          <p className="text-[#36383A]">{data?.publication?.title}</p>
        </div>
        <div className="">
          <p className="text-[#878C91] mb-2 text-sm">Amount</p>
          <p className="text-[#36383A]">${data?.amount}</p>
        </div>
        <div className="">
          <p className="text-[#878C91] mb-2 text-sm">Order Date</p>
          <p className="text-[#36383A]">{formattedDate(data?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;