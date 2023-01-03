import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/theme`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['THEME'],
  endpoints: builder => ({
    getTheme: builder.query<any, void>({
      query: userId => `/${userId}`,
      providesTags: ['THEME'],
    }),
    changeTheme: builder.mutation({
      query: payload => ({
        url: '',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['THEME'],
    }),
  }),
});

export const { endpoints, useGetThemeQuery, useChangeThemeMutation } = themeApi;
