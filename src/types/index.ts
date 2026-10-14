export interface Farm {
  id: string;
  name: string;
  country: string;
  region: string;
  district?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  totalArea: number; // in hectares
  areaUnit: 'hectares' | 'acres';
  soilType: string;
  soilPh?: number;
  organicMatter?: string; // Low, Medium, High
  npk?: {
    nitrogen?: string;
    phosphorus?: string;
    potassium?: string;
  };
  irrigationType: 'Rain-fed' | 'Drip irrigation' | 'Sprinkler' | 'Surface / Furrow' | 'Canal';
  waterAvailability: 'High' | 'Moderate' | 'Low' | 'Seasonal';
  mainGoal: 'Higher Yield' | 'Maximize Profit' | 'Organic Transition' | 'Water Conservation' | 'Risk Reduction';
  farmingExperience: 'Beginner' | 'Intermediate' | 'Experienced';
  preferredCrops: string[];
  farmingPractice: 'Conventional' | 'Transitioning to Organic' | 'Certified Organic';
  createdAt: string;
  updatedAt: string;
}

export interface UpcomingTask {
  id: string;
  title: string;
  time: string;
  category: 'Fertilizer' | 'Weather' | 'Irrigation' | 'Pest Control' | 'Harvest' | 'Soil Prep';
  completed: boolean;
  farmId?: string;
  cropPlanId?: string;
}

export interface CropRecommendation {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  suitabilityScore: number; // 0-100%
  climateMatch: string;
  soilCompatibility: string;
  marketDemand: 'High' | 'Moderate' | 'Growing';
  durationMonths: string;
  durationDays: number;
  plantingWindow: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  imageUrl: string;
  bulletPoints: string[];
  estimatedCostPerHa: number;
  expectedYieldPerHa: string;
  majorRisks: string[];
  alternativeCrops: string[];
  confidence: number;
}

export interface CalendarStage {
  id: string;
  name: string;
  dayRange: string;
  icon: string;
}

export interface CalendarTask {
  id: string;
  activity: string;
  date: string;
  details: string;
  icon: string;
  category: string;
  completed: boolean;
}

export interface CropPlan {
  id: string;
  cropName: string;
  variety: string;
  farmId: string;
  farmArea: number;
  plantingDate: string;
  expectedHarvestDate: string;
  durationDays: number;
  stages: CalendarStage[];
  tasks: CalendarTask[];
  recommendations: string[];
  imageUrl: string;
  budget: {
    seeds: number;
    soilAmendments: number;
    fertilizers: number;
    labour: number;
    irrigationEnergy: number;
    pestManagement: number;
    equipment: number;
    packaging: number;
    storage: number;
    transport: number;
    other: number;
  };
  expectedYieldKg: number;
  expectedPricePerKg: number;
}

export interface WeatherDay {
  dayName: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  weatherCode: number;
  rainChance: number;
  precipitationMm: number;
  iconName: string;
}

export interface WeatherData {
  location: string;
  country: string;
  latitude: number;
  longitude: number;
  currentTemp: number;
  condition: string;
  humidity: number;
  rainChance: number;
  windSpeed: number; // km/h
  soilMoisture: string;
  solarRadiation: string;
  dailyForecast: WeatherDay[];
  farmingAdvice: string[];
  updatedAt: string;
  source: string;
  isLive: boolean;
}

export interface MarketPriceRecord {
  cropName: string;
  variety?: string;
  marketName: string;
  region: string;
  country: string;
  currentPrice: number;
  currency: string;
  unit: string;
  changePercentage: number;
  source: string;
  updatedAt: string;
  priceTrend: {
    date: string;
    price: number;
  }[];
  sellingRecommendation: string;
  isLive: boolean;
}

export interface CropHealthAnalysis {
  id: string;
  cropName: string;
  plantPart: string;
  imageUrl?: string;
  detectedCondition: string;
  conditionType: 'Disease' | 'Pest' | 'Nutrient Deficiency' | 'Environmental Stress' | 'Healthy';
  confidence: number;
  symptoms: string[];
  recommendedActions: string[];
  organicTreatment: string[];
  prevention: string[];
  requiresExpert: boolean;
  analyzedAt: string;
  userNotes?: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: 'add_calendar' | 'more_details' | 'ask_another' | 'view_plan';
    payload?: any;
  }[];
}
