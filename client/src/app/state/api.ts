import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDashboardMetrics, IProduct, INewProduct, IUser, IExpenseByCategory } from "@/app/interfaces/dashboard";

// Define a service using a base URL and expected endpoints
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<IDashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ["DashboardMetrics"]
    }),
    getProducts: builder.query<IProduct[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"]
    }),
    createProduct: builder.mutation<IProduct, INewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => '/users',
      providesTags: ["Users"]
    }),
    getExpensesByCategory: builder.query<IExpenseByCategory[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    })
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = baseAPI;