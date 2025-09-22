import { baseApi } from "./baseApi";

const GENRE_URL = "/dofollow";
export const dofollowApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        dofollows: build.query({
            query: (arg) => ({
                url: `${GENRE_URL}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    dofollows: response,
                };
            },
            providesTags: ["dofollow"],
        }),
        addDofollow: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["dofollow"],
        }),
        dofollow: build.query({
            query: (id) => {
                const indexId = typeof id === "object" && id !== null ? id.id : id;
                return {
                    url: `${GENRE_URL}/${indexId}`,
                    method: "GET",
                };
            },
            providesTags: ["dofollow"],
        }),
        updateDofollow: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["dofollow"],
        }),
        deleteDofollow: build.mutation({
            query: (id) => {
                const indexId = typeof id === "object" && id !== null ? id.id : id;
                return {
                    url: `${GENRE_URL}/${indexId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["dofollow"],
        }),
    }),
});

export const { useDofollowsQuery,
    useAddDofollowMutation,
    useDofollowQuery,
    useUpdateDofollowMutation,
    useDeleteDofollowMutation, } = dofollowApi;
