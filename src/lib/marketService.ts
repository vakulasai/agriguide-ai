import { MarketPriceRecord } from '@/types';

export interface MarketComparison {
  marketName: string;
  distanceKm: number;
  price: number;
  currency: string;
  unit: string;
  transportCostEstimate: number;
  netRealizedPrice: number;
}

export const REGIONAL_MARKET_DATA: Record<string, Record<string, MarketPriceRecord>> = {
  Kenya: {
    Maize: {
      cropName: 'Maize',
      variety: 'Dry White Maize (Grade 1)',
      marketName: 'Local Market (Nairobi Wakulima)',
      region: 'Nairobi',
      country: 'Kenya',
      currentPrice: 72,
      currency: 'KSh',
      unit: 'kg',
      changePercentage: 5.2,
      source: 'National Cereals and Produce Board (NCPB) & Local Market Survey',
      updatedAt: 'Apr 29, 2025',
      priceTrend: [
        { date: 'Apr 1', price: 62 },
        { date: 'Apr 8', price: 65 },
        { date: 'Apr 15', price: 67 },
        { date: 'Apr 22', price: 70 },
        { date: 'Apr 29', price: 72 }
      ],
      sellingRecommendation: 'It might be better to wait 1–2 weeks for a higher price as regional buffer stocks decrease. However, carefully consider storage costs and crop quality.',
      isLive: false
    },
    Tomato: {
      cropName: 'Tomato',
      variety: 'Anna F1 Hybrid',
      marketName: 'Kangemi Market, Nairobi',
      region: 'Nairobi',
      country: 'Kenya',
      currentPrice: 110,
      currency: 'KSh',
      unit: 'kg',
      changePercentage: -2.1,
      source: 'Nairobi Fresh Produce Wholesalers',
      updatedAt: 'Apr 29, 2025',
      priceTrend: [
        { date: 'Apr 1', price: 125 },
        { date: 'Apr 8', price: 120 },
        { date: 'Apr 15', price: 115 },
        { date: 'Apr 22', price: 112 },
        { date: 'Apr 29', price: 110 }
      ],
      sellingRecommendation: 'Harvest and sell immediately. Tomato arrivals are surging from neighboring regions, creating slight downward price pressure.',
      isLive: false
    },
    Beans: {
      cropName: 'Beans',
      variety: 'Rosecoco (Nyayo)',
      marketName: 'Gikomba Market, Nairobi',
      region: 'Nairobi',
      country: 'Kenya',
      currentPrice: 140,
      currency: 'KSh',
      unit: 'kg',
      changePercentage: 8.5,
      source: 'Kenya Ministry of Agriculture Market Information System',
      updatedAt: 'Apr 29, 2025',
      priceTrend: [
        { date: 'Apr 1', price: 120 },
        { date: 'Apr 8', price: 125 },
        { date: 'Apr 15', price: 130 },
        { date: 'Apr 22', price: 135 },
        { date: 'Apr 29', price: 140 }
      ],
      sellingRecommendation: 'Strong seller market. Dry pulse demand is elevated. Sell in batches to secure peak pricing while avoiding prolonged storage pest exposure.',
      isLive: false
    },
    Lettuce: {
      cropName: 'Lettuce',
      variety: 'Butterhead Crisp',
      marketName: 'City Market, Nairobi',
      region: 'Nairobi',
      country: 'Kenya',
      currentPrice: 85,
      currency: 'KSh',
      unit: 'kg',
      changePercentage: 3.4,
      source: 'Urban Farm Gate Index',
      updatedAt: 'Apr 29, 2025',
      priceTrend: [
        { date: 'Apr 1', price: 78 },
        { date: 'Apr 8', price: 80 },
        { date: 'Apr 15', price: 82 },
        { date: 'Apr 22', price: 83 },
        { date: 'Apr 29', price: 85 }
      ],
      sellingRecommendation: 'High demand in hospitality sector. Consistent morning harvesting will maintain top grade pricing.',
      isLive: false
    }
  },
  India: {
    Maize: {
      cropName: 'Maize',
      variety: 'Yellow Feed Grain',
      marketName: 'Davangere APMC Mandi',
      region: 'Karnataka',
      country: 'India',
      currentPrice: 24,
      currency: '₹',
      unit: 'kg',
      changePercentage: 3.1,
      source: 'Agmarknet / eNAM (Govt of India Portal)',
      updatedAt: 'Apr 29, 2025',
      priceTrend: [
        { date: 'Apr 1', price: 21 },
        { date: 'Apr 8', price: 22 },
        { date: 'Apr 15', price: 22.5 },
        { date: 'Apr 22', price: 23.2 },
        { date: 'Apr 29', price: 24 }
      ],
      sellingRecommendation: 'Stable poultry feed demand is sustaining prices above MSP. Suitable time to liquidate dried stocks.',
      isLive: false
    },
    Tomato: {
      cropName: 'Tomato',
      variety: 'Hybrid Desi / Bangalore',
      marketName: 'Kolar APMC Mandi',
      region: 'Karnataka',
      country: 'India',
      currentPrice: 32,
      currency: '₹',
      unit: 'kg',
      changePercentage: 12.4,
      source: 'Agmarknet / eNAM Mandi Realtime Feed',
      updatedAt: 'Apr 29, 2025',
      priceTrend: [
        { date: 'Apr 1', price: 22 },
        { date: 'Apr 8', price: 25 },
        { date: 'Apr 15', price: 28 },
        { date: 'Apr 22', price: 30 },
        { date: 'Apr 29', price: 32 }
      ],
      sellingRecommendation: 'Strong upward swing due to lower arrivals. Grade sorting into Premium crates can yield a ₹3-5/kg bonus.',
      isLive: false
    },
    Beans: {
      cropName: 'Beans',
      variety: 'French Green Bush',
      marketName: 'Pune APMC Mandi',
      region: 'Maharashtra',
      country: 'India',
      currentPrice: 48,
      currency: '₹',
      unit: 'kg',
      changePercentage: 4.0,
      source: 'Agmarknet / eNAM Daily Modal Prices',
      updatedAt: 'Apr 29, 2025',
      priceTrend: [
        { date: 'Apr 1', price: 42 },
        { date: 'Apr 8', price: 44 },
        { date: 'Apr 15', price: 45 },
        { date: 'Apr 22', price: 46 },
        { date: 'Apr 29', price: 48 }
      ],
      sellingRecommendation: 'Healthy local wholesale demand. Ensure gentle handling to avoid blemishing pod appearance.',
      isLive: false
    },
    Lettuce: {
      cropName: 'Lettuce',
      variety: 'Iceberg Hydroponic / Polyhouse',
      marketName: 'Vashi Market, Navi Mumbai',
      region: 'Maharashtra',
      country: 'India',
      currentPrice: 65,
      currency: '₹',
      unit: 'kg',
      changePercentage: 1.5,
      source: 'Agmarknet Speciality Vegetable Section',
      updatedAt: 'Apr 29, 2025',
      priceTrend: [
        { date: 'Apr 1', price: 60 },
        { date: 'Apr 8', price: 62 },
        { date: 'Apr 15', price: 63 },
        { date: 'Apr 22', price: 64 },
        { date: 'Apr 29', price: 65 }
      ],
      sellingRecommendation: 'Direct-to-retail or hotel channel offers 20% premium over bulk wholesale yard transactions.',
      isLive: false
    }
  }
};

export function getMarketDataForCrop(cropName: string, country: string = 'Kenya'): MarketPriceRecord {
  const countryData = REGIONAL_MARKET_DATA[country] || REGIONAL_MARKET_DATA['Kenya'];
  if (countryData[cropName]) {
    return countryData[cropName];
  }
  // Fallback to Maize in that country
  return countryData['Maize'] || REGIONAL_MARKET_DATA['Kenya']['Maize'];
}

export function getMarketComparisons(cropName: string, basePrice: number, currency: string, unit: string): MarketComparison[] {
  return [
    {
      marketName: 'Local Central Market',
      distanceKm: 8,
      price: basePrice,
      currency,
      unit,
      transportCostEstimate: 2.5,
      netRealizedPrice: basePrice - 2.5
    },
    {
      marketName: 'Suburban Wholesale Hub',
      distanceKm: 24,
      price: Math.round(basePrice * 1.08),
      currency,
      unit,
      transportCostEstimate: 5.0,
      netRealizedPrice: Math.round(basePrice * 1.08) - 5.0
    },
    {
      marketName: 'Regional Agri-Terminal',
      distanceKm: 65,
      price: Math.round(basePrice * 1.15),
      currency,
      unit,
      transportCostEstimate: 9.5,
      netRealizedPrice: Math.round(basePrice * 1.15) - 9.5
    }
  ];
}

export function calculateNetRevenue(
  expectedYieldKg: number,
  sellingPricePerKg: number,
  transportCostTotal: number,
  storageCostTotal: number,
  packagingCostTotal: number,
  commissionRatePercent: number = 5
) {
  const grossRevenue = expectedYieldKg * sellingPricePerKg;
  const commission = (grossRevenue * commissionRatePercent) / 100;
  const totalSellingExpenses = transportCostTotal + storageCostTotal + packagingCostTotal + commission;
  const netRevenue = grossRevenue - totalSellingExpenses;
  const netPricePerKg = expectedYieldKg > 0 ? netRevenue / expectedYieldKg : 0;

  return {
    grossRevenue: Math.round(grossRevenue),
    commission: Math.round(commission),
    totalSellingExpenses: Math.round(totalSellingExpenses),
    netRevenue: Math.round(netRevenue),
    netPricePerKg: Number(netPricePerKg.toFixed(2))
  };
}
