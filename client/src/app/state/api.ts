import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// Define a service using a base URL and expected endpoints
export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: [],
  endpoints: (builder) => ({}),
})

export const {} = baseAPI;