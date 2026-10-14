import { NextResponse } from 'next/server';
import { z } from 'zod';
import { analyzeCropHealthImage } from '@/lib/aiService';

const VisionSchema = z.object({
  cropName: z.string().default('Tomato'),
  plantPart: z.string().default('Leaf'),
  symptoms: z.string().optional(),
  imageUrl: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cropName, plantPart, symptoms, imageUrl } = VisionSchema.parse(body);

    const analysis = analyzeCropHealthImage(imageUrl || 'sample-leaf.jpg', cropName, plantPart, symptoms);

    return NextResponse.json({
      success: true,
      analysis,
      disclaimer: 'Agronomic AI diagnosis is advisory and based on visual symptom patterns. Always cross-verify critical field decisions with a local extension officer or certified agronomist.'
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
