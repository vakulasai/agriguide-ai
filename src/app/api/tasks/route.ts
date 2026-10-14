import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';
import { DEFAULT_TASKS } from '@/lib/farmStore';

const TaskCreateSchema = z.object({
  title: z.string().min(2),
  time: z.string().min(2),
  category: z.enum(['Fertilizer', 'Weather', 'Irrigation', 'Pest Control', 'Harvest', 'Soil Prep'])
});

export async function GET() {
  try {
    const dbTasks = await prisma.reminder.findMany({
      orderBy: { id: 'asc' }
    });

    if (dbTasks.length === 0) {
      return NextResponse.json({ success: true, tasks: DEFAULT_TASKS });
    }

    const tasks = dbTasks.map(t => ({
      id: t.id,
      title: t.title,
      time: t.dueTime,
      category: t.category as any,
      completed: t.completed
    }));

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    return NextResponse.json({ success: true, tasks: DEFAULT_TASKS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = TaskCreateSchema.parse(body);

    const farm = await prisma.farm.findFirst();
    if (!farm) {
      return NextResponse.json({
        success: true,
        task: {
          id: `task-${Date.now()}`,
          title: data.title,
          time: data.time,
          category: data.category,
          completed: false
        }
      });
    }

    const created = await prisma.reminder.create({
      data: {
        farmId: farm.id,
        title: data.title,
        dueTime: data.time,
        category: data.category,
        completed: false
      }
    });

    return NextResponse.json({
      success: true,
      task: {
        id: created.id,
        title: created.title,
        time: created.dueTime,
        category: created.category,
        completed: created.completed
      }
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, completed } = body;

    try {
      await prisma.reminder.update({
        where: { id },
        data: { completed }
      });
    } catch {
      // In case id is demo id not in db, succeed gracefully
    }

    return NextResponse.json({ success: true, id, completed });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
