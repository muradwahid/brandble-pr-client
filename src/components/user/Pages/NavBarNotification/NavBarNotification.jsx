import React from 'react';
import { BellIconSecond, CancelIcon, CirclePen } from '../../../../utils/icons';
import { LuCheckCheck } from 'react-icons/lu';
import { Link } from 'react-router';
import { useGetNotificationsQuery, useMarkAllAsReadMutation } from '../../../../redux/api/notificationApi';
import NotificationItem from './NotificationItem';

const NavBarNotification = ({ ref, seToggleNotification }) => {

  const { data: notificationsData } = useGetNotificationsQuery(
    { limit: 20 },
    { pollingInterval: 3000000000 }
  );

  const [markAllAsRead] = useMarkAllAsReadMutation();

  const notifications = notificationsData?.data;

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const allNotifications = notifications ? [
    ...(notifications.today || []),
    ...(notifications.yesterday || []),
    ...(notifications.thisWeek || []),
    ...(notifications.older || [])
  ] : [];
  return (
    <div ref={ref} className='absolute w-[450px] steperform-publish-formshadow right-0 top-[101%] bg-white '>
      <div className='max-h-[600px] overflow-y-scroll'>
      {
          allNotifications.length > 0 ?
          <div className="w-full">
   
            <div className="bg-white">
                <div className='flex items-center justify-between p-4 pb-0'>
            
                <h2 className="md:text-2xl text-[18px] text-[#5f6368] font-poppins">
                  Notifications
                </h2>
                <p
                    onClick={handleMarkAllAsRead}
                  className="text-[#006AC2] hover:text-blue-800 text-[12px] font-medium flex gap-1 items-center"
                >
                  <LuCheckCheck />
                  Mark all as read
                </p>
      
              </div>

                {
                  notifications?.today?.length > 0 && <div className="p-4">
                    <h2 className="text-[#878C91] bg-[#f2f2f3] text-xs px-3 py-1 font-medium mb-3 font-poppins">
                      Today
                    </h2>
                    
                    { 
                      notifications?.today?.map((notification => <NotificationItem key={notification.id}
                        notification={notification}
                         />))
                    }
                  </div>
                }
                {
                  notifications?.yesterday?.length > 0 && <div className="p-4">
                    <h2 className="text-[#878C91] bg-[#f2f2f3] text-xs px-3 py-1 font-medium mb-3 font-poppins">
                      Yesterday
                    </h2>
                    
                    { 
                      notifications?.yesterday?.map((notification => <NotificationItem key={notification.id}
                        notification={notification}
                         />))
                    }
                  </div>
                }
                {
                  notifications?.thisWeek?.length > 0 && <div className="p-4">
                    <h2 className="text-[#878C91] bg-[#f2f2f3] text-xs px-3 py-1 font-medium mb-3 font-poppins">
                      This Week
                    </h2>
                    
                    { 
                      notifications?.thisWeek?.map((notification => <NotificationItem key={notification.id}
                        notification={notification}
                         />))
                    }
                  </div>
                }
                {
                  notifications?.older?.length > 0 && <div className="p-4">
                    <h2 className="text-[#878C91] bg-[#f2f2f3] text-xs px-3 py-1 font-medium mb-3 font-poppins">
                      Older Notification
                    </h2>
                    
                    { 
                      notifications?.older?.map((notification => <NotificationItem key={notification.id}
                        notification={notification}
                         />))
                    }
                  </div>
                }
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