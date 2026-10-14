import { NextResponse } from 'next/server';
import { DEFAULT_TOMATO_PLAN } from '@/lib/farmStore';
import { z } from 'zod';

let activeCropPlan = { ...DEFAULT_TOMATO_PLAN };

export async function GET() {
  return NextResponse.json({ success: true, plan: activeCropPlan });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    activeCropPlan = {
      ...activeCropPlan,
      ...body,
      budget: {
        ...activeCropPlan.budget,
        ...(body.budget || {})
      }
    };
    return NextResponse.json({ success: true, plan: activeCropPlan });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
