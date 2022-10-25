import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../utils/constants';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/auth/user`,
    credentials: 'include',
  }),
  endpoints: builder => ({
    getUser: builder.query({
      query: () => '',
    }),
    login: builder.mutation({
      query: payload => ({
        url: '',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginMutation } = userApi;
