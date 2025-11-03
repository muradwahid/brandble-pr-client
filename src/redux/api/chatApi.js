import { baseApi } from "./baseApi";

const CHAT_URL = "/chat";
export const chatApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
    getUserChats: build.query({
            query: (arg) => ({
              url: `${CHAT_URL}/user/chats`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return response
            },
            providesTags: ["chat"],
        }),
    createOrderChat: build.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/order/${data.orderId}/chat`,
                method: "POST",
                data:data.body,
            }),
            invalidatesTags: ["chat"],
        }),
       getOrderChat: build.query({
            query: (id) => {
                return {
                  url: `${CHAT_URL}/order/${id}/chat`,
                    method: "GET",
                };
            },
            providesTags: ["chat"],
        }),
    sendMessage: build.mutation({
            query: (data) => ({
        url: `${CHAT_URL}/${data.roomId}/message`,
                method: "POST",
                data: data.body,
            }),
            invalidatesTags: ["chat"],
    }),
    addParticipant: build.query({
      query: (data) => {
        return {
          url: `${CHAT_URL}${data.roomId}/participant`,
          method: "POST",
          data:data.body
        };
      },
      providesTags: ["chat"],
    }),

    getAllAdmins: build.query({
      query: (arg) => ({
        url: `${CHAT_URL}/admins`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return response
      },
      providesTags: ["chat",'admin'],
    }),
    getOrderAdmins: build.query({
      query: (id) => {
        return {
          url: `${CHAT_URL}/order/${id}/admins`,
          method: "GET",
        };
      },
      providesTags: ["chat"],
    }),
    assignAdmin: build.mutation({
      query: (data) => ({
        url: `${CHAT_URL}/admin/assign`,
        method: "POST",
        data: data.body,
      }),
      invalidatesTags: ["chat",'admin'],
    }),

    }),
});

export const { useGetUserChatsQuery,
  useCreateOrderChatMutation,
  useGetOrderChatQuery,
  useSendMessageMutation,
  useAddParticipantMutation,
  useGetAllAdminsQuery,
  useGetOrderAdminsQuery,
  useAssignAdminMutation, } = chatApi;
