/* eslint-disable no-empty-pattern */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Player } from '../types/leader';
import { API } from '../utils/constants';

export const initialState: Player = {
    name: '',
    score: 0,
    date: '',
    data: null
};

export const leaderApi = createApi(
  {
    reducerPath: 'leaderApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${API}/`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }),
    tagTypes: ['Post'],
    endpoints: builder => ({
      getLeader: builder.query({
        query: payload => ({
          url: 'leaderboard/Santa-Barbara',
          method: 'POST',
          body: payload,
        }),
      }),
      setLeader: builder.mutation({
        query: payload => ({
          url: 'leaderboard',
          method: 'POST',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }),
        invalidatesTags: ['Post'],
      }),
    }),
  },
  // reactHooksModule({ unstable__sideEffectsInRender: true }) TODO: добавить через buildCreateApi
);

export const {
    useGetLeaderQuery,
    useSetLeaderMutation
} = leaderApi;