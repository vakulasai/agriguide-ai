import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';
import { DEFAULT_FARM } from '@/lib/farmStore';

const FarmSchema = z.object({
  name: z.string().min(2, 'Farm name must have at least 2 characters'),
  country: z.string().min(2),
  region: z.string().min(2),
  district: z.string().optional(),
  totalArea: z.number().positive('Area must be greater than 0'),
  areaUnit: z.enum(['hectares', 'acres']),
  soilType: z.string().min(2),
  soilPh: z.number().min(3).max(10).optional(),
  organicMatter: z.string().optional(),
  irrigationType: z.enum(['Rain-fed', 'Drip irrigation', 'Sprinkler', 'Surface / Furrow', 'Canal']),
  waterAvailability: z.enum(['High', 'Moderate', 'Low', 'Seasonal']).optional(),
  mainGoal: z.enum(['Higher Yield', 'Maximize Profit', 'Organic Transition', 'Water Conservation', 'Risk Reduction']),
  farmingExperience: z.enum(['Beginner', 'Intermediate', 'Experienced']).optional(),
  farmingPractice: z.enum(['Conventional', 'Transitioning to Organic', 'Certified Organic']).optional()
});

export async function GET() {
  try {
    const farmRecord = await prisma.farm.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    if (!farmRecord) {
      return NextResponse.json({ success: true, farm: DEFAULT_FARM, source: 'default' });
    }

    return NextResponse.json({
      success: true,
      farm: {
        id: farmRecord.id,
        name: farmRecord.name,
        country: farmRecord.country,
        region: farmRecord.region,
        district: farmRecord.district || undefined,
        totalArea: farmRecord.totalArea,
        areaUnit: farmRecord.areaUnit as 'hectares' | 'acres',
        soilType: farmRecord.soilType,
        soilPh: farmRecord.soilPh || undefined,
        organicMatter: farmRecord.organicMatter || undefined,
        irrigationType: farmRecord.irrigationType as any,
        waterAvailability: farmRecord.waterAvailability as any,
        mainGoal: farmRecord.mainGoal as any,
        farmingExperience: farmRecord.farmingExperience as any,
        farmingPractice: farmRecord.farmingPractice as any,
        preferredCrops: DEFAULT_FARM.preferredCrops,
        coordinates: DEFAULT_FARM.coordinates,
        createdAt: farmRecord.createdAt.toISOString(),
        updatedAt: farmRecord.updatedAt.toISOString(),
      },
      source: 'database'
    });
  } catch (error) {
    console.error('Error fetching farm record:', error);
    return NextResponse.json({ success: true, farm: DEFAULT_FARM, source: 'memory_fallback' });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = FarmSchema.parse(body);

    // Find or create default user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'farmer@agriguide.ai',
          name: 'John Doe',
          role: 'Farmer'
        }
      });
    }

    let farm = await prisma.farm.findFirst();
    if (farm) {
      farm = await prisma.farm.update({
        where: { id: farm.id },
        data: {
          name: validatedData.name,
          country: validatedData.country,
          region: validatedData.region,
          district: validatedData.district || null,
          totalArea: validatedData.totalArea,
          areaUnit: validatedData.areaUnit,
          soilType: validatedData.soilType,
          soilPh: validatedData.soilPh || 6.5,
          organicMatter: validatedData.organicMatter || 'Medium',
          irrigationType: validatedData.irrigationType,
          waterAvailability: validatedData.waterAvailability || 'Moderate',
          mainGoal: validatedData.mainGoal,
          farmingExperience: validatedData.farmingExperience || 'Intermediate',
          farmingPractice: validatedData.farmingPractice || 'Transitioning to Organic'
        }
      });
    } else {
      farm = await prisma.farm.create({
        data: {
          userId: user.id,
          name: validatedData.name,
          country: validatedData.country,
          region: validatedData.region,
          district: validatedData.district || null,
          totalArea: validatedData.totalArea,
          areaUnit: validatedData.areaUnit,
          soilType: validatedData.soilType,
          soilPh: validatedData.soilPh || 6.5,
          organicMatter: validatedData.organicMatter || 'Medium',
          irrigationType: validatedData.irrigationType,
          waterAvailability: validatedData.waterAvailability || 'Moderate',
          mainGoal: validatedData.mainGoal,
          farmingExperience: validatedData.farmingExperience || 'Intermediate',
          farmingPractice: validatedData.farmingPractice || 'Transitioning to Organic'
        }
      });
    }

    return NextResponse.json({ success: true, farm, message: 'Farm profile saved successfully!' });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('Error saving farm:', error);
    return NextResponse.json({ success: false, message: 'Failed to persist farm' }, { status: 500 });
  }
}
