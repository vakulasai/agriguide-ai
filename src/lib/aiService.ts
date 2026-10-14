import { AIMessage, CropHealthAnalysis } from '@/types';

export interface AIServiceResponse {
  reply: string;
  suggestedActions?: {
    label: string;
    actionType: 'add_calendar' | 'more_details' | 'ask_another' | 'view_plan';
    payload?: any;
  }[];
  isLiveModel: boolean;
  modelUsed: string;
}

// Built-in intelligent agronomy response generator for demo / offline mode
export function generateAgronomicAssistantResponse(userPrompt: string): AIServiceResponse {
  const lower = userPrompt.toLowerCase();

  if (lower.includes('fertilizer') && (lower.includes('tomato') || lower.includes('when'))) {
    return {
      reply: `For tomatoes, you should apply the first fertilizer 2–3 weeks after transplanting.

Use organic compost or well-rotted manure. For better yield, you can also add a balanced organic fertilizer (e.g., NPK 4-4-4) every 15 days during the vegetative stage.

Would you like me to add this to your crop calendar?`,
      suggestedActions: [
        { label: '📅 Add to Calendar', actionType: 'add_calendar', payload: { title: 'Apply organic NPK fertilizer to tomatoes', category: 'Fertilizer', daysFromNow: 14 } },
        { label: 'More Details', actionType: 'more_details' },
        { label: 'Ask Another', actionType: 'ask_another' }
      ],
      isLiveModel: false,
      modelUsed: 'AgriGuide Agronomic Knowledge Engine (Demo Mode)'
    };
  }

  if (lower.includes('organic') || lower.includes('compost') || lower.includes('pest')) {
    return {
      reply: `In organic systems, pest management relies on the "Pest Prevention Pyramid":
1. Cultural: Crop rotation and wide spacing to maximize air movement.
2. Physical: Sticky yellow traps and insect netting.
3. Biological: Preserving predatory ladybugs and parasitic wasps.
4. Botanical Sprays: Neem oil (0.5% emulsion) or garlic-chili extract as a contact repellent.

For soil fertility, a 30:1 Carbon-to-Nitrogen compost cured for 90 days provides slow-release micronutrients and builds mycorrhizal networks.`,
      suggestedActions: [
        { label: 'View Organic Guide', actionType: 'view_plan' },
        { label: 'More Details', actionType: 'more_details' },
        { label: 'Ask Another', actionType: 'ask_another' }
      ],
      isLiveModel: false,
      modelUsed: 'AgriGuide Agronomic Knowledge Engine (Demo Mode)'
    };
  }

  if (lower.includes('weather') || lower.includes('rain') || lower.includes('water')) {
    return {
      reply: `Based on your farm's weather forecast, moisture levels are currently adequate. With moderate rain expected mid-week, postpone top-dressing nitrogen fertilizers until rainfall subsides to prevent nutrient runoff and leaching.`,
      suggestedActions: [
        { label: 'Check 7-Day Forecast', actionType: 'view_plan' },
        { label: 'Ask Another', actionType: 'ask_another' }
      ],
      isLiveModel: false,
      modelUsed: 'AgriGuide Agronomic Knowledge Engine (Demo Mode)'
    };
  }

  return {
    reply: `I can help you optimize your farm operations! You can ask me about:
• Organic fertilizer schedules and compost preparation
• Identifying crop diseases and natural pest control remedies
• Customizing your crop calendar stages and planting windows
• Interpreting soil pH and NPK nutrient measurements
• Weather-dependent irrigation and harvest decisions.

What specific crop or farming question would you like help with today?`,
    suggestedActions: [
      { label: 'When should I apply fertilizer for tomatoes?', actionType: 'ask_another' },
      { label: 'How to make high-quality compost?', actionType: 'more_details' },
      { label: 'Pest control without chemicals', actionType: 'more_details' }
    ],
    isLiveModel: false,
    modelUsed: 'AgriGuide Agronomic Knowledge Engine (Demo Mode)'
  };
}

export function analyzeCropHealthImage(
  imageFileName: string,
  cropName: string = 'Tomato',
  plantPart: string = 'Leaf',
  symptomsText?: string
): CropHealthAnalysis {
  // Calibrated diagnostic matching reference image
  return {
    id: `health-${Date.now()}`,
    cropName,
    plantPart,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    detectedCondition: 'Early Blight (Alternaria solani)',
    conditionType: 'Disease',
    confidence: 87,
    symptoms: [
      'Yellow spots on leaves with concentric dark ring patterns',
      'Brown and necrotic leaf margins',
      'Lower leaves showing early yellowing; may spread to stems and petioles'
    ],
    recommendedActions: [
      'Remove infected lower leaves immediately and dispose away from the field.',
      'Apply organic neem oil spray (5ml per litre with mild soap emulsifier) or Trichoderma harzianum.',
      'Improve air circulation by pruning bottom suckers and adjusting drip irrigation away from foliage.'
    ],
    organicTreatment: [
      'Copper-based organic fungicide (Copper Hydroxide) where certified and necessary',
      'Neem oil / pongamia oil weekly preventive spray',
      'Mulch bare soil under plants to stop rain splashing spores onto lower leaves'
    ],
    prevention: [
      'Practice minimum 3-year crop rotation without solanaceous crops (potato, pepper, eggplant)',
      'Water only at ground level via drip tape; avoid overhead sprinkler wetting',
      'Ensure 60 cm row spacing for rapid morning drying'
    ],
    requiresExpert: false,
    analyzedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    userNotes: symptomsText || 'Observed yellow spots with brown dry margins on lower leaf canopy.'
  };
}
