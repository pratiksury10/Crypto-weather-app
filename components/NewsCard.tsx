import React from 'react';

interface Props {
  data: {
    title: string;
    link: string;
    source_id: string;
    pubDate: string;
  };
}

const NewsCard = ({ data }: Props) => {
  return (
    <a href={data.link} target="_blank" rel="noopener noreferrer" className="block w-full bg-white p-4 rounded-xl shadow-md hover:bg-gray-50 transition">
      <h4 className="font-semibold text-lg">{data.title}</h4>
      <p className="text-xs text-gray-500 mt-1">Source: {data.source_id} • {new Date(data.pubDate).toLocaleDateString()}</p>
    </a>
  );
};

export default NewsCard;
