import { RootState } from '@app/store';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const savedPage = sessionStorage.getItem('currentPage');
const initialPage = savedPage ? Number(savedPage) : 1;

interface PaginationState {
  currentPage: number;
  limit: number;
}

const initialState: PaginationState = {
  currentPage: initialPage,
  limit: 5,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      sessionStorage.setItem('currentPage', action.payload.toString());
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const selectCurrentPage = (state: RootState) => state.pagination.currentPage;
export const selectLimit = (state: RootState) => state.pagination.limit;
export const { setCurrentPage, setLimit } = paginationSlice.actions;
export default paginationSlice.reducer;
