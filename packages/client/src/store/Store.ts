import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';
import UserReducer from '../reducers/user';
import { leaderApi } from '../services/leaderApi';
import { forumApi } from '../services/forumApi';

export function createStore() {
  const preloadedState =
    typeof window !== 'undefined' && window['__INITIAL_STATE__']
      ? window['__INITIAL_STATE__']
      : undefined;
  return configureStore({
    reducer: {
      user: UserReducer,
      [userApi.reducerPath]: userApi.reducer,
      [leaderApi.reducerPath]: leaderApi.reducer,
      [forumApi.reducerPath]: forumApi.reducer,
    },
    middleware: getDefaultMiddleware => 
      getDefaultMiddleware().concat(userApi.middleware, forumApi.middleware),
    preloadedState,
  });
}

type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
