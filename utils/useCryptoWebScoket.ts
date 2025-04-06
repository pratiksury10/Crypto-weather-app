// utils/useCryptoWebSocket.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePrice } from '@/redux/websocketSlice';

export const useCryptoWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana');

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      for (const asset in data) {
        dispatch(updatePrice({ asset, price: data[asset] }));
      }
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);
};