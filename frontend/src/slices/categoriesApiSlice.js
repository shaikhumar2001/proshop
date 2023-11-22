import { CATEGORIES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: CATEGORIES_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      providesTags: ["Category", "Categories"],
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      query: () => ({
        url: CATEGORIES_URL,
        method: "POST",
      }),
      invalidatesTags: ["Category", "Categories"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/${data.categoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category", "Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
