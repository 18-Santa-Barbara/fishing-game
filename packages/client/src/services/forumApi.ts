/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostType } from '../pages/Forum';
import { ForumPost } from '../types/forum';
import { API, PORT } from '../utils/constants';

export const initialState: ForumPost = {
  title: '',
  author: '',
  updateTime: 0,
  body: ''
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
  tagTypes: ['FORUM'],
  endpoints: builder => ({
    getForum: builder.query<any, void>({
      query: () => 'forums',
      providesTags: ['FORUM'],
    }),
    getFeaturedForum: builder.query({
      query: (id: number) => `forums/${id}`
    }),
    setForum: builder.mutation({
      query: payload => ({
        url: 'forums',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['FORUM'],
    }),
  }),
});

export const { useGetForumQuery, useGetFeaturedForumQuery ,useSetForumMutation } =
  forumApi;
