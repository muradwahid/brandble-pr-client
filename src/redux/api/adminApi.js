
import { baseApi } from "./baseApi";

const ADMIN_URL = "/admins";
export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdminWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ['admin'],
    }),
    admins: build.query({
      query: (arg) => {
        return {
          url: ADMIN_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response, meta) => {
        return {
          admins: response,
          meta,
        };
      },
      providesTags: ['admin'],
    }),
  }),
});

export const { useAddAdminWithFormDataMutation, useAdminsQuery } = adminApi;
