import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';

export const getAuthHeaders = () => {
  const token = Cookies.get('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://blog-platform.kata.academy/api',
  prepareHeaders: (headers) => {
    const token = Cookies.get('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Articles', 'Article', 'User'],
  endpoints: () => ({}),
});
