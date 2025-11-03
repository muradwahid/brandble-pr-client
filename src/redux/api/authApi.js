import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    users: build.query({
      query: (arg) => ({
        url: `${AUTH_URL}/all-users`,
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
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["auth"],
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data,
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
      providesTags: ["auth", 'update','signin'],
    }),
    getUserByCookie: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}/get-user-by-cookie`,
          method: "GET",
          credentials: 'include',
        };
      },
      providesTags: ["auth", 'update','signin'],
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
    signout: build.mutation({
      query: () => {
        return {
          url: `${AUTH_URL}/signout`,
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
  useCreateUserMutation,
  useUserQuery,
  useGetUserByCookieQuery,
  useUpdateUserMutation,
  useSignoutMutation
} = authApi;
