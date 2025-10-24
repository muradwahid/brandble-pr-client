import { baseApi } from "./baseApi";

const GENRE_URL = "/indexed";
export const indexedApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        indexes: build.query({
            query: (arg) => ({
                url: `${GENRE_URL}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    indexes: response,
                };
            },
            providesTags: ["indexed"],
        }),
        addIndexed: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["indexed"],
        }),
        indexed: build.query({
            query: (id) => {
                const indexId = typeof id === "object" && id !== null ? id.id : id;
                return {
                    url: `${GENRE_URL}/${indexId}`,
                    method: "GET",
                };
            },
            providesTags: ["indexed"],
        }),
        updateIndexed: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["indexed"],
        }),
        deleteIndexed: build.mutation({
            query: (id) => {
                const indexId = typeof id === "object" && id !== null ? id.id : id;
                return {
                    url: `${GENRE_URL}/${indexId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["indexed"],
        }),
    }),
});

export const { useIndexesQuery,
    useAddIndexedMutation,
    useIndexedQuery,
    useUpdateIndexedMutation,
    useDeleteIndexedMutation, } = indexedApi;
