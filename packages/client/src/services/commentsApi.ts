/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostType } from '../pages/Forum';
import { CommentPost, ForumPost } from '../types/forum';
import { Player } from '../types/leader';
import { API, PORT } from '../utils/constants';

export const initialState: CommentPost = {
  postId: 0,
  author: '',
  body: '',
  date: '',
};

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PORT}/`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['POST', 'PUT', 'COMMENT'],
  endpoints: builder => ({
    getCommentsById: builder.query<any, {id: string | number}>({
      query: (arg) => {
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
        body: payload
      }),
      invalidatesTags: ['COMMENT'],
    }),
  }),
});

export const { useGetCommentsByIdQuery, useSetCommentsMutation } =
  commentApi;
