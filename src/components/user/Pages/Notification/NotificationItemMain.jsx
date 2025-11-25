import React from 'react';
import { CirclePen } from '../../../../utils/icons';
import { formatDateSmart } from '../../../../utils/function';

const NotificationItemMain = ({ notification }) => {
  return <div className={`flex items-start p-3 rounded-lg ${notification.status === 'unread' ? 'bg-[#004a870d]' : ''} cursor-pointer mb-2`}>
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
                <CirclePen />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                  {notification.status === 'unread' ?<span className="text-red-500 ml-1">•</span>: null}
                </p>
                <p className="text-sm text-gray-600">
                  {notification.message}
                </p>
              </div>
              <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
                {formatDateSmart(notification.createdAt)}
              </div>
            </div>
};

export default NotificationItemMain;