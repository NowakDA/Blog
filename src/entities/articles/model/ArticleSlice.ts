import { articlesApi } from '@entities/articles/api/articlesApi';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentArticle: null,
};

const articleSlice = createSlice({
  name: 'currentArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(articlesApi.endpoints.getArticle.matchFulfilled, (state, action) => {
      state.currentArticle = action.payload.article;
    });
  },
});

export default articleSlice.reducer;
