import { baseApi } from "./baseApi";

const ORDER_URL = "/order";
export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    orders: build.query({
      query: (arg) => ({
        url: `${ORDER_URL}/user/all-orders`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          orders: response,
        };
      },
      providesTags: ["order","create"],
    }),
    adminOrders: build.query({
      query: (arg) => ({
        url: `${ORDER_URL}/admin/all-orders`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          orders: response,
        };
      },
      providesTags: ['admin-orders'],
    }),
    adminHomeOrders: build.query({
      query: (arg) => ({
        url: `${ORDER_URL}/admin/orders`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          orders: response,
        };
      },
      providesTags: ['admin-orders'],
    }),
    userOrders: build.query({
      query: (arg) => ({
        url: `${ORDER_URL}/user-all-orders`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return response
      },
      providesTags: ["order","create"],
    }),
    adminPaymentsStatistic: build.query({
      query: () => ({
        url: `${ORDER_URL}/admin/payment-revenue-statistics`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response
      },
      providesTags: ["order","create"],
    }),
    specificUserOrders: build.query({
      query: ({userId,...arg}) => ({
        url: `${ORDER_URL}/specific-user-orders/${userId}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return response
      },
      providesTags: ["order","create"],
    }),
    orderRevenue: build.query({
      query: (arg) => ({
        url: `${ORDER_URL}/revenue-statistics`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return response
      },
      providesTags: ["order","create"],
    }),
    addOrder: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["all-orders", 'admin-orders'],
    }),
    runningOrder: build.query({
      query: () => {
        return {
          url: `${ORDER_URL}/running-orders`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    order: build.query({
      query: (id) => {
        return {
          url: `${ORDER_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    orderStatistics: build.query({
      query: (arg) => {
        return {
          url: `${ORDER_URL}/statistics`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: ["order"],
    }),
    upcomingOrders: build.query({
      query: () => {
        return {
          url: `${ORDER_URL}/orders-upcoming-deadlines`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    updateOrder: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["order", 'admin-orders'],
    }),
    updateOrderStatus: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/${data.id}/status`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["order", 'admin-orders','notification'],
    }),
    deleteOrder: build.mutation({
      query: (id) => {
        return {
          url: `${ORDER_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["order", 'admin-orders'],
    }),
  }),
});

export const {
  useOrdersQuery,
  useAdminOrdersQuery,
  useAdminHomeOrdersQuery,
  useUserOrdersQuery,
  useAdminPaymentsStatisticQuery,
  useSpecificUserOrdersQuery,
  useAddOrderMutation,
  useOrderStatisticsQuery,
  useUpcomingOrdersQuery,
  useRunningOrderQuery,
  useOrderQuery,
  useOrderRevenueQuery,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation, } = orderApi;
