import { baseApi } from "./baseApi";

const COMMON_URL = "/common";
export const commonApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        common: build.query({
            query: (arg) => ({
                url: `${COMMON_URL}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
              return response;
            },
            providesTags: ["common"],
        })
    }),
});

export const { useCommonQuery } = commonApi;
