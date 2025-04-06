'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getWeather } from '../../redux/weatherSlice';
import { getCrypto } from '../../redux/cryptoSlice';
import { getNews } from '../../redux/newsSlice';
import { useCryptoWebSocket } from '../../utils/useCryptoWebScoket';
import WeatherCard from '../../components/WeatherCard';
import CryptoCard from '../../components/CryptoCard';
import NewsCard from '../../components/NewsCard';
import { toast } from 'react-toastify';
import { clearAlerts } from '../../redux/websocketSlice';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  useCryptoWebSocket();

  const weather = useSelector((state: RootState) => state.weather);
  const crypto = useSelector((state: RootState) => state.crypto);
  const news = useSelector((state: RootState) => state.news);
  const livePrices = useSelector((state: RootState) => state.websocket.prices);
  const alerts = useSelector((state: RootState) => state.websocket.alerts);

  useEffect(() => {
    dispatch(getWeather());
    dispatch(getCrypto());
    dispatch(getNews());

    const interval = setInterval(() => {
      dispatch(getWeather());
      dispatch(getCrypto());
      dispatch(getNews());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (alerts.length > 0) {
      alerts.forEach((msg) => toast.info(msg));
      dispatch(clearAlerts());
    }
  }, [alerts, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* 🌤 Weather Section */}
      <section className="bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🌤 Weather Dashboard</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {weather.data.map((item, index) => (
            <WeatherCard
              key={`${item.name}-${index}`} // ✅ safe fallback combo
              data={item}
            />
          ))}
        </div>
      </section>

      {/* 💰 Crypto Section */}
      <section className="bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 Crypto Dashboard</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {crypto.data.map((item, index) => (
            <CryptoCard
              key={item.id || `crypto-${index}`} // ✅ crypto IDs are reliable
              data={item}
              livePrices={livePrices}
            />
          ))}
        </div>
      </section>

      {/* 📰 News Section */}
      <section className="bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📰 Latest News</h2>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {news.data.map((item, index) => (
            <NewsCard
              key={item.url || item.title || `news-${index}`} // ✅ safest unique fallback
              data={item}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
