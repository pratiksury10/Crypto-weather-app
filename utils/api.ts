// utils/api.ts
import axios from 'axios';

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const fetchWeather = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch weather for ${city}:`, error);
    return null; // prevent crash
  }
};


export const fetchCrypto = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets',
    {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,solana',
      },
    }
  );
  return response.data;
};

export const fetchNews = async () => {
  console.log('🔍 Fetching news with API key:', NEWS_API_KEY);
  const response = await axios.get(
    `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=cryptocurrency&language=en`
  );
  console.log('📰 News fetched:', response.data.results);
  return response.data.results;
};