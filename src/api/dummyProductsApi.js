import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dummyProductsApi = createApi({
  reducerPath: "dummyProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    // 1. Get Categories
    getCategories: builder.query({
      query: () => "products/category-list",
    }),

    // 2. Smart Product Fetching (Handles Search, Category, and Standard list)
    getAllProducts: builder.query({
      query: (params) => {
        // params: { skip, limit, search, category, sortBy, order }

        // Destructure params
        const {
          skip = 0,
          limit = 12,
          search,
          category,
          sortBy,
          order,
        } = params;

        // Base URL construction
        let url = "products";

        // Logic: Search takes priority, then Category, then standard List
        if (search) {
          url = `products/search?q=${search}`;
        } else if (category && category !== "all") {
          url = `products/category/${category}`;
        }

        // Return object with query params
        // Note: DummyJSON puts pagination/sorting in the query string
        return {
          url,
          params: {
            limit,
            skip,
            sortBy,
            order,
          },
        };
      },
    }),

    // 3. Get Single Product
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),

    getUserOrders: builder.query({
      query: (userId) => `carts/user/${userId}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetUserOrdersQuery,
} = dummyProductsApi;
