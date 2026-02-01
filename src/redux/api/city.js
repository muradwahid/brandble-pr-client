import { baseApi } from "./baseApi";

const GENRE_URL = "/cities";
export const cityApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        cities: build.query({
            query: (arg) => ({
                url: `${GENRE_URL}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    cities: response,
                };
            },
            providesTags: ["city"],
        }),
        addCity: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["city"],
        }),
        city: build.query({
            query: (id) => {
                return {
                    url: `${GENRE_URL}/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["city"],
        }),
        updateCity: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["city"],
        }),
        deleteCity: build.mutation({
            query: (id) => {
                return {
                    url: `${GENRE_URL}/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["city"],
        }),
    }),
});

export const { useCitiesQuery,
    useAddCityMutation,
    useCityQuery,
    useUpdateCityMutation,
    useDeleteCityMutation, } = cityApi;
