'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Lightbulb,
  Scale,
  Calculator,
  ArrowRight,
  Info,
  DollarSign,
  Calendar,
  X
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { MarketPriceRecord } from '@/types';
import {
  getMarketDataForCrop,
  getMarketComparisons,
  calculateNetRevenue
} from '@/lib/marketService';

interface MarketPricesViewProps {
  country?: string;
  region?: string;
}

export const MarketPricesView: React.FC<MarketPricesViewProps> = ({
  country = 'Kenya',
  region = 'Nairobi',
}) => {
  const [selectedCrop, setSelectedCrop] = useState('Maize');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  // Calculator states
  const [calcYield, setCalcYield] = useState(2500); // 2.5 tonnes
  const [calcTransport, setCalcTransport] = useState(3500);
  const [calcStorage, setCalcStorage] = useState(1200);
  const [calcPackaging, setCalcPackaging] = useState(1000);
  const [calcCommission, setCalcCommission] = useState(5);

  const marketData = getMarketDataForCrop(selectedCrop, country);
  const comparisons = getMarketComparisons(
    selectedCrop,
    marketData.currentPrice,
    marketData.currency,
    marketData.unit
  );

  const crops = ['Maize', 'Tomato', 'Beans', 'Lettuce'];

  const revenueResult = calculateNetRevenue(
    calcYield,
    marketData.currentPrice,
    calcTransport,
    calcStorage,
    calcPackaging,
    calcCommission
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching screenshot Panel 8 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Market Prices</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Current prices in your region ({region}, {country})
        </p>
      </div>

      {/* Crop Selector Tabs matching screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {crops.map((crop) => (
          <button
            key={crop}
            onClick={() => setSelectedCrop(crop)}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCrop === crop
                ? 'bg-[#154734] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300'
            }`}
          >
            {crop}
          </button>
        ))}
      </div>

      {/* Main Grid: Chart on Left, Current Price on Right matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Trend Chart (2 columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {selectedCrop} Price Trend ({marketData.currency}/{marketData.unit})
            </h3>
            <span className="text-[11px] text-gray-400">Past 30 Days</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData.priceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  domain={['dataMin - 10', 'dataMax + 10']}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`${marketData.currency} ${value}`, 'Wholesale Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Price Card matching screenshot */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Current Price
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-gray-900">
                {marketData.currency} {marketData.currentPrice}
              </span>
              <span className="text-sm font-semibold text-gray-500">/ {marketData.unit}</span>
            </div>

            <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
              <span>{marketData.changePercentage > 0 ? '+' : ''}{marketData.changePercentage}% vs last week</span>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
              <p>
                <span className="font-semibold text-gray-700">Source:</span> {marketData.source}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Updated:</span> {marketData.updatedAt}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Market:</span> {marketData.marketName}
              </p>
            </div>
          </div>

          <div className="pt-4 mt-2">
            <button
              onClick={() => setShowCalculatorModal(true)}
              className="w-full py-2.5 rounded-xl bg-[#154734] hover:bg-[#1a553e] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-300" />
              <span>Net Revenue Calculator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selling Recommendation Box matching screenshot Panel 8 */}
      <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Selling Recommendation</h4>
          <p className="text-xs text-gray-700 mt-1 leading-relaxed">
            {marketData.sellingRecommendation}
          </p>
        </div>
      </div>

      {/* Action Buttons matching screenshot */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setShowCompareModal(true)}
          className="px-5 py-2.5 rounded-xl border border-gray-300 hover:border-emerald-500 text-gray-700 font-semibold text-xs transition-colors flex items-center gap-2 bg-white"
        >
          <Scale className="w-3.5 h-3.5 text-emerald-700" />
          <span>Compare Markets</span>
        </button>

        <button
          onClick={() => setShowCalculatorModal(true)}
          className="px-6 py-2.5 rounded-xl bg-[#154734] hover:bg-[#1a553e] text-white font-semibold text-xs shadow-md active:scale-95 transition-all"
        >
          View Details
        </button>
      </div>

      {/* Compare Markets Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Regional Market Comparisons: {selectedCrop}
              </h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {comparisons.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-gray-900">{m.marketName}</p>
                    <p className="text-gray-500">{m.distanceKm} km from farm</p>
                  </div>

                  <div className="text-right">
                    <p className="font-extrabold text-sm text-gray-900">
                      {m.currency} {m.price} / {m.unit}
                    </p>
                    <p className="text-[11px] text-emerald-800 font-semibold">
                      Net: {m.currency} {m.netRealizedPrice} (after transport)
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2 bg-emerald-800 text-white rounded-xl font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Net Revenue Calculator Modal */}
      {showCalculatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Selling & Net Profit Calculator ({selectedCrop})
              </h3>
              <button
                onClick={() => setShowCalculatorModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Expected Harvest ({marketData.unit})
                  </label>
                  <input
                    type="number"
                    value={calcYield}
                    onChange={(e) => setCalcYield(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Transport Cost ({marketData.currency})
                  </label>
                  <input
                    type="number"
                    value={calcTransport}
                    onChange={(e) => setCalcTransport(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Storage Cost ({marketData.currency})
                  </label>
                  <input
                    type="number"
                    value={calcStorage}
                    onChange={(e) => setCalcStorage(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Packaging / Crates ({marketData.currency})
                  </label>
                  <input
                    type="number"
                    value={calcPackaging}
                    onChange={(e) => setCalcPackaging(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 mt-4 space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Gross Revenue:</span>
                  <span className="font-bold text-gray-800">
                    {marketData.currency} {revenueResult.grossRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Selling & Transport Expenses:</span>
                  <span className="text-red-700 font-semibold">
                    - {marketData.currency} {revenueResult.totalSellingExpenses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-emerald-900 pt-2 border-t border-emerald-200">
                  <span>Estimated Net Cash Revenue:</span>
                  <span>
                    {marketData.currency} {revenueResult.netRevenue.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 pt-1">
                  Net Realized: {marketData.currency} {revenueResult.netPricePerKg} / {marketData.unit}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowCalculatorModal(false)}
                className="px-5 py-2 bg-emerald-800 text-white rounded-xl font-semibold text-xs"
              >
                Close Calculator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
