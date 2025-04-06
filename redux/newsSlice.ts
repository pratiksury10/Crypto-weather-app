import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from '../utils/api';

export const getNews = createAsyncThunk('news/getNews', async () => {
  const data = await fetchNews();
  return data.slice(0, 5); // Top 5
});

const newsSlice = createSlice({
  name: 'news',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getNews.pending, state => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
