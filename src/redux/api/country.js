import { baseApi } from "./baseApi";

const COUNTRY_URL = "/country";
export const countryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        countries: build.query({
            query: (arg) => ({
                url: `${COUNTRY_URL}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    countries: response,
                };
            },
            providesTags: ["country"],
        }),
        addCountry: build.mutation({
            query: (data) => ({
                url: `${COUNTRY_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["country"],
        }),
        country: build.query({
            query: (id) => {
                return {
                    url: `${COUNTRY_URL}/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["country"],
        }),
        updateCountry: build.mutation({
            query: (data) => ({
                url: `${COUNTRY_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["country","common"],
        }),
        deleteCountry: build.mutation({
            query: (id) => {
                return {
                    url: `${COUNTRY_URL}/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["country","common"],
        }),
    }),
});

export const { useCountriesQuery,
    useAddCountryMutation,
    useCountryQuery,
    useUpdateCountryMutation,
    useDeleteCountryMutation, } = countryApi;
