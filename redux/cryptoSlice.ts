import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCrypto } from '../utils/api';

export const getCrypto = createAsyncThunk('crypto/getCrypto', async () => {
  const data = await fetchCrypto();
  return data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCrypto.pending, state => {
        state.loading = true;
      })
      .addCase(getCrypto.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crypto';
      });
  },
});

export default cryptoSlice.reducer;
