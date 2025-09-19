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
          niches: response,
        };
      },
      providesTags: ["publication"],
    }),
    addPublication: build.mutation({
      query: (data) => ({
        url: `${NICHE_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["publication"],
    }),
    publication: build.query({
      query: (id) => {
        const nicheId = typeof id === "object" && id !== null ? id.id : id;
        return {
          url: `${NICHE_URL}/${nicheId}`,
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
      }),
      invalidatesTags: ["publication"],
    }),
    deletePublication: build.mutation({
      query: (id) => {
        const nicheId = typeof id === "object" && id !== null ? id.id : id;
        return {
          url: `${NICHE_URL}/${nicheId}`,
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
