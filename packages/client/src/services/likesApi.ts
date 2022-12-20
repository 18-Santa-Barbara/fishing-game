/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LikePost } from '../types/forum';
import { PORT } from '../utils/constants';

export const initialState: LikePost = {
  commentId: 0,
  author: '',
};

export const likesApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PORT}/`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['LIKE'],
  endpoints: builder => ({
    getLikesById: builder.query<any, { id: string | number }>({
      query: arg => {
        const { id } = arg;
        return {
          url: 'likes',
          params: { id },
        };
      },
      providesTags: ['LIKE'],
    }),
    setLikes: builder.mutation({
      query: payload => ({
        url: `likes`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['LIKE'],
    }),
    deleteLikes: builder.mutation({
      query: payload => ({
        url: `likes`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['LIKE'],
    }),
  }),
});

export const { useGetLikesByIdQuery, useSetLikesMutation, useDeleteLikesMutation } = likesApi;
