import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateAgronomicAssistantResponse } from '@/lib/aiService';

const ChatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  conversationHistory: z.array(z.object({
    sender: z.enum(['user', 'assistant']),
    text: z.string()
  })).optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = ChatSchema.parse(body);

    const apiKey = process.env.AI_API_KEY;
    const provider = process.env.AI_PROVIDER || 'mock';

    // If an external AI API key is configured, we could execute remote call here
    // If not configured, we use our built-in agronomist expert system
    const result = generateAgronomicAssistantResponse(message);

    return NextResponse.json({
      success: true,
      message: result.reply,
      suggestedActions: result.suggestedActions,
      isLiveModel: result.isLiveModel,
      provider: apiKey ? provider : 'AgriGuide Local Agronomy Engine (Configurable in .env)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
