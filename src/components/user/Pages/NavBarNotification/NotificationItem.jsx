import React from "react";
import { CirclePen } from "../../../../utils/icons";
import { formatDateSmart } from "../../../../utils/function";

const NotificationItem = ({ notification }) => {
  return (
    <div className={`flex items-start p-2 ${notification.status === 'unread' ?'bg-[#004a870d]':''}  cursor-pointer mb-2`}>
      <div className="flex-shrink-0 w-8 h-8 bg-[#f2f2f3] flex items-center justify-center mr-3">
        <CirclePen className="fill-[#878C91]" />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-[#36383A]">
          {notification.title}
          {notification.status === 'unread'? <span className="text-red-500 ml-1">•</span> :null}
        </p>
        <p className="text-xs text-[#5F6368] mt-1.5">{notification.message}</p>
      </div>
      <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
        {formatDateSmart(notification.createdAt)}
      </div>
    </div>
  );
};

export default NotificationItem;
