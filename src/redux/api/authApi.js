import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://contact-app.mmsdev.site/api/v1`,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    loginAccount: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    registerAccount: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutAccount: builder.mutation({
      query: (token) => ({
        url: "/user-logout",
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: ({ values, token }) => ({
        url: "/change-password",
        method: "POST",
        body: values,
        headers: { authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useLoginAccountMutation,
  useRegisterAccountMutation,
  useLogoutAccountMutation,
  useChangePasswordMutation,
} = authApi;
