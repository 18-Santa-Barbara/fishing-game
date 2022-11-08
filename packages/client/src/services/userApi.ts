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
    baseUrl: `${API}/`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['USER'],
  endpoints: builder => ({
    getUser: builder.query<any, void>({
      query: () => 'auth/user',
      providesTags: ['USER'],
    }),
    logIn: builder.mutation({
      query: payload => ({
        url: 'auth/signin',
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
        url: 'auth/signup',
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
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: (_, res) => {
        if (res?.data === 'OK') {
          return ['USER'];
        }
        return [];
      },
    }),
    changeProfile: builder.mutation({
      query: payload => ({
        url: 'user/profile',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['USER'],
    }),
    changePass: builder.mutation({
      query: payload => ({
        url: 'user/password',
        method: 'PUT',
        body: payload,
      }),
    }),
    changeAvatar: builder.mutation({
      query: payload => ({
        url: 'user/profile/avatar',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['USER'],
    }),
  }),
});

export const {
  endpoints,
  useGetUserQuery,
  useLogInMutation,
  useLogoutMutation,
  useChangeProfileMutation,
  useChangePassMutation,
  useChangeAvatarMutation,
} = userApi;
