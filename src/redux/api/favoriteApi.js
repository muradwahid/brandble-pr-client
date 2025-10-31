import { baseApi } from "./baseApi";

const FAVORITE_URL = "/favorite";
export const favoriteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    favorites: build.query({
      query: (id) => {
        return {
          url: `${FAVORITE_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["favorite"],
    }),
        addFavorite: build.mutation({
            query: (data) => ({
            url: `${FAVORITE_URL}/create`,
                method: "POST",
                data,
            }),
            invalidatesTags: ["dofollow"],
        }),

        deleteFavorite: build.mutation({
            query: (id) => {
                const indexId = typeof id === "object" && id !== null ? id.id : id;
                return {
                  url: `${FAVORITE_URL}/${indexId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["dofollow"],
        }),
    }),
});

export const { useFavoritesQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation, } = favoriteApi;
