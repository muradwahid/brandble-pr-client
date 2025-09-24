import { baseApi } from "./baseApi";

const NICHE_URL = "/publication";
export const publicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    publications: build.query({
      query: (arg) => ({
        url: `${NICHE_URL}/all-publications`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          publications: response,
        };
      },
      providesTags: ["publication",'all-publications'],
    }),
    addPublication: build.mutation({
      query: (data) => ({
        url: `${NICHE_URL}/create`,
        method: "POST",
        data,
        contentType: "multipart/form-data" ,
      }),
      invalidatesTags: ["publication"],
    }),
    publication: build.query({
      query: (id) => {
        return {
          url: `${NICHE_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["niche"],
    }),
    updatePublication: build.mutation({
      query: (data) => ({
        url: `${NICHE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data" ,
      }),
      invalidatesTags: ["publication"],
    }),
    deletePublication: build.mutation({
      query: (id) => {
        return {
          url: `${NICHE_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["publication"],
    }),
  }),
});

export const { usePublicationsQuery,
  useAddPublicationMutation,
  usePublicationQuery,
  useUpdatePublicationMutation,
  useDeletePublicationMutation } = publicationApi;
