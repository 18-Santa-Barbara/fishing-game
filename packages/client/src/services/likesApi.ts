/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LikesProps } from '../pages/components/forum/Likes';
import { LikePost } from '../types/forum';
import { PORT } from '../utils/constants';

export const initialState: LikePost = {
  commentId: 0,
  author: '',
};

export const likesApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/likes`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['LIKE'],
  endpoints: builder => ({
    getLikesById: builder.query<any, LikesProps>({
      query: id => `/${id}`,
      providesTags: ['LIKE'],
    }),
    setLikes: builder.mutation({
      query: payload => ({
        url: ``,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['LIKE'],
    }),
    deleteLikes: builder.mutation({
      query: payload => ({
        url: ``,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['LIKE'],
    }),
  }),
});

export const { useGetLikesByIdQuery, useSetLikesMutation, useDeleteLikesMutation } = likesApi;
