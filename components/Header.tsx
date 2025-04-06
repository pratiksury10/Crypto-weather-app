import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-yellow-600 ml-[500px]">🌐 CryptoWeather Nexus</h1>
      <nav className="space-x-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
