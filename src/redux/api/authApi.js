import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    users: build.query({
      query: (arg) => ({
        url: `${AUTH_URL}/get-all`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          users: response,
        };
      },
      providesTags: ["auth"],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["auth"],
    }),
    user: build.query({
      query: (id) => {
        return {
          url: `${AUTH_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["auth", 'update'],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/update/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: ["auth"],
    }),
    deleteUser: build.mutation({
      query: (id) => {
        return {
          url: `${AUTH_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
  overrideExisting: false,
});

export const { useUsersQuery,
  useUserLoginMutation,
  useUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation } = authApi;
