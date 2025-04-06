import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  type: 'price_alert' | 'weather_alert';
  message: string;
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [] as Notification[],
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);
    },
    clearNotifications: () => [],
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
