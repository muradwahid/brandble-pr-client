import { baseApi } from "./baseApi";

const NOTIFICATION_URL = "/notifications";
export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query({
      query: (params) => ({
        url: `${NOTIFICATION_URL}/my-notifications`,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["notification"],
    }),
    // Mark single notification as read
    markAsRead: build.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),

    // Mark all notifications as read
    markAllAsRead: build.mutation({
      query: () => ({
        url: `${NOTIFICATION_URL}/mark-all-read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),

    // Get unread count
    getUnreadCount: build.query({
      query: () => ({
        url: `${NOTIFICATION_URL}/unread-count`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),

    // Delete notification
    deleteNotification: build.mutation({
      query: (id) => ({
        url: `${NOTIFICATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useGetUnreadCountQuery,
  useDeleteNotificationMutation,
} = notificationApi;