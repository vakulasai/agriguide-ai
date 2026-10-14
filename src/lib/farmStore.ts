import { Farm, UpcomingTask, CropPlan } from '@/types';

export const DEFAULT_FARM: Farm = {
  id: 'farm-green-valley',
  name: 'Green Valley Farm',
  country: 'Kenya',
  region: 'Nairobi',
  district: 'Kiambu Border',
  coordinates: {
    latitude: -1.286389,
    longitude: 36.817223,
  },
  totalArea: 1.2,
  areaUnit: 'hectares',
  soilType: 'Loam',
  soilPh: 6.5,
  organicMatter: 'Medium',
  npk: {
    nitrogen: 'Adequate',
    phosphorus: 'Moderate',
    potassium: 'Good'
  },
  irrigationType: 'Rain-fed',
  waterAvailability: 'Moderate',
  mainGoal: 'Higher Yield',
  farmingExperience: 'Intermediate',
  preferredCrops: ['Maize', 'Tomato', 'Beans', 'Lettuce'],
  farmingPractice: 'Transitioning to Organic',
  createdAt: '2025-01-10T00:00:00.000Z',
  updatedAt: '2025-04-15T00:00:00.000Z'
};

export const DEFAULT_TASKS: UpcomingTask[] = [
  {
    id: 'task-1',
    title: 'Apply organic compost',
    time: 'Today • 2:00 PM',
    category: 'Fertilizer',
    completed: false
  },
  {
    id: 'task-2',
    title: 'Check weather forecast',
    time: 'Tomorrow • 9:00 AM',
    category: 'Weather',
    completed: false
  },
  {
    id: 'task-3',
    title: 'Water the crops',
    time: 'In 3 days',
    category: 'Irrigation',
    completed: false
  }
];

export const DEFAULT_TOMATO_PLAN: CropPlan = {
  id: 'plan-tomato-2025',
  cropName: 'Tomato',
  variety: 'Local Hybrid',
  farmId: 'farm-green-valley',
  farmArea: 1.2,
  plantingDate: 'Apr 22, 2025',
  expectedHarvestDate: 'Jul 15, 2025',
  durationDays: 85,
  stages: [
    { id: 's1', name: 'Land Prep', dayRange: 'Day 1-7', icon: 'Tractor' },
    { id: 's2', name: 'Sowing', dayRange: 'Day 8-14', icon: 'Sprout' },
    { id: 's3', name: 'Vegetative', dayRange: 'Day 15-30', icon: 'Leaf' },
    { id: 's4', name: 'Flowering', dayRange: 'Day 31-45', icon: 'Flower2' },
    { id: 's5', name: 'Fruiting', dayRange: 'Day 46-70', icon: 'Apple' },
    { id: 's6', name: 'Harvest', dayRange: 'Day 71-80', icon: 'ShoppingBag' }
  ],
  tasks: [
    { id: 't1', activity: 'Apply compost', date: 'Apr 15, 2025', details: '2–3 kg per m²', icon: 'Tractor', category: 'Soil Prep', completed: true },
    { id: 't2', activity: 'Sow seeds', date: 'Apr 22, 2025', details: 'Depth: 1–2 cm', icon: 'Sprout', category: 'Sowing', completed: true },
    { id: 't3', activity: 'First fertilizer', date: 'May 10, 2025', details: 'Organic NPK (1 kg/100 m²)', icon: 'Leaf', category: 'Fertilizer', completed: false },
    { id: 't4', activity: 'Irrigation', date: 'May 12, 2025', details: 'Keep soil moist', icon: 'Droplets', category: 'Irrigation', completed: false },
    { id: 't5', activity: 'Pest control (organic)', date: 'May 20, 2025', details: 'Neem oil / garlic spray', icon: 'ShieldAlert', category: 'Pest Control', completed: false }
  ],
  recommendations: [
    'Use organic compost and mulch.',
    'Irrigate 2-3 times per week (based on weather).',
    'Monitor for pests and diseases (use neem oil).',
    'Follow the market trends for better selling price.'
  ],
  imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  budget: {
    seeds: 45,
    soilAmendments: 120,
    fertilizers: 110,
    labour: 250,
    irrigationEnergy: 80,
    pestManagement: 65,
    equipment: 50,
    packaging: 40,
    storage: 30,
    transport: 60,
    other: 0
  },
  expectedYieldKg: 14000,
  expectedPricePerKg: 110
};
