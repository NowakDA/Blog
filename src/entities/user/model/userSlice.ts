import { createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';

import { userApi } from '../api/userApi';

import { UserState } from './UserTypes';

const initialState: UserState = {
  user: {
    email: '',
    username: '',
    bio: '',
    image: '',
  },
  token: Cookies.get('token') || null,
  isAuthenticated: !!Cookies.get('token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, username, bio, image, token } = action.payload;

      state.user = { email, username, bio, image };
      state.token = token;
      state.isAuthenticated = true;

      Cookies.set('token', token, { expires: 1, secure: true });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('token');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
    });
    builder.addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
  },
});

export const { setUser, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
