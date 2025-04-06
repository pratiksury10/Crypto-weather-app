import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWSDATA_API_KEY;

  try {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=top`
    );
    const data = await res.json();

    const simplifiedNews = data.results.slice(0, 6).map((item: any) => ({
      title: item.title,
      description: item.description,
      link: item.link,
      source: item.source_id,
      pubDate: item.pubDate,
    }));

    return NextResponse.json(simplifiedNews);
  } catch (err) {
    console.error('Error fetching news:', err);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
