/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/comments`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['COMMENT'],
  endpoints: builder => ({
    getCommentsById: builder.query<any, { id: string | number }>({
      query: id => `/${id}`,
      providesTags: ['COMMENT'],
    }),
    setComments: builder.mutation({
      query: payload => ({
        url: ``,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['COMMENT'],
    }),
    setReplyComments: builder.mutation({
      query: payload => ({
        url: ``,
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
