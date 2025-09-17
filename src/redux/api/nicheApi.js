import { baseApi } from "./baseApi";

const NICHE_URL = "/niche";
export const nicheApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    niches: build.query({
      query: (arg) => ({
        url: `${NICHE_URL}/get-all`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          niches: response,
        };
      },
      providesTags: ["niche"],
    }),
    addNiche: build.mutation({
      query: (data) => ({
        url: `${NICHE_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["niche"],
    }),
    niche: build.query({
      query: (id) => {
        const nicheId = typeof id === "object" && id !== null ? id.id : id;
        return {
          url: `${NICHE_URL}/${nicheId}`,
          method: "GET",
        };
      },
      providesTags: ["niche"],
    }),
    updateNiche: build.mutation({
      query: (data) => ({
        url: `${NICHE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: ["niche"],
    }),
    deleteNiche: build.mutation({
      query: (id) => {
        const nicheId = typeof id === "object" && id !== null ? id.id : id;
        return {
          url: `${NICHE_URL}/${nicheId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["niche"],
    }),
  }),
});

export const { useNichesQuery,
  useAddNicheMutation,
  useNicheQuery,
  useUpdateNicheMutation,
  useDeleteNicheMutation, } = nicheApi;
