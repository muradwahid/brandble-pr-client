import React, { useState } from 'react';
import { useOutsideClickClose } from '../../../../hooks/useOutsideClickClose';
import { publicationStatus } from '../../../../utils/data';
import { ArrowDown } from '../../../../utils/icons';

const OrderStatus = () => {
    const [updateStatus, setUpdateStatus] = useState({
      label: "Submitted",
      value: "submitted",
      color: "bg-[#222425]",
    });
    const [isOpen, setIsOpen] = useState(false);
    const { ref, btnRef } = useOutsideClickClose(() => setIsOpen(false));
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
  );
};

export default OrderStatus;