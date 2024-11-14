/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDashboardMetrics, IProduct, INewProduct, IUser, IExpenseByCategory } from "@/app/interfaces/dashboard";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

// Define a service using a base URL and expected endpoints
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { accessToken } = session.tokens ?? {};
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (builder) => ({
    getAuthUser: builder.query({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser();
          const session = await fetchAuthSession();
          if (!session) throw new Error("No session found");
          const { userSub } = session;

          const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);
          const userDetails = userDetailsResponse.data as IUser;

          return { data: { user, userSub, userDetails } };
        } catch (error: any) {
          return { error: error.message || "Could not fetch user data" };
        }
      },
    }),
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
  useGetAuthUserQuery,
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = baseAPI;