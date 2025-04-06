'use client';
import React from 'react';

interface Props {
  data: {
    id: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    image: string;
  };
  livePrices?: { [key: string]: number }; // live prices from WebSocket
}

const CryptoCard = ({ data, livePrices }: Props) => {
  const isPositive = data.price_change_percentage_24h >= 0;

  // 👇 Use live price if available, else fallback to API price
  const livePrice = livePrices?.[data.id];
  const displayPrice = livePrice || data.current_price;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex items-center space-x-4">
      <img src={data.image} alt={data.name} className="w-10 h-10" />
      <div>
        <h3 className="font-semibold">{data.name}</h3>
        <p className="text-sm">
          ${displayPrice.toFixed(2)}{' '}
          {livePrice && (
            <span className="text-xs text-gray-400 ml-1">(live)</span>
          )}
        </p>
        <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {data.price_change_percentage_24h.toFixed(2)}%
        </p>
        <p className="text-xs text-gray-500">Market Cap: ${data.market_cap.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CryptoCard;