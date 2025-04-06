// redux/websocketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Prices {
  [key: string]: number;
}

interface WebSocketState {
  prices: Prices;
  previousPrices: Prices;
  alerts: string[];
}

const initialState: WebSocketState = {
  prices: {},
  previousPrices: {},
  alerts: [],
};

const PRICE_ALERT_THRESHOLD = 2; // 2% threshold

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<{ asset: string; price: string }>) => {
      const { asset, price } = action.payload;
      const priceNumber = parseFloat(price);

      const prevPrice = state.prices[asset] ?? priceNumber;
      state.previousPrices[asset] = prevPrice;
      state.prices[asset] = priceNumber;

      const percentChange = ((priceNumber - prevPrice) / prevPrice) * 100;

      if (Math.abs(percentChange) >= PRICE_ALERT_THRESHOLD) {
        const direction = percentChange > 0 ? 'increased' : 'decreased';
        state.alerts.push(`${asset.toUpperCase()} has ${direction} by ${percentChange.toFixed(2)}%`);
      }
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },
  },
});

export const { updatePrice, clearAlerts } = websocketSlice.actions;
export default websocketSlice.reducer;
