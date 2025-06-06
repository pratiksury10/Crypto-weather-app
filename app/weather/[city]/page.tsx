'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherEntry {
  dt: number;
  temp: number;
  humidity: number;
}

interface WeatherData {
  history: WeatherEntry[];
}

const WeatherCityPage = () => {
  const { city } = useParams<{ city: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCityWeather = useCallback(async () => {
    try {
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeatherData(response.data);
    } catch {
      console.error('Error fetching city weather');
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchCityWeather();
  }, [fetchCityWeather]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!weatherData?.history) {
    return <div className="text-center mt-10 text-red-500">No weather data available for this city.</div>;
  }

  const tempHistory = weatherData.history.map(entry => entry.temp);
  const timeLabels = weatherData.history.map(entry =>
    new Date(entry.dt * 1000).toLocaleTimeString()
  );

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: tempHistory,
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">{city} - Weather Detail</h1>

      <div className="max-w-2xl">
        <Line data={chartData} />
      </div>

      <div className="overflow-auto">
        <table className="table-auto w-full mt-6 border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Temperature (°C)</th>
              <th className="px-4 py-2">Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.history.map((entry, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{new Date(entry.dt * 1000).toLocaleTimeString()}</td>
                <td className="px-4 py-2">{entry.temp}</td>
                <td className="px-4 py-2">{entry.humidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherCityPage;
