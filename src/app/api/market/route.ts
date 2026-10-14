import { NextResponse } from 'next/server';
import { getMarketDataForCrop, getMarketComparisons, calculateNetRevenue } from '@/lib/marketService';
import { DEFAULT_FARM } from '@/lib/farmStore';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get('crop') || 'Maize';
    const country = searchParams.get('country') || 'Kenya';

    const marketData = getMarketDataForCrop(crop, country);
    const comparisons = getMarketComparisons(
      crop,
      marketData.currentPrice,
      marketData.currency,
      marketData.unit
    );

    return NextResponse.json({
      success: true,
      crop,
      country,
      marketData,
      comparisons
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      expectedYieldKg = 1000,
      sellingPricePerKg = 70,
      transportCost = 3000,
      storageCost = 1500,
      packagingCost = 1200,
      commissionPercent = 5
    } = body;

    const calculation = calculateNetRevenue(
      expectedYieldKg,
      sellingPricePerKg,
      transportCost,
      storageCost,
      packagingCost,
      commissionPercent
    );

    return NextResponse.json({ success: true, calculation });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
