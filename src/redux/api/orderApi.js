import { baseApi } from "./baseApi";

const ORDER_URL = "/order";
export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    orders: build.query({
      query: (arg) => ({
        url: `${ORDER_URL}/all-orders`,
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
    addOrder: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["all-orders"],
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
    updateOrder: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: build.mutation({
      query: (id) => {
        return {
          url: `${ORDER_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useOrdersQuery,
  useAddOrderMutation,
  useOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation, } = orderApi;
