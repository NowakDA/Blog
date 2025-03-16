import { userApi } from '@entities/user/api/userApi';
import userReducer from '@entities/user/model/userSlice';
import { articlesApi } from '@entities/articles/api/articlesApi';
import articleReducer from '@entities/articles/model/ArticleSlice';

import { authApi } from '@features/auth/api/authApi';

import { configureStore } from '@reduxjs/toolkit';

import { api } from '@shared/config/api';

import paginationReducer from '../widgets/Pagination/model/paginationSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentArticle: articleReducer,
    user: userReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      articlesApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
