import { NextResponse } from 'next/server';
import { getRankedCropRecommendations } from '@/lib/cropRecommendationEngine';
import { DEFAULT_FARM } from '@/lib/farmStore';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tempParam = searchParams.get('temp');
    const currentTemp = tempParam ? parseFloat(tempParam) : 24;

    let farm = DEFAULT_FARM;
    try {
      const dbFarm = await prisma.farm.findFirst({
        orderBy: { updatedAt: 'desc' }
      });
      if (dbFarm) {
        farm = {
          ...DEFAULT_FARM,
          id: dbFarm.id,
          name: dbFarm.name,
          country: dbFarm.country,
          region: dbFarm.region,
          totalArea: dbFarm.totalArea,
          soilType: dbFarm.soilType,
          irrigationType: dbFarm.irrigationType as any,
          mainGoal: dbFarm.mainGoal as any,
          farmingPractice: dbFarm.farmingPractice as any,
        };
      }
    } catch {
      // Fallback to DEFAULT_FARM
    }

    const recommendations = getRankedCropRecommendations(farm, currentTemp);

    return NextResponse.json({
      success: true,
      farm: {
        name: farm.name,
        country: farm.country,
        soilType: farm.soilType,
        irrigationType: farm.irrigationType
      },
      recommendations,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
