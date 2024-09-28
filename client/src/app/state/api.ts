import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDashboardMetrics } from "@/app/interfaces/dashboard";

// Define a service using a base URL and expected endpoints
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["DashboardMetrics"],
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<IDashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ["DashboardMetrics"]
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = baseAPI;