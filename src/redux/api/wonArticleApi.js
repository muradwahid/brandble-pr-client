import { baseApi } from "./baseApi";

const WON_ARTICLE_API = "/won-article";
export const wonArticleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        wonArticles: build.query({
            query: (arg) => ({
                url: `${WON_ARTICLE_API}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    wonArticles: response,
                };
            },
            providesTags: ["won-article", "create"],
        }),
        addWonArticle: build.mutation({
            query: (data) => ({
                url: `${WON_ARTICLE_API}/create`,
                method: "POST",
                data,
                contentType: "multipart/form-data" 
            }),
            invalidatesTags: ["won-article"],
        }),
        wonArticle: build.query({
            query: (id) => {
                return {
                    url: `${WON_ARTICLE_API}/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["won-article", "create"],
        }),
        updateWonArticle: build.mutation({
            query: (data) => ({
                url: `${WON_ARTICLE_API}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["won-article"],
        }),
        deleteWonArticle: build.mutation({
            query: (id) => {
                return {
                    url: `${WON_ARTICLE_API}/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["won-article"],
        }),
    }),
});

export const { useWonArticlesQuery, useAddWonArticleMutation, useWonArticleQuery, useUpdateWonArticleMutation, useDeleteWonArticleMutation, } = wonArticleApi;
