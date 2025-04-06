import { store } from '../redux/store';
import { addNotification } from '../redux/notificationSlice';

let ws: WebSocket;

export const initWebSocket = () => {
  ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

  ws.onmessage = event => {
    const data = JSON.parse(event.data);

    const keys = Object.keys(data);
    keys.forEach(coin => {
      const price = parseFloat(data[coin]);

      // Dispatch notification
      store.dispatch(addNotification({
        type: 'price_alert',
        message: `Live Price Update: ${coin.toUpperCase()} is $${price.toFixed(2)}`
      }));
    });
  };

  ws.onerror = err => {
    console.error('WebSocket Error:', err);
  };
};

export const simulateWeatherAlert = () => {
  store.dispatch(addNotification({
    type: 'weather_alert',
    message: `⚠️ Sudden weather alert triggered! Take precautions.`,
  }));
};
