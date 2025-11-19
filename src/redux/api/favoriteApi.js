import { baseApi } from "./baseApi";

const FAVORITE_URL = "/favorite";
export const favoriteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    favorites: build.query({
      query: (id) => {
        return {
          url: `${FAVORITE_URL}/all-favorite/${id}`,
          method: "GET",
        };
      },
      providesTags: ["favorite"],
    }),
    favoriteIds: build.query({
      query: (id) => {
        return {
          url: `${FAVORITE_URL}/all-favoriteIds/${id}`,
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
        invalidatesTags: ["favorite"],
    }),

        deleteFavorite: build.mutation({
            query: (id) => {
                return {
                  url: `${FAVORITE_URL}/remove/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["favorite"],
        }),
    }),
});

export const {
  useFavoritesQuery,
  useFavoriteIdsQuery,
    useAddFavoriteMutation,
    useDeleteFavoriteMutation, } = favoriteApi;
