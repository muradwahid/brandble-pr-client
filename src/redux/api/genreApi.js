import { baseApi } from "./baseApi";

const GENRE_URL = "/genre";
export const genreApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        genres: build.query({
            query: (arg) => ({
                url: `${GENRE_URL}/get-all`,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    genres: response,
                };
            },
            providesTags: ["genre"],
        }),
        addGenre: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["genre"],
        }),
        genre: build.query({
            query: (id) => {
                const genreId = typeof id === "object" && id !== null ? id.id : id;
                return {
                    url: `${GENRE_URL}/${genreId}`,
                    method: "GET",
                };
            },
            providesTags: ["genre"],
        }),
        updateGenre: build.mutation({
            query: (data) => ({
                url: `${GENRE_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: ["genre"],
        }),
        deleteGenre: build.mutation({
            query: (id) => {
                const genreId = typeof id === "object" && id !== null ? id.id : id;
                return {
                    url: `${GENRE_URL}/${genreId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["genre"],
        }),
    }),
});

export const { useGenresQuery,
    useAddGenreMutation,
    useGenreQuery,
    useUpdateGenreMutation,
    useDeleteGenreMutation, } = genreApi;
