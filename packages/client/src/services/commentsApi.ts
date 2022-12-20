/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentPost } from '../types/forum';
import { PORT } from '../utils/constants';

export const initialState: CommentPost = {
  postId: 0,
  author: '',
  body: '',
  date: '',
  comment: {},
};

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `api/`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['COMMENT'],
  endpoints: builder => ({
    getCommentsById: builder.query<any, { id: string | number }>({
      query: arg => {
        const { id } = arg;
        return {
          url: 'comments',
          params: { id },
        };
      },
      providesTags: ['COMMENT'],
    }),
    setComments: builder.mutation({
      query: payload => ({
        url: `comments`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['COMMENT'],
    }),
    setReplyComments: builder.mutation({
      query: payload => ({
        url: `comments`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['COMMENT'],
    }),
  }),
});

export const {
  useGetCommentsByIdQuery,
  useSetCommentsMutation,
  useSetReplyCommentsMutation,
} = commentApi;
