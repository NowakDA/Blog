import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ArticleResponse } from '../components/Article/ArticleTypes';
import { UserResponse } from '../components/UserProfile/UserTypes';
const token = localStorage.getItem('token');
const headers = token ? { Authorization: `Bearer ${token}` } : {};
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api' }),
  tagTypes: ['Articles', 'Article', 'User'],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleResponse, { offset: number; limit: number }>({
      query: ({ offset = 0, limit = 5 }) => ({
        url: `/articles?limit=${limit}&offset=${offset}`,
        headers,
      }),
      providesTags: ['Articles'],
    }),
    getArticle: builder.query({
      query: (slug) => ({
        url: `articles/${slug}`,
        headers,
      }),
      providesTags: (slug) => [{ type: 'Article', id: slug }],
    }),
    favoritAnArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (slug) => ['Articles', { type: 'Article', id: slug }],
    }),
    unFavoritAnArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (slug) => ['Articles', { type: 'Article', id: slug }],
    }),

    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: 'users/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { user: { email, password } },
      }),
    }),
    signUp: builder.mutation({
      query: ({ username, email, password }) => ({
        url: 'users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { user: { username, email, password } },
      }),
    }),
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        url: 'user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ email, username, bio, image, password }) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { user: { email, username, bio, image, password } },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useFavoritAnArticleMutation,
  useUnFavoritAnArticleMutation,
  useSignInMutation,
  useSignUpMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = api;
