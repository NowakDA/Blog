import { createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';

import { UserState } from '../components/UserProfile/UserTypes';

import { api } from './apiSlice';

const initialState: UserState = {
  user: {
    email: '',
    username: Cookies.get('username') || '',
    bio: '',
    image: Cookies.get('image') || '',
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
      Cookies.set('username', username, { expires: 1 });
      Cookies.set('image', image, { expires: 1 });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('token');
      Cookies.remove('username');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.updateUser.matchFulfilled, (state, action) => {
      state.user = { ...state.user, ...action.payload };
    });
  },
});

export const { setUser, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
