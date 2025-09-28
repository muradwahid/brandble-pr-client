import { baseApi } from "./baseApi";

const WRITE_ARTICLE_API = "/write-article";
export const writeArticle = baseApi.injectEndpoints({
    endpoints: (build) => ({
        writeArticles: build.query({
            query: (arg) => ({
                url: `${WRITE_ARTICLE_API}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    writeArticles: response,
                };
            },
            providesTags: ["write-article", "create"],
        }),
        addWriteArticle: build.mutation({
            query: (data) => ({
                url: `${WRITE_ARTICLE_API}/create`,
                method: "POST",
                data,
                contentType: "multipart/form-data" 
            }),
            invalidatesTags: ["write-article"],
        }),
        WriteArticle: build.query({
            query: (id) => {
                return {
                    url: `${WRITE_ARTICLE_API}/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["write-article", "create"],
        }),
        updateWriteArticle: build.mutation({
            query: (data) => ({
                url: `${WRITE_ARTICLE_API}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["write-article"],
        }),
        deleteWriteArticle: build.mutation({
            query: (id) => {
                return {
                    url: `${WRITE_ARTICLE_API}/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["write-article"],
        }),
    }),
});

export const { useWriteArticlesQuery, useAddWriteArticleMutation, useWriteArticleQuery, useUpdateWriteArticleMutation, useDeleteWriteArticleMutation, } = writeArticle;
