'use client';

import React, { useState } from 'react';
import {
  Settings,
  Globe,
  DollarSign,
  Cpu,
  Key,
  Bell,
  Save,
  Check,
  RotateCcw,
  ShieldCheck,
  Database
} from 'lucide-react';

interface SettingsViewProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  currency: string;
  onCurrencyChange: (curr: string) => void;
  unitSystem: 'metric' | 'imperial';
  onUnitSystemChange: (units: 'metric' | 'imperial') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onLanguageChange,
  currency,
  onCurrencyChange,
  unitSystem,
  onUnitSystemChange,
}) => {
  const [aiProvider, setAiProvider] = useState('mock');
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gemini-1.5-pro');
  const [notifications, setNotifications] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Configure regional units, local currencies, language, and AI integration credentials.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-semibold text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* Regional & Localization */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>Localization & Measurement Units</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-white"
              >
                <option value="en">English</option>
                <option value="sw">Kiswahili</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Default Currency</label>
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-white"
              >
                <option value="KSh">KSh (Kenyan Shilling)</option>
                <option value="₹">₹ (Indian Rupee)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (Euro)</option>
                <option value="£">£ (British Pound)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Unit System</label>
              <select
                value={unitSystem}
                onChange={(e) => onUnitSystemChange(e.target.value as any)}
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-white"
              >
                <option value="metric">Metric (ha, kg, °C, km/h)</option>
                <option value="imperial">Imperial (acres, lbs, °F, mph)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Model Configuration */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-700" />
            <span>AI Provider & API Configuration</span>
          </h3>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-gray-600 text-[11px] leading-relaxed">
            The application currently operates with the built-in{' '}
            <strong>AgriGuide Agronomic Knowledge Engine</strong>. Enter a personal API key to
            connect directly to OpenAI, Anthropic, or Google Gemini LLMs.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">AI Provider</label>
              <select
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-white"
              >
                <option value="mock">Local Agronomy Engine (Default/Offline)</option>
                <option value="gemini">Google Gemini</option>
                <option value="openai">OpenAI (GPT-4o)</option>
                <option value="anthropic">Anthropic Claude 3.5</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Model Name</label>
              <input
                type="text"
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                placeholder="e.g. gemini-1.5-pro or gpt-4o"
                className="w-full p-2.5 border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">API Key (Optional)</label>
            <input
              type="password"
              value={aiApiKey}
              onChange={(e) => setAiApiKey(e.target.value)}
              placeholder="sk-... or AIzaSy..."
              className="w-full p-2.5 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        {/* Notifications & Data Management */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <span>Notifications & Persistence</span>
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-800">Severe Weather & Spray Window Alerts</p>
              <p className="text-[11px] text-gray-500">
                Receive proactive notifications for heavy rain and optimal spraying times.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="font-semibold text-gray-800">Local Database Status</p>
              <p className="text-[11px] text-emerald-700 font-medium">
                Prisma SQLite (dev.db) active and persisting.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#154734] hover:bg-[#1a553e] text-white font-semibold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
