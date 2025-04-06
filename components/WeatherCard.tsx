import React from 'react';

interface Props {
  data: {
    name: string;
    weather?: { main: string; description: string }[];
    main?: { temp: number; humidity: number };
  };
}

const WeatherCard = ({ data }: Props) => {
  // 🛡️ Guard clause: if essential data is missing, don't render the card
  if (
    !data ||
    !data.name ||
    !data.weather ||
    !Array.isArray(data.weather) ||
    !data.weather[0] ||
    !data.main
  ) {
    return null;
  }

  return (
    <div className="w-72 bg-gradient-to-r from-yellow-100 to-blue-100 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:scale-105 hover:shadow-2xl hover:shadow-yellow-300/40 duration-300 mr-[10px]">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 mr-[250px]">
        {data.name}
      </h3>

      <p className="text-base text-gray-600 italic mb-3 mr-[250px]">
        {data.weather[0].main} - {data.weather[0].description}
      </p>

      <p className="text-4xl font-extrabold text-blue-700 mb-2 mr-[250px]">
        🌡️ {data.main.temp}°C
      </p>

      <p className="text-lg text-purple-700 font-medium mr-[250px]">
        💧 Humidity: {data.main.humidity}%
      </p>
    </div>
  );
};

export default WeatherCard;


// import React from 'react';

// interface Props {
//   data: {
//     name: string;
//     weather: { main: string; description: string }[];
//     main: { temp: number; humidity: number };
//   };
// }

// const WeatherCard = ({ data }: Props) => {
//   return (
//     <div className="w-72 bg-gradient-to-r from-yellow-100 to-blue-100 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:scale-105 hover:shadow-2xl hover:shadow-yellow-300/40 duration-300 ml-[50px]">
//     <h3 className="text-2xl font-bold text-gray-800 mb-2 mr-[250px]">{data.name}</h3>

//     <p className="text-base text-gray-600 italic mb-3 mr-[250px]">
//       {data.weather[0].main} - {data.weather[0].description}
//     </p>

//     <p className="text-4xl font-extrabold text-blue-700 mb-2 mr-[250px]">
//       🌡️ {data.main.temp}°C
//     </p>

//     <p className="text-lg text-purple-700 font-medium mr-[250px]">
//       💧 Humidity: {data.main.humidity}%
//     </p>
//   </div>
//   );
// };

// export default WeatherCard;
