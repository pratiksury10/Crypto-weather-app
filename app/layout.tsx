'use client';
import './global.css';
import { Inter } from 'next/font/google';
import { Providers } from '../redux/Provider';
import Header from '../components/Header';
import NotificationToast from '../components/NotificationToast';
import { useEffect } from 'react';
import { initWebSocket, simulateWeatherAlert } from '../utils/websocket';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initWebSocket();

    const interval = setInterval(() => {
      simulateWeatherAlert();
    }, 120000); // every 2 mins

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className + ' bg-gray-100'}>
        <Providers>
          <Header />
          <main className="flex justify-center px-4 md:px-10 py-6">
              <div className="w-full max-w-6xl">{children}</div>
          </main>
          <NotificationToast />
        </Providers>
      </body>
    </html>
  );
}
