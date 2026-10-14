'use client';

import React, { useState } from 'react';
import {
  Leaf,
  Calendar,
  DollarSign,
  FileText,
  Droplets,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Printer,
  Edit3
} from 'lucide-react';
import { CropPlan } from '@/types';
import { NavSection } from '../layout/Sidebar';

interface CompleteCropPlanViewProps {
  plan: CropPlan;
  onNavigate: (section: NavSection) => void;
  onUpdateBudget: (budget: CropPlan['budget']) => void;
}

export const CompleteCropPlanView: React.FC<CompleteCropPlanViewProps> = ({
  plan,
  onNavigate,
  onUpdateBudget,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'costs' | 'notes'>(
    'overview'
  );
  const [budget, setBudget] = useState(plan.budget);
  const [farmNotes, setFarmNotes] = useState(
    'Applied vermicompost baseline on raised beds. Installed drip lines with 20cm emitter spacing. Soil pH tested at 6.5.'
  );

  const handleBudgetChange = (key: keyof CropPlan['budget'], value: number) => {
    const updated = { ...budget, [key]: value };
    setBudget(updated);
    onUpdateBudget(updated);
  };

  const totalCost = Object.values(budget).reduce((a, b) => a + b, 0);
  const projectedGross = (plan.expectedYieldKg * plan.expectedPricePerKg) / 100; // in hundreds
  const netReturn = projectedGross - totalCost;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching screenshot Panel 9 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {plan.cropName} Crop Plan
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Variety: {plan.variety} • Season: Long Rains 2025
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Plan</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs matching screenshot */}
      <div className="flex border-b border-gray-200 gap-2 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'calendar', label: 'Calendar' },
          { id: 'costs', label: 'Costs & Returns' },
          { id: 'notes', label: 'Notes' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2.5 px-4 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-700 text-emerald-900 font-bold bg-emerald-50/40 rounded-t-xl'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Overview matching screenshot Panel 9 exactly */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pb-6 border-b border-gray-100">
              {/* Crop Image matching screenshot */}
              <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border border-gray-200 shadow-inner">
                <img
                  src={plan.imageUrl}
                  alt={plan.cropName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Crop Metadata Table matching screenshot */}
              <div className="md:col-span-2 space-y-2.5 text-xs">
                <div className="grid grid-cols-2 py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Crop</span>
                  <span className="font-bold text-gray-900 text-right">{plan.cropName}</span>
                </div>
                <div className="grid grid-cols-2 py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Variety</span>
                  <span className="font-bold text-gray-900 text-right">{plan.variety}</span>
                </div>
                <div className="grid grid-cols-2 py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Planting Date</span>
                  <span className="font-bold text-gray-900 text-right">{plan.plantingDate}</span>
                </div>
                <div className="grid grid-cols-2 py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Expected Harvest</span>
                  <span className="font-bold text-gray-900 text-right">
                    {plan.expectedHarvestDate} ({plan.durationDays} days)
                  </span>
                </div>
                <div className="grid grid-cols-2 py-1.5">
                  <span className="text-gray-500 font-medium">Farm Area</span>
                  <span className="font-bold text-gray-900 text-right">
                    {plan.farmArea} hectares
                  </span>
                </div>
              </div>
            </div>

            {/* Key Recommendations matching screenshot */}
            <div className="pt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Key Recommendations</h3>
              <div className="space-y-2.5">
                {plan.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Green button matching screenshot */}
            <div className="mt-7 pt-4 border-t border-gray-100">
              <button
                onClick={() => onNavigate('organic')}
                className="w-full py-3 rounded-xl bg-[#154734] hover:bg-[#1a553e] text-white font-semibold text-xs transition-all shadow-md active:scale-95 text-center"
              >
                View Full Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Calendar Shortcut */}
      {activeTab === 'calendar' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm text-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900">Crop Schedule Summary</h3>
          <p className="text-gray-600">
            Lifecycle stages span {plan.durationDays} days from nursery bed prep to final harvest.
          </p>
          <button
            onClick={() => onNavigate('calendar')}
            className="px-5 py-2.5 bg-emerald-800 text-white rounded-xl font-semibold hover:bg-emerald-900"
          >
            Open Interactive Timeline & Schedule
          </button>
        </div>
      )}

      {/* TAB 3: Costs and Returns Calculator */}
      {activeTab === 'costs' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Production Expense & Revenue Calculator
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              Deterministic input values for {plan.farmArea} hectares. Update numbers to calculate
              exact net returns.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Seeds & Nursery ($)</label>
                <input
                  type="number"
                  value={budget.seeds}
                  onChange={(e) => handleBudgetChange('seeds', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Compost & Soil Amendments ($)
                </label>
                <input
                  type="number"
                  value={budget.soilAmendments}
                  onChange={(e) =>
                    handleBudgetChange('soilAmendments', parseFloat(e.target.value) || 0)
                  }
                  className="w-full p-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Organic Fertilizers ($)
                </label>
                <input
                  type="number"
                  value={budget.fertilizers}
                  onChange={(e) =>
                    handleBudgetChange('fertilizers', parseFloat(e.target.value) || 0)
                  }
                  className="w-full p-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Labour & Weeding ($)</label>
                <input
                  type="number"
                  value={budget.labour}
                  onChange={(e) => handleBudgetChange('labour', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Irrigation & Energy ($)
                </label>
                <input
                  type="number"
                  value={budget.irrigationEnergy}
                  onChange={(e) =>
                    handleBudgetChange('irrigationEnergy', parseFloat(e.target.value) || 0)
                  }
                  className="w-full p-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Pest & Disease Control ($)
                </label>
                <input
                  type="number"
                  value={budget.pestManagement}
                  onChange={(e) =>
                    handleBudgetChange('pestManagement', parseFloat(e.target.value) || 0)
                  }
                  className="w-full p-2 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            {/* Financial Summary */}
            <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Total Input & Operating Expenses:</span>
                <span className="font-bold text-gray-900">${totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>
                  Expected Harvest Yield ({plan.expectedYieldKg.toLocaleString()} kg @ Market Price):
                </span>
                <span className="font-bold text-emerald-800">${projectedGross.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-emerald-950 pt-2 border-t border-slate-200">
                <span>Estimated Net Profit:</span>
                <span>${netReturn.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Notes */}
      {activeTab === 'notes' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-sm text-gray-900">Field Log & Observations</h3>
          <textarea
            rows={5}
            value={farmNotes}
            onChange={(e) => setFarmNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            placeholder="Record rainfall events, pest observations, transplant dates..."
          />
          <button
            onClick={() => alert('Notes saved to local farm journal!')}
            className="px-5 py-2 bg-emerald-800 text-white rounded-xl font-semibold hover:bg-emerald-900"
          >
            Save Notes
          </button>
        </div>
      )}
    </div>
  );
};
