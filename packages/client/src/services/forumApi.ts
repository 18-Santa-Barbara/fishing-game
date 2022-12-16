/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostType } from '../pages/Forum';
import { ForumPost } from '../types/forum';
import { Player } from '../types/leader';
import { API, PORT } from '../utils/constants';

export const initialState: ForumPost = {
  title: '',
  author: '',
  updateTime: 0,
  body: '',
  comments: '',
};

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${PORT}/`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  }),
  tagTypes: ['POST', 'PUT', 'FORUM'],
  endpoints: builder => ({
    getForum: builder.query<any, void>({
      query: () => 'forums',
      providesTags: ['FORUM'],
    }),
    setForum: builder.mutation({
      query: payload => ({
        url: 'forums',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['FORUM'],
    }),
    updateForum: builder.mutation({
      query: payload => ({
        url: `forums/${payload.id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['PUT'],
    }),
  }),
});

export const { useGetForumQuery, useSetForumMutation, useUpdateForumMutation } =
  forumApi;
