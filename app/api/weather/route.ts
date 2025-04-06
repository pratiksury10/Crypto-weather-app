// app/api/weather/route.ts
import { fetchWeather } from '@/utils/api';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  if (!city) {
    return new Response(JSON.stringify({ error: 'City is required' }), {
      status: 400,
    });
  }

  try {
    const data = await fetchWeather(city);
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch weather data' }),
      { status: 500 }
    );
  }
}