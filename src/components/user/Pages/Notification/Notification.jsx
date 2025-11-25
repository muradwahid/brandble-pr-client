import { LuCheckCheck } from "react-icons/lu";
import { BellIconSecond, CirclePen } from "../../../../utils/icons";
import Pagination from "../../../common/Pagination";
import { useState } from "react";
import { useGetNotificationsQuery, useMarkAllAsReadMutation } from "../../../../redux/api/notificationApi";
import NotificationItemMain from "./NotificationItemMain";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Use the query with pagination parameters
  const { data: notificationsData, isLoading } = useGetNotificationsQuery(
    {
      page: currentPage,
      limit: itemsPerPage
    },
    {
      pollingInterval: 30000, // 30 seconds (not 3 billion milliseconds!)
      refetchOnMountOrArgChange: true
    }
  );

  const notifications = notificationsData?.data;
  const meta = notificationsData?.meta || { total: 0, page: 1, limit: 50 };

  // Calculate total pages from API response
  const totalPages = Math.ceil(meta.total / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // The query will automatically refetch with new page parameter
    }
  };

  
    const [markAllAsRead] = useMarkAllAsReadMutation();

  
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
  

  if (isLoading) {
    return <div className="h-[70vh] w-full flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="w-full max-w-3xl md:mx-auto">
      {
        allNotifications.length >0 ?
      <div className="w-full">
      <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare mb-6">
        Notifications
      </h2>
      <div className="bg-white border border-[#DCDEDF]">
        <div className="flex justify-end items-center p-4 ">
          <p
            
            className="text-[#878C91] text-[12px] font-medium mr-4 flex items-center gap-1"
          >
            <BellIconSecond />
            Unread
          </p>
          <p
                  onClick={handleMarkAllAsRead}
            className="text-[#006AC2] hover:text-blue-800 text-[12px] font-medium flex gap-1 items-center"
          >
            <LuCheckCheck />
            Mark all as read
          </p>
        </div>
              {
                notifications?.today?.length > 0 &&
                <div className="p-4">
                  <h2 className="text-[#878C91] bg-[#DCDEDF] text-[12px] px-3 py-1 font-semibold mb-3">
                    Today
                  </h2>

                    {
                      notifications?.today?.map(notification=><NotificationItemMain key={notification.id} notification={notification} />)
                    }
                    
                </div>
              }
              {
                notifications?.yesterday?.length > 0 &&
                <div className="p-4">
                  <h2 className="text-[#878C91] bg-[#DCDEDF] text-[12px] px-3 py-1 font-semibold mb-3">
                    Yesterday
                  </h2>

                    {
                      notifications?.yesterday?.map(notification=><NotificationItemMain key={notification.id} notification={notification} />)
                    }
                    
                </div>
              }
              {
                notifications?.thisWeek?.length > 0 &&
                <div className="p-4">
                  <h2 className="text-[#878C91] bg-[#DCDEDF] text-[12px] px-3 py-1 font-semibold mb-3">
                    This Week
                  </h2>

                    {
                      notifications?.thisWeek?.map(notification=><NotificationItemMain key={notification.id} notification={notification} />)
                    }
                    
                </div>
              }
              {
                notifications?.older?.length > 0 &&
                <div className="p-4">
                  <h2 className="text-[#878C91] bg-[#DCDEDF] text-[12px] px-3 py-1 font-semibold mb-3">
                    Older Notification
                  </h2>

                    {
                      notifications?.older?.map(notification=><NotificationItemMain key={notification.id} notification={notification} />)
                    }
                    
                </div>
              }
      </div>
      <div className="sm:flex items-center justify-end md:gap-28 sm:gap-10 my-8">
        <select
          defaultValue="10"
                className="text-[#878C91] text-[14px] border border-[#B2B5B8] px-2 py-[5.5px] focus:outline-2 focus:outline-[#004A87] md:mt-0 mt-1.5 sm:mb-0 mb-5 "
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        >
          <option value="5" defaultValue="5">
            5 Result
          </option>
          <option value="10">10 Result</option>
          <option value="15">15 Result</option>
          <option value="20">20 Result</option>
          <option value="30">30 Result</option>
        </select>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div> 
      </div>:
      <div className="h-[50dvh] flex items-center justify-center ">
        <h1 className="text-3xl text-center leading-[150%]">No new notifications. You’ll see updates here as they come in.</h1>
      </div>
      }
    </div>
  );
};

export default Notification;
