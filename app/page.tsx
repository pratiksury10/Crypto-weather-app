import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}










// 'use client'
// import React from 'react';
// // import { useDispatch } from 'react-redux';
// import WeatherSection from '../components/WeatherSection';
// // import { fetchWeather } from '@/redux/weatherSlice';

// const Dashboard = () => {
//   // const dispatch = useDispatch();

//   // useEffect(() => {
//   //   dispatch(fetchWeather());
//   // }, [dispatch]);

//   return (
//     <main className="p-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//       <WeatherSection/>
//     </main>
//   );
// };

// export default Dashboard;
