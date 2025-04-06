'use client';

import { useEffect, useState } from 'react';
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
import { Loader2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CoinMarketData {
  current_price: { usd: number };
  market_cap: { usd: number };
}

interface CoinData {
  name: string;
  symbol: string;
  market_data: CoinMarketData;
  last_updated: string;
}

const CryptoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [history, setHistory] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const [coinRes, marketChartRes] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: {
              vs_currency: 'usd',
              days: 7,
              interval: 'daily',
            },
          }),
        ]);

        setCoinData(coinRes.data);
        setHistory(marketChartRes.data.prices);
      } catch {
        console.error('Error fetching coin data');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCryptoData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading crypto data...</span>
      </div>
    );
  }

  const labels = history.map(([timestamp]) => new Date(timestamp).toLocaleDateString());
  const prices = history.map(([, price]) => price);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Price (USD)',
        data: prices,
        fill: false,
        borderColor: '#16a34a',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">{coinData?.name} - 7 Day History</h2>

      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Symbol:</strong> {coinData?.symbol.toUpperCase()}</p>
        <p><strong>Current Price:</strong> ${coinData?.market_data.current_price.usd.toLocaleString()}</p>
        <p><strong>Market Cap:</strong> ${coinData?.market_data.market_cap.usd.toLocaleString()}</p>
        <p><strong>Last Updated:</strong> {new Date(coinData?.last_updated).toLocaleString()}</p>
      </div>

      <div className="max-w-3xl">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CryptoDetailPage;
