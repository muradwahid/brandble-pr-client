import { forwardRef } from 'react';
import { LuCheckCheck } from 'react-icons/lu';
import { Link } from 'react-router';

import NotificationItem from './NotificationItem';
import { useSocketListener } from '../../../hooks/useSocketListener';
import { useMarkAllAsReadMutation, useMarkAsReadMutation } from '../../../redux/api/notificationApi';
import { CancelIcon } from '../../../utils/icons';


const NavBarNotification = forwardRef(function NavBarNotification(
  { seToggleNotification, unreadCount, type="client",refetch,notificationsData, isLoading },
  ref
) {

  const [markAsRead] = useMarkAsReadMutation()

  useSocketListener("new_notification", () => {
    refetch();
  }, [refetch]);

  const [markAllAsRead] = useMarkAllAsReadMutation();

  const notifications = notificationsData?.data;
  const meta = notificationsData?.meta || {};

  const handleMarkAllAsRead = async () => {
    try {
     await markAllAsRead({ type }).unwrap();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleRead = async (id) => { 
    try {
      await markAsRead({ id }).unwrap();
    } catch {
      console.error("Failed to mark as read");
    }
  }
  // console.log(notificationsData);

  return (
    <div ref={ref} className='absolute w-[450px] z-50 steperform-publish-formshadow right-0 top-[101%] bg-white '>
      {isLoading ? <div className='h-52 flex items-center justify-center'><p className='text-[#878C91]'>Loading...</p></div>: <div className='max-h-[600px] overflow-y-scroll'>
      {
          meta?.total > 0 ?
          <div className="w-full">
   
            <div className="bg-white">
                <div className='flex items-center justify-between p-4 pb-0'>
            
                <h2 className="md:text-2xl text-[18px] text-[#5f6368] font-poppins">
                  Notifications
                </h2>
                <p
                    onClick={handleMarkAllAsRead}
                    className={`${unreadCount > 0 ? 'text-[#006AC2] hover:text-blue-800' :'text-[#878C91]'}  text-[12px] font-medium flex gap-1 items-center cursor-pointer`}
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
                        onClick={() => handleRead(notification.id)}
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
                        onClick={() => handleRead(notification.id)}
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
                        onClick={() => handleRead(notification.id)}
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
                        onClick={() => handleRead(notification.id)}
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

      </div>}
      <div className='border-t border-[#F2F2F3] flex items-center justify-between mx-4 py-4'>
        {<Link to='/user/notifications' onClick={() => seToggleNotification(false)} className='text-[#878C91] text-xs font-normal'>View all notification</Link>}
        <CancelIcon className='cursor-pointer' onClick={() => seToggleNotification(false)} />
      </div>
    </div>
  );
});

export default NavBarNotification;