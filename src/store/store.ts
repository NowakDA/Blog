import { configureStore } from '@reduxjs/toolkit';

import { api } from './apiSlice';
import userReducer from './userSlice';
import paginationReducer from './paginationSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
