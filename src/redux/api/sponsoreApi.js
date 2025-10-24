import { baseApi } from "./baseApi";

const GENRE_URL = "/sponsor";
export const sponsorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        sponsors: build.query({
            query: (arg) => ({
                url: `${GENRE_URL}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    sponsors: response,
                };
            },
            providesTags: ["sponsor"],
        }),
        addSponsor: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["sponsor"],
        }),
        sponsor: build.query({
            query: (id) => {
                const indexId = typeof id === "object" && id !== null ? id.id : id;
                return {
                    url: `${GENRE_URL}/${indexId}`,
                    method: "GET",
                };
            },
            providesTags: ["sponsor"],
        }),
        updateSponsor: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["sponsor"],
        }),
        deleteSponsor: build.mutation({
            query: (id) => {
                const indexId = typeof id === "object" && id !== null ? id.id : id;
                return {
                    url: `${GENRE_URL}/${indexId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["sponsor"],
        }),
    }),
});

export const { useSponsorsQuery,
    useAddSponsorMutation,
    useSponsorQuery,
    useUpdateSponsorMutation,
    useDeleteSponsorMutation, } = sponsorApi;
