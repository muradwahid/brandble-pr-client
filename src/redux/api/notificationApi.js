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
    getAdminNotifications: build.query({
      query: (params) => ({
        url: `${NOTIFICATION_URL}/admin/get-all-notifications`,
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
      query: (arg) => ({
        url: `${NOTIFICATION_URL}/mark-all-read`,
        method: "PATCH",
        params: arg,
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
    // get admin unread count
    getAdminUnreadCount: build.query({
      query: () => ({
        url: `${NOTIFICATION_URL}/admin/unread-count`,
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
  useGetAdminNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useGetUnreadCountQuery,
  useGetAdminUnreadCountQuery,
  useDeleteNotificationMutation,
} = notificationApi;