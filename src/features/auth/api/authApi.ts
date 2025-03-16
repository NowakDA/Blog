import { api } from '@shared/config/api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({ email, password }) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: { email, password } },
      }),
    }),
    signUp: builder.mutation({
      query: ({ username, email, password }) => ({
        url: 'users',
        method: 'POST',
        body: { user: { username, email, password } },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
