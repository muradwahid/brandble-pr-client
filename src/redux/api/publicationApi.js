import { baseApi } from "./baseApi";

const PUBLICATION_URL = "/publication";
export const publicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    publications: build.query({
      query: (arg) => ({
        url: `${PUBLICATION_URL}/all-publications`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return response
      },
      providesTags: ["publication",'create'],
    }),
    adminSearchPublications: build.query({
      query: (arg) => ({
        url: `${PUBLICATION_URL}/admin/searchpublications`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return response
      },
      providesTags: ["publication",'create'],
    }),
    addPublication: build.mutation({
      query: (data) => ({
        url: `${PUBLICATION_URL}/create`,
        method: "POST",
        data,
        contentType: "multipart/form-data" ,
      }),
      invalidatesTags: ["publication","all-publication"],
    }),
    publication: build.query({
      query: (id) => {
        return {
          url: `${PUBLICATION_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["niche"],
    }),
    publicationStatistic: build.query({
      query: () => {
        return {
          url: `${PUBLICATION_URL}/statistics`,
          method: "GET",
        };
      },
      providesTags: ["niche"],
    }),
    updatePublication: build.mutation({
      query: (data) => ({
        url: `${PUBLICATION_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data" ,
      }),
      invalidatesTags: ["publication"],
    }),
    deletePublication: build.mutation({
      query: (id) => {
        return {
          url: `${PUBLICATION_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["publication"],
    }),
  }),
});

export const { usePublicationsQuery,
  useAdminSearchPublicationsQuery,
  useAddPublicationMutation,
  usePublicationQuery,
  usePublicationStatisticQuery,
  useUpdatePublicationMutation,
  useDeletePublicationMutation } = publicationApi;
