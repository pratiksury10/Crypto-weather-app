import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from '../utils/api';

// Cities you want to fetch weather for
const cities = ['New York', 'London', 'Tokyo'];

export const getWeather = createAsyncThunk('weather/getWeather', async () => {
  const data = await Promise.all(cities.map(fetchWeather));
  // ✅ Only return responses where cod === 200 (valid weather data)
  return data.filter(item => item && item.cod === 200);
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather';
      });
  },
});

export default weatherSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchWeather } from '../utils/api';

// const cities = ['New York', 'London', 'Tokyo'];

// export const getWeather = createAsyncThunk('weather/getWeather', async () => {
//   const data = await Promise.all(cities.map(city => fetchWeather(city)));
//   return data;
// });

// const weatherSlice = createSlice({
//   name: 'weather',
//   initialState: { data: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(getWeather.pending, state => {
//         state.loading = true;
//       })
//       .addCase(getWeather.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(getWeather.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch weather';
//       });
//   },
// });

// export default weatherSlice.reducer;
