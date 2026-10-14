import { describe, it, expect } from 'vitest';
import { calculateCropSuitability, getRankedCropRecommendations } from '@/lib/cropRecommendationEngine';
import { CROPS_DATABASE, ORGANIC_FARMING_BENEFITS, ORGANIC_TRANSITION_STEPS } from '@/lib/agronomyData';
import { DEFAULT_FARM } from '@/lib/farmStore';
import { calculateNetRevenue, getMarketDataForCrop } from '@/lib/marketService';
import { generateAgronomicAssistantResponse, analyzeCropHealthImage } from '@/lib/aiService';
import { getFallbackWeatherData } from '@/lib/weatherService';

describe('AgriGuide AI Agronomy Engine', () => {
  it('correctly ranks crops based on farm soil and climate profile', () => {
    const recommendations = getRankedCropRecommendations(DEFAULT_FARM, 24);
    expect(recommendations.length).toBeGreaterThan(0);
    // Highest ranked crop should have a high score
    expect(recommendations[0].suitabilityScore).toBeGreaterThanOrEqual(75);
    expect(recommendations[0].confidence).toBeGreaterThan(80);
    expect(recommendations[0].majorRisks.length).toBeGreaterThan(0);
  });

  it('contains the mandatory 5 organic farming benefits', () => {
    expect(ORGANIC_FARMING_BENEFITS.length).toBe(5);
    expect(ORGANIC_FARMING_BENEFITS[0].title).toContain('soil structure');
    expect(ORGANIC_FARMING_BENEFITS[1].title).toContain('beneficial organisms');
    expect(ORGANIC_FARMING_BENEFITS[2].title).toContain('synthetic agricultural inputs');
    expect(ORGANIC_FARMING_BENEFITS[3].title).toContain('soil-cover');
    expect(ORGANIC_FARMING_BENEFITS[4].title).toContain('market');
  });

  it('contains the mandatory 10-step organic transition checklist', () => {
    expect(ORGANIC_TRANSITION_STEPS.length).toBe(10);
    expect(ORGANIC_TRANSITION_STEPS[0].title).toContain('soil');
    expect(ORGANIC_TRANSITION_STEPS[9].title).toContain('certification');
  });
});

describe('Market Intelligence & Revenue Calculations', () => {
  it('calculates net revenue and expenses with precision', () => {
    const result = calculateNetRevenue(
      1000, // 1000 kg yield
      72,   // 72 KSh per kg
      3000, // 3000 transport
      1500, // 1500 storage
      1200, // 1200 packaging
      5     // 5% commission
    );

    expect(result.grossRevenue).toBe(72000);
    expect(result.commission).toBe(3600);
    expect(result.totalSellingExpenses).toBe(3000 + 1500 + 1200 + 3600); // 9300
    expect(result.netRevenue).toBe(72000 - 9300); // 62700
    expect(result.netPricePerKg).toBe(62.7);
  });

  it('retrieves regional market price data with valid source and trends', () => {
    const data = getMarketDataForCrop('Maize', 'Kenya');
    expect(data.currentPrice).toBe(72);
    expect(data.currency).toBe('KSh');
    expect(data.priceTrend.length).toBe(5);
    expect(data.source).toBeDefined();
    expect(data.sellingRecommendation).toBeDefined();
  });
});

describe('AI Agronomic Knowledge & Health Diagnosis', () => {
  it('provides structured advice and actionable calendar chips for tomato fertilization', () => {
    const response = generateAgronomicAssistantResponse('When should I apply fertilizer for tomatoes?');
    expect(response.reply).toContain('2–3 weeks after transplanting');
    expect(response.suggestedActions).toBeDefined();
    expect(response.suggestedActions?.some(a => a.label.includes('Add to Calendar'))).toBe(true);
  });

  it('diagnoses plant disease and provides safe organic remedies', () => {
    const analysis = analyzeCropHealthImage('leaf.jpg', 'Tomato', 'Leaf');
    expect(analysis.detectedCondition).toBe('Early Blight (Alternaria solani)');
    expect(analysis.confidence).toBe(87);
    expect(analysis.recommendedActions.length).toBeGreaterThan(0);
    expect(analysis.organicTreatment.some(t => t.toLowerCase().includes('neem'))).toBe(true);
  });
});

describe('Weather Service & Open-Meteo Fallback', () => {
  it('provides comprehensive 7-day forecast dataset', () => {
    const weather = getFallbackWeatherData();
    expect(weather.dailyForecast.length).toBe(7);
    expect(weather.currentTemp).toBe(24);
    expect(weather.humidity).toBe(68);
    expect(weather.windSpeed).toBe(12);
    expect(weather.farmingAdvice.length).toBeGreaterThan(0);
  });
});
