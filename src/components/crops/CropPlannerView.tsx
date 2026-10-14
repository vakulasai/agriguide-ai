'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Droplets,
  Calendar,
  Layers,
  ShieldAlert,
  CheckCircle,
  X,
  Scale,
  Check
} from 'lucide-react';
import { CropRecommendation, Farm } from '@/types';
import { NavSection } from '../layout/Sidebar';

interface CropPlannerViewProps {
  farm: Farm;
  recommendations: CropRecommendation[];
  onSelectCropPlan: (cropName: string) => void;
  onNavigate: (section: NavSection) => void;
}

export const CropPlannerView: React.FC<CropPlannerViewProps> = ({
  farm,
  recommendations,
  onSelectCropPlan,
  onNavigate,
}) => {
  const [selectedCropModal, setSelectedCropModal] = useState<CropRecommendation | null>(null);
  const [compareList, setCompareList] = useState<CropRecommendation[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (crop: CropRecommendation) => {
    if (compareList.some((c) => c.id === crop.id)) {
      setCompareList(compareList.filter((c) => c.id !== crop.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, crop]);
      }
    }
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-[#e2f3e8] text-[#1e7a46] border-[#b6e4c7]';
    if (score >= 80) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (score >= 75) return 'bg-teal-50 text-teal-800 border-teal-200';
    return 'bg-blue-50 text-blue-800 border-blue-200';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching reference image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Best Crops for Your Farm</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Based on your location ({farm.region}, {farm.country}), {farm.soilType.toLowerCase()} soil, climate, and {farm.mainGoal.toLowerCase()} goal.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Scale className="w-4 h-4" />
            <span>Compare Selected ({compareList.length})</span>
          </button>
        )}
      </div>

      {/* Ranked Crop Cards Grid */}
      <div className="space-y-4">
        {recommendations.map((crop) => {
          const isComparing = compareList.some((c) => c.id === crop.id);

          return (
            <div
              key={crop.id}
              className="bg-white border border-slate-200/80 hover:border-emerald-300 rounded-2xl p-5 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
            >
              {/* Left Column: Image + Info */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-inner bg-slate-100 border border-gray-100">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold text-gray-900">{crop.name}</h3>
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${getScoreBadgeColor(
                        crop.suitabilityScore
                      )}`}
                    >
                      {crop.suitabilityScore}%
                    </span>
                  </div>

                  {/* Bullet points matching reference screenshot exactly */}
                  <ul className="text-xs text-gray-600 space-y-1">
                    {crop.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-2.5 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => toggleCompare(crop)}
                  title="Compare crop"
                  className={`p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                    isComparing
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSelectedCropModal(crop)}
                  className="px-5 py-2.5 rounded-xl bg-[#154734] hover:bg-[#1a553e] text-white font-semibold text-xs transition-all shadow-sm active:scale-95 whitespace-nowrap"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom controls matching screenshot */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
        >
          Back
        </button>

        <button
          onClick={() => onSelectCropPlan('Tomato')}
          className="px-6 py-2.5 rounded-xl bg-[#154734] hover:bg-[#1a553e] text-white text-xs font-semibold shadow-md active:scale-95 transition-all flex items-center gap-2"
        >
          <span>Select Crop & View Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Detailed Crop Modal */}
      {selectedCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCropModal.imageUrl}
                  alt={selectedCropModal.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedCropModal.name}</h3>
                  <p className="text-xs text-gray-500 italic">
                    {selectedCropModal.scientificName} • {selectedCropModal.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCropModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <p className="text-gray-500 font-medium">Suitability Score</p>
                  <p className="text-lg font-extrabold text-emerald-800 mt-0.5">
                    {selectedCropModal.suitabilityScore}%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-gray-500 font-medium">Estimated Growing Cycle</p>
                  <p className="text-sm font-bold text-gray-800 mt-1">
                    {selectedCropModal.durationMonths} ({selectedCropModal.durationDays} days)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-gray-800">Agronomic Suitability Factors</p>
                <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-gray-700">
                  <p>• {selectedCropModal.soilCompatibility}</p>
                  <p>• {selectedCropModal.climateMatch}</p>
                  <p>• Water requirement: {selectedCropModal.waterRequirement}</p>
                  <p>• Planting window: {selectedCropModal.plantingWindow}</p>
                  <p>• Expected yield range: {selectedCropModal.expectedYieldPerHa}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">Key Field Risks to Monitor</p>
                <ul className="list-disc pl-4 space-y-1 text-amber-800">
                  {selectedCropModal.majorRisks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-gray-800 mb-1">Recommended Alternatives</p>
                <div className="flex gap-2">
                  {selectedCropModal.alternativeCrops.map((alt, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedCropModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-600 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCropModal(null);
                  onSelectCropPlan(selectedCropModal.name);
                }}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold text-xs shadow-sm"
              >
                Adopt {selectedCropModal.name} Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Crop Comparison Matrix</h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareList.map((crop) => (
                <div key={crop.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                    <img src={crop.imageUrl} alt={crop.name} className="w-8 h-8 rounded-lg object-cover" />
                    <span>{crop.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Suitability:</span>
                    <span className="font-bold text-emerald-800 ml-1">{crop.suitabilityScore}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold text-gray-800 ml-1">{crop.durationMonths}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Water Need:</span>
                    <span className="font-semibold text-gray-800 ml-1">{crop.waterRequirement}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Market Demand:</span>
                    <span className="font-semibold text-gray-800 ml-1">{crop.marketDemand}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Est. Cost / ha:</span>
                    <span className="font-semibold text-gray-800 ml-1">${crop.estimatedCostPerHa}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCompareModal(false);
                      onSelectCropPlan(crop.name);
                    }}
                    className="w-full mt-2 py-2 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-900"
                  >
                    Select {crop.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
