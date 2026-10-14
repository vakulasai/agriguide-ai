'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Sparkles,
  Camera,
  RefreshCw,
  Info,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { CropHealthAnalysis } from '@/types';

interface CropHealthViewProps {
  onAddCalendarTask?: (title: string, category: string) => void;
}

export const CropHealthView: React.FC<CropHealthViewProps> = ({ onAddCalendarTask }) => {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedPart, setSelectedPart] = useState('Leaf');
  const [userSymptoms, setUserSymptoms] = useState('Yellow spots on leaves with brown dry edges');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Default calibrated sample matching the reference image Panel 6
  const [analysis, setAnalysis] = useState<CropHealthAnalysis>({
    id: 'health-blight-1',
    cropName: 'Tomato',
    plantPart: 'Leaf',
    imageUrl:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    detectedCondition: 'Early Blight (Tomato)',
    conditionType: 'Disease',
    confidence: 87,
    symptoms: ['Yellow spots on leaves', 'Brown edges', 'May spread to stems'],
    recommendedActions: [
      'Remove infected leaves',
      'Use neem oil (organic)',
      'Improve air circulation',
    ],
    organicTreatment: [
      'Cold-pressed Neem Oil spray (5ml/L) with soap emulsifier',
      'Trichoderma harzianum soil and root collar drench',
      'Copper Hydroxide organic formulation if pathogen pressure exceeds threshold',
    ],
    prevention: [
      'Avoid overhead watering; use drip lines at base',
      'Sterilize pruning shears between rows with 70% alcohol',
      'Rotate away from Solanaceae family for 2 seasons',
    ],
    requiresExpert: false,
    analyzedAt: 'Apr 28, 2025',
    userNotes: 'Observed yellow necrotic patches spreading inward from lower leaf tips.',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    // Simulate real AI vision inference processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysis({
        ...analysis,
        cropName: selectedCrop,
        plantPart: selectedPart,
        analyzedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      });
    }, 1200);
  };

  const handleAddToCalendar = () => {
    if (onAddCalendarTask) {
      onAddCalendarTask(`Apply organic neem spray for ${analysis.detectedCondition}`, 'Pest Control');
    }
    setAddedNotice('✓ Added to Crop Calendar: "Apply organic neem spray"');
    setTimeout(() => setAddedNotice(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching screenshot Panel 6 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Scan Your Crop</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Upload a photo of your plant and get instant analysis.
        </p>
      </div>

      {addedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-semibold text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{addedNotice}</span>
        </div>
      )}

      {/* Main 2-column Diagnosis Container matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Image Preview & Upload Controls */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Image Preview Box matching screenshot */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-gray-200 shadow-inner group">
              {isAnalyzing ? (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin" />
                  <p className="text-xs font-bold text-gray-700">Analyzing plant foliage...</p>
                </div>
              ) : null}

              {/* Plant photograph showing yellow blight spots on leaves */}
              <img
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80"
                alt="Plant Leaf Scan"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[11px] font-medium">
                {analysis.cropName} • {analysis.plantPart}
              </div>
            </div>

            {/* Crop & Part Selection Controls */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Crop</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-xl bg-white"
                >
                  <option value="Tomato">Tomato</option>
                  <option value="Maize">Maize</option>
                  <option value="Beans">Beans</option>
                  <option value="Lettuce">Lettuce</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-1">Plant Part</label>
                <select
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-xl bg-white"
                >
                  <option value="Leaf">Leaf</option>
                  <option value="Stem">Stem</option>
                  <option value="Fruit">Fruit / Grain</option>
                  <option value="Root">Root Collar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Upload Button matching screenshot */}
          <div>
            <label className="w-full py-3 px-4 border border-gray-300 hover:border-emerald-600 bg-gray-50/70 hover:bg-emerald-50/30 text-gray-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs">
              <UploadCloud className="w-4 h-4 text-emerald-700" />
              <span>Upload New Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Right Column: Diagnosis Result Card matching screenshot */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-5">
            {/* Alert banner with red exclamation badge matching screenshot */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-900">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600 font-bold text-sm">
                !
              </div>
              <div>
                <p className="font-extrabold text-sm text-red-950">
                  Possible Disease Detected
                </p>
                <p className="text-xs font-bold text-red-900 mt-0.5">
                  {analysis.detectedCondition}
                </p>
                <p className="text-[11px] text-red-700 mt-0.5 font-medium">
                  Confidence: {analysis.confidence}%
                </p>
              </div>
            </div>

            {/* Symptoms list matching screenshot */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2">
                Symptoms:
              </h4>
              <ul className="text-xs text-gray-600 space-y-1.5">
                {analysis.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Action list matching screenshot */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2">
                Recommended Action:
              </h4>
              <ul className="text-xs text-gray-600 space-y-1.5">
                {analysis.recommendedActions.map((action, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action button matching screenshot */}
          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={handleAddToCalendar}
              className="w-full py-3 rounded-xl bg-[#154734] hover:bg-[#1a553e] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
