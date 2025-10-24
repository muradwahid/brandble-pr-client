import { baseApi } from "./baseApi";

const PAYMENT_URL = "/payment";
export const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        methods: build.query({
            query: (arg) => ({
                url: `${PAYMENT_URL}/methods`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return response
            },
            providesTags: ["payment", "setup-intent", "save-method","set-default"],
        }),
        setupIntent: build.mutation({
            query: () => ({
                url: `${PAYMENT_URL}/setup-intent`,
                method: "POST"
            }),
            invalidatesTags: ["payment"],
        }),
        saveMethod: build.mutation({
            query: (data) => ({
                url: `${PAYMENT_URL}/save-method`,
                method: "POST",
                data
            }),
            invalidatesTags: ["payment"],
        }),
        processPayment: build.mutation({
            query: (data) => ({
                url: `${PAYMENT_URL}/process-payment`,
                method: "POST",
                data
            }),
            invalidatesTags: ["payment"],
        }),
        deleteMethod: build.mutation({
            query: (id) => {
                return {
                    url: `${PAYMENT_URL}/delete-method/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["payment"],
        }),
        setDefault: build.mutation({
            query: (data) => ({
                url: `${PAYMENT_URL}/set-default`,
                method: "POST",
                data
            }),
            invalidatesTags: ["payment"],
        })
    }),
});

export const { useMethodsQuery, useSaveMethodMutation, useProcessPaymentMutation, useDeleteMethodMutation, useSetDefaultMutation, useSetupIntentMutation} = paymentApi;
