import React from 'react';
import { BellIconSecond, CancelIcon, CirclePen } from '../../../../utils/icons';
import { LuCheckCheck } from 'react-icons/lu';
import { Link } from 'react-router';

const NavBarNotification = ({ ref, seToggleNotification }) => {
  const notificationData =[]
  return (
    <div ref={ref} className='absolute w-[450px] steperform-publish-formshadow right-0 top-[101%] bg-white '>
      <div className='max-h-[600px] overflow-y-scroll'>
      {
        notificationData.length > 0 ?
          <div className="w-full">
   
            <div className="bg-white">
              <div className='flex items-center justify-between p-4 pb-0'>
                <h2 className="md:text-2xl text-[18px] text-[#5f6368] font-poppins">
                  Notifications
                </h2>
                <a
                  href="#"
                  className="text-[#006AC2] hover:text-blue-800 text-[12px] font-medium flex gap-1 items-center"
                >
                  <LuCheckCheck />
                  Mark all as read
                </a>
      
              </div>

              <div className="p-4">
                <h2 className="text-[#878C91] bg-[#f2f2f3] text-xs px-3 py-1 font-medium mb-3 font-poppins">
                  Today
                </h2>

                <div className="flex items-start p-2 bg-[#004a870a] cursor-pointer mb-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#f2f2f3] flex items-center justify-center mr-3">
                    <CirclePen className='fill-[#878C91]' />
                  </div>
                  <div className="flex-grow">
                      <p className="text-sm font-medium text-[#36383A]">
                      Article Submission Confirmation
                      <span className="text-red-500 ml-1">•</span>
                    </p>
                      <p className="text-xs text-[#5F6368] mt-1.5">
                      Your article '[Title]' has been submitted! We'll notify you once
                      our editors review it (ETA: 24hrs).
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
                    30m ago
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
                    <CirclePen />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">
                      Article Submission Confirmation
                      <span className="text-red-500 ml-1">•</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Your article '[Title]' has been submitted! We'll notify you once
                      our editors review it (ETA: 24hrs).
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
                    5h ago
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
                    <CirclePen />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">
                      Article Submission Confirmation
                      <span className="text-red-500 ml-1">•</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Your article '[Title]' has been submitted! We'll notify you once
                      our editors review it (ETA: 24hrs).
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
                    7h ago
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
                    <CirclePen />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">
                      Article Submission Confirmation
                      <span className="text-red-500 ml-1">•</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Your article '[Title]' has been submitted! We'll notify you once
                      our editors review it (ETA: 24hrs).
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
                    7h ago
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-[#878C91] bg-[#DCDEDF] text-[12px] px-3 py-1 font-semibold mb-3">
                  Yesterday
                </h2>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
                    <CirclePen />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">
                      Article Submission Confirmation
                    </p>
                    <p className="text-sm text-gray-600">
                      Your article '[Title]' has been submitted! We'll notify you once
                      our editors review it (ETA: 24hrs).
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
                    11/25/2025
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer mb-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
                    <CirclePen />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">
                      Article Submission Confirmation
                    </p>
                    <p className="text-sm text-gray-600">
                      Your article '[Title]' has been submitted! We'll notify you once
                      our editors review it (ETA: 24hrs).
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
                    11/25/2025
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-200 flex items-center justify-center mr-3">
                    <CirclePen />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-900">
                      Article Submission Confirmation
                    </p>
                    <p className="text-sm text-gray-600">
                      Your article '[Title]' has been submitted! We'll notify you once
                      our editors review it (ETA: 24hrs).
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 ml-4">
                    11/25/2025
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <div className="h-[50dvh] flex items-center justify-center px-5">
            <h1 className="text-xl text-center leading-[150%]">No new notifications. You’ll see updates here as they come in.</h1>
          </div>
      }

      </div>
      <div className='border-t border-[#F2F2F3] flex items-center justify-between mx-4 py-4'>
        {<Link to='user/notifications' onClick={() => seToggleNotification(false)} className='text-[#878C91] text-xs font-normal'>View all notification</Link>}
        <CancelIcon className='cursor-pointer' onClick={() => seToggleNotification(false)} />
      </div>
    </div>
  );
};

export default NavBarNotification;