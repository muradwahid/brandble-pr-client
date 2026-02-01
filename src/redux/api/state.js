import { baseApi } from "./baseApi";

const GENRE_URL = "/states";
export const stateApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        states: build.query({
            query: (arg) => ({
                url: `${GENRE_URL}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    states: response,
                };
            },
            providesTags: ["state"],
        }),
        addState: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["state"],
        }),
        state: build.query({
            query: (id) => {
                return {
                    url: `${GENRE_URL}/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["state"],
        }),
        updateState: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["state"],
        }),
        deleteState: build.mutation({
            query: (id) => {
                return {
                    url: `${GENRE_URL}/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["state"],
        }),
    }),
});

export const { useStatesQuery,
    useAddStateMutation,
    useStateQuery,
    useUpdateStateMutation,
    useDeleteStateMutation, } = stateApi;
