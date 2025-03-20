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
        invalidatesTags: ['Articles'],
      }),
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
    toggleFavorite: builder.mutation({
      query: ({ slug, favorited }) => ({
        url: `articles/${slug}/favorite`,
        method: favorited ? 'DELETE' : 'POST',
      }),
      invalidatesTags: ({ slug }) => [{ type: 'Article', id: slug }, 'Articles'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateAnArticleMutation,
  useUpdateAnArticleMutation,
  useDeleteAnArticleMutation,
  useToggleFavoriteMutation,
} = articlesApi;
