import { api } from '@shared/config/api';

import { ArticleResponse } from '../model/ArticleTypes';

export const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticleResponse, { offset: number; limit: number }>({
      query: ({ offset = 0, limit = 5 }) => `/articles?limit=${limit}&offset=${offset}`,
      providesTags: ['Articles'],
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
      providesTags: (slug) => [{ type: 'Article', id: slug }],
    }),
    createAnArticle: builder.mutation({
      query: ({ title, description, body, tagList }) => ({
        url: 'articles',
        method: 'POST',
        body: { article: { title, description, body, tagList } },
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteAnArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
    updateAnArticle: builder.mutation({
      query: ({ title, description, body, tagList, slug }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: { article: { title, description, body, tagList } },
      }),
      invalidatesTags: ({ slug }) => [{ type: 'Article', id: slug }, 'Articles'],
    }),
    favoritAnArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: (slug) => ['Articles', { type: 'Article', id: slug }],
    }),
    unFavoritAnArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: (slug) => ['Articles', { type: 'Article', id: slug }],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateAnArticleMutation,
  useUpdateAnArticleMutation,
  useDeleteAnArticleMutation,
  useFavoritAnArticleMutation,
  useUnFavoritAnArticleMutation,
} = articlesApi;
