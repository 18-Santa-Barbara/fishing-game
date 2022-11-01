/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from '../utils/constants';

export const initialState: User = {
  id: null,
  login: '',
  firstName: '',
  secondName: '',
  displayName: '',
  avatar: '',
  phone: '',
  email: '',
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/auth`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['USER'],
  endpoints: builder => ({
    getUser: builder.query({
      query: () => '/user',
      providesTags: ['USER'],
    }),
    logIn: builder.mutation({
      query: payload => ({
        url: '/signin',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_, res) => {
        if (res?.data === 'OK') {
          return ['USER'];
        }
        return [];
      },
    }),
    signUp: builder.mutation({
      query: payload => ({
        url: '/signup',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_, res) => {
        if (res?.data === 'OK') {
          return ['USER'];
        }
        return [];
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
      invalidatesTags: (_, res) => {
        if (res?.data === 'OK') {
          return ['USER'];
        }
        return [];
      },
    }),
  }),
});

export const { endpoints, useGetUserQuery, useLogInMutation, useLogoutMutation } = userApi;
