import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  tagTypes: ["Contact"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://contact-app.mmsdev.site/api/v1`,
  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ token, page }) => ({
        url: `/contact?page=${page}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["Contact"],
    }),
    getSingleContact: builder.query({
      query: ({ token, id }) => ({
        url: `/contact/${id}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ token, id }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Contact"],
    }),
    createContact: builder.mutation({
      query: ({ data, token }) => ({
        url: "/contact",
        method: "POST",
        body: data,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetSingleContactQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
} = contactApi;
