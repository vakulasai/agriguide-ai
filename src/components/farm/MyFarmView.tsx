'use client';

import React, { useState } from 'react';
import {
  Sprout,
  Layers,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Save,
  UploadCloud,
  FileText,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { Farm } from '@/types';

interface MyFarmViewProps {
  farm: Farm;
  onSaveFarm: (updatedFarm: Farm) => Promise<void>;
}

export const MyFarmView: React.FC<MyFarmViewProps> = ({ farm, onSaveFarm }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<Farm>({ ...farm });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [unknownSoil, setUnknownSoil] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const countries = [
    { name: 'Kenya', regions: ['Nairobi', 'Kiambu', 'Nakuru', 'Uasin Gishu', 'Machakos', 'Kisumu'] },
    { name: 'India', regions: ['Karnataka', 'Maharashtra', 'Punjab', 'Haryana', 'Andhra Pradesh', 'Tamil Nadu', 'Uttar Pradesh'] },
    { name: 'United States', regions: ['California', 'Iowa', 'Illinois', 'Nebraska', 'Texas', 'Kansas'] },
    { name: 'Nigeria', regions: ['Kano', 'Kaduna', 'Oyo', 'Benue', 'Ogun'] },
    { name: 'Brazil', regions: ['Mato Grosso', 'Paraná', 'Rio Grande do Sul', 'Goiás'] },
  ];

  const handleCountryChange = (countryName: string) => {
    const selected = countries.find((c) => c.name === countryName);
    setFormData((prev) => ({
      ...prev,
      country: countryName,
      region: selected?.regions[0] || 'Default Region',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onSaveFarm(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to save farm details:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const steps = [
    { number: 1, label: 'Farm Details' },
    { number: 2, label: 'Soil Info' },
    { number: 3, label: 'Crop Preferences' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Tell us about your farm</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          This helps us give you personalized advice on crop selection, irrigation, and soil management.
        </p>
      </div>

      {/* Step Indicator matching reference UI */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-gray-200 z-0" />
          <div
            className="absolute top-1/2 left-8 -translate-y-1/2 h-0.5 bg-emerald-600 transition-all duration-300 z-0"
            style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
          />

          {steps.map((s) => {
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setCurrentStep(s.number as any)}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-[#154734] text-white ring-4 ring-emerald-100'
                      : 'bg-white border-2 border-gray-300 text-gray-400 group-hover:border-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.number}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    isCurrent ? 'text-emerald-900 font-bold' : 'text-gray-500'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Farm information saved successfully! Recommendations updated.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Farm Details */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
                1. General Farm Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Farm Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Green Valley Farm"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                  >
                    {countries.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Region / State
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="e.g. Nairobi or Karnataka"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Total Cultivated Area
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      required
                      value={formData.totalArea}
                      onChange={(e) =>
                        setFormData({ ...formData, totalArea: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                    />
                    <select
                      value={formData.areaUnit}
                      onChange={(e) =>
                        setFormData({ ...formData, areaUnit: e.target.value as 'hectares' | 'acres' })
                      }
                      className="px-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                    >
                      <option value="hectares">hectares</option>
                      <option value="acres">acres</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    District or Sub-county (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.district || ''}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="e.g., Kiambu Border or Central Ward"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Soil Information */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="text-base font-bold text-gray-900">2. Soil Testing & Quality</h3>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={unknownSoil}
                    onChange={(e) => setUnknownSoil(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Mark soil details as unknown</span>
                </label>
              </div>

              {!unknownSoil ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Soil Type
                      </label>
                      <select
                        value={formData.soilType}
                        onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                      >
                        <option value="Loam">Loam (Balanced & Fertile)</option>
                        <option value="Clay">Clay (Heavy & Moisture Retentive)</option>
                        <option value="Sandy Loam">Sandy Loam (Quick Draining)</option>
                        <option value="Silt">Silt (Fine textured)</option>
                        <option value="Peaty">Peaty (High Organic Carbon)</option>
                        <option value="Chalky">Chalky / Alkaline</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Soil pH (Optimal: 6.0 - 7.0)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="4.5"
                          max="9.0"
                          step="0.1"
                          value={formData.soilPh || 6.5}
                          onChange={(e) =>
                            setFormData({ ...formData, soilPh: parseFloat(e.target.value) })
                          }
                          className="flex-1 accent-emerald-700"
                        />
                        <span className="w-12 text-center text-xs font-bold px-2 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                          {formData.soilPh || 6.5}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Organic Matter
                      </label>
                      <select
                        value={formData.organicMatter || 'Medium'}
                        onChange={(e) => setFormData({ ...formData, organicMatter: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                      >
                        <option value="Low">Low (&lt; 1.5%)</option>
                        <option value="Medium">Medium (1.5% - 3.0%)</option>
                        <option value="High">High (&gt; 3.0%)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Nitrogen (N) Level
                      </label>
                      <select
                        value={formData.npk?.nitrogen || 'Adequate'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            npk: { ...formData.npk, nitrogen: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                      >
                        <option value="Low">Low</option>
                        <option value="Adequate">Adequate</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Phosphorus & Potassium
                      </label>
                      <select
                        value={formData.npk?.potassium || 'Good'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            npk: { ...formData.npk, potassium: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                      >
                        <option value="Deficient">Deficient</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Good">Optimal / Good</option>
                      </select>
                    </div>
                  </div>

                  {/* Soil Report File Upload Dropzone */}
                  <div className="border-2 border-dashed border-gray-300 hover:border-emerald-500 rounded-xl p-5 text-center transition-colors">
                    <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-gray-800">
                      Upload lab soil test report (PDF, JPG, PNG)
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Our AI will parse micronutrients, salinity, and cation exchange capacity.
                    </p>

                    <label className="mt-3 inline-block px-4 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-lg cursor-pointer transition-colors border border-emerald-200">
                      <span>{uploadedFileName || 'Choose Soil Report File'}</span>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setUploadedFileName(file.name);
                        }}
                      />
                    </label>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Using Regional Default Soil Baselines</span>
                  </div>
                  <p className="mt-1 text-amber-700 leading-relaxed">
                    We will estimate soil properties based on regional agricultural geological maps
                    for {formData.region}, {formData.country}. You can perform a soil test anytime
                    later to unlock customized amendment recommendations.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Growing Conditions & Preferences */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
                3. Growing Conditions & Farmer Goals
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Irrigation Type
                  </label>
                  <select
                    value={formData.irrigationType}
                    onChange={(e) =>
                      setFormData({ ...formData, irrigationType: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                  >
                    <option value="Rain-fed">Rain-fed (Seasonal Rainfall)</option>
                    <option value="Drip irrigation">Drip irrigation (High Efficiency)</option>
                    <option value="Sprinkler">Sprinkler System</option>
                    <option value="Surface / Furrow">Surface / Furrow Basin</option>
                    <option value="Canal">Canal / Flood Inflow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Main Farming Goal
                  </label>
                  <select
                    value={formData.mainGoal}
                    onChange={(e) =>
                      setFormData({ ...formData, mainGoal: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                  >
                    <option value="Higher Yield">Higher Yield & Biomass</option>
                    <option value="Maximize Profit">Maximize Profit & Market Margins</option>
                    <option value="Organic Transition">Organic Transition & Regeneration</option>
                    <option value="Water Conservation">Water Conservation</option>
                    <option value="Risk Reduction">Risk Reduction & Low Volatility</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Farming Experience
                  </label>
                  <select
                    value={formData.farmingExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, farmingExperience: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                  >
                    <option value="Beginner">Beginner (&lt; 2 years)</option>
                    <option value="Intermediate">Intermediate (2–5 years)</option>
                    <option value="Experienced">Experienced (&gt; 5 years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Farming Practice
                  </label>
                  <select
                    value={formData.farmingPractice}
                    onChange={(e) =>
                      setFormData({ ...formData, farmingPractice: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                  >
                    <option value="Conventional">Conventional with Synthetic Inputs</option>
                    <option value="Transitioning to Organic">Transitioning to Organic</option>
                    <option value="Certified Organic">Certified Organic</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((currentStep - 1) as any)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((currentStep + 1) as any)}
                  className="px-6 py-2.5 rounded-xl bg-[#154734] hover:bg-[#1a553e] text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-7 py-2.5 rounded-xl bg-[#154734] hover:bg-[#1a553e] text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
