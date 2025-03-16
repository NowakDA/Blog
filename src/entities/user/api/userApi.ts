import { api } from '@shared/config/api';

import { UserResponse } from '../model/UserTypes';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ email, username, bio, image, password }) => ({
        url: 'user',
        method: 'PUT',
        body: { user: { email, username, bio, image, password } },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateUserMutation } = userApi;
