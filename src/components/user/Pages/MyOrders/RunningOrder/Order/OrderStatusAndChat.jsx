import React from 'react';
import Chat from './Chat';

const OrderStatusAndChat = ({orderDetails}) => {
  return (
    <div className="w-full md:w-[30%] space-y-16">
      {/* order status */}
      <div className="space-y-6 bg-[#F6F7F7] p-5">
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
      {/* chat */}
      <Chat/>
    </div>
  );
};

export default OrderStatusAndChat;