import userReducer from '@entities/user/model/userSlice';

import { configureStore } from '@reduxjs/toolkit';

import { api } from '@shared/config/api';

import paginationReducer from '../widgets/Pagination/model/paginationSlice';

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
