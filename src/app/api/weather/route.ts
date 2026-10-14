import { NextResponse } from 'next/server';
import { fetchWeatherData } from '@/lib/weatherService';
import { DEFAULT_FARM } from '@/lib/farmStore';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');
    const locationParam = searchParams.get('location');

    let lat = latParam ? parseFloat(latParam) : DEFAULT_FARM.coordinates!.latitude;
    let lon = lonParam ? parseFloat(lonParam) : DEFAULT_FARM.coordinates!.longitude;
    let location = locationParam || DEFAULT_FARM.region;
    let country = DEFAULT_FARM.country;

    try {
      const farm = await prisma.farm.findFirst({ orderBy: { updatedAt: 'desc' } });
      if (farm && !locationParam) {
        location = farm.region;
        country = farm.country;
        if (farm.latitude && farm.longitude) {
          lat = farm.latitude;
          lon = farm.longitude;
        }
      }
    } catch {
      // Use defaults
    }

    const weather = await fetchWeatherData(lat, lon, location, country);

    return NextResponse.json({ success: true, weather });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
