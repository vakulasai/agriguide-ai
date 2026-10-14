'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Bot,
  TrendingUp,
  Camera,
  Leaf,
  CheckCircle2,
  Circle,
  Plus,
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  ExternalLink,
  Sparkles,
  ArrowRight,
  BookOpen,
  Info
} from 'lucide-react';
import { Farm, UpcomingTask, WeatherData } from '@/types';
import { NavSection } from '../layout/Sidebar';
import { ORGANIC_FARMING_BENEFITS, ORGANIC_TRANSITION_STEPS } from '@/lib/agronomyData';

interface HomeDashboardProps {
  farm: Farm;
  tasks: UpcomingTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, time: string, category: UpcomingTask['category']) => void;
  onNavigate: (section: NavSection) => void;
  weather: WeatherData;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  farm,
  tasks,
  onToggleTask,
  onAddTask,
  onNavigate,
  weather,
}) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('Tomorrow • 10:00 AM');
  const [newTaskCategory, setNewTaskCategory] = useState<UpcomingTask['category']>('Fertilizer');
  const [showOrganicStepsModal, setShowOrganicStepsModal] = useState(false);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle, newTaskTime, newTaskCategory);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  const getCategoryColor = (category: UpcomingTask['category']) => {
    switch (category) {
      case 'Fertilizer':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Weather':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Irrigation':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pest Control':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Harvest':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Section: Farm Hero Card & Weather Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Farm Hero Banner (2 columns on desktop) */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm min-h-[220px] sm:min-h-[240px] flex flex-col justify-between p-6 sm:p-7 text-white bg-slate-800">
          {/* Farm Landscape Image & Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-emerald-100 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              Your Farm
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {farm.name}
            </h2>
            <div className="flex items-center gap-2 text-emerald-100 text-sm mt-1.5 font-medium">
              <MapPin className="w-4 h-4 text-emerald-300" />
              <span>
                {farm.country}, {farm.totalArea} {farm.areaUnit}
              </span>
              <span className="text-white/40">•</span>
              <span className="bg-emerald-800/60 px-2 py-0.5 rounded text-xs text-emerald-200">
                {farm.soilType} Soil
              </span>
            </div>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={() => onNavigate('my-farm')}
              className="px-5 py-2.5 bg-white text-emerald-900 font-semibold text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>View Farm Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </div>
        </div>

        {/* Current Weather Card */}
        <div
          onClick={() => onNavigate('weather')}
          className="rounded-2xl bg-white border border-slate-200/70 p-6 flex flex-col justify-between shadow-sm cursor-pointer hover:border-emerald-300 transition-all group"
        >
          <div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {weather.currentTemp}°C
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {weather.condition}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {weather.location}, {weather.country}
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                <CloudSun className="w-7 h-7" />
              </div>
            </div>

            {/* Live Indicator */}
            <div className="mt-4 flex items-center gap-1.5 text-[11px] text-gray-400">
              <span className={`w-2 h-2 rounded-full ${weather.isLive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
              <span>{weather.source}</span>
            </div>
          </div>

          {/* Weather Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
            <div className="bg-slate-50/80 p-2 rounded-xl">
              <p className="text-[11px] text-gray-500">Humidity</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{weather.humidity}%</p>
            </div>
            <div className="bg-slate-50/80 p-2 rounded-xl">
              <p className="text-[11px] text-gray-500">Rain Chance</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{weather.rainChance}%</p>
            </div>
            <div className="bg-slate-50/80 p-2 rounded-xl">
              <p className="text-[11px] text-gray-500">Wind</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: 4 Feature Shortcut Cards */}
      {/* IMPORTANT REQUIREMENT: Replace Crop Recommendations with "Organic Farming: Benefits & How to Do It" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Organic Farming: Benefits & How to Do It */}
        <div
          onClick={() => onNavigate('organic')}
          className="rounded-2xl bg-white border border-emerald-100 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="w-11 h-11 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-gray-900 text-sm group-hover:text-emerald-800 transition-colors">
                Organic Farming
              </h3>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                Guide
              </span>
            </div>
            <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">
              Benefits & 10-step beginner transition process for healthy soil and sustainable yields.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 group-hover:underline">
              Learn More
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: AI Assistant */}
        <div
          onClick={() => onNavigate('ai-assistant')}
          className="rounded-2xl bg-white border border-slate-200/70 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
              AI Assistant
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Ask anything about farming, soil testing, and calendars.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-600 group-hover:underline">
              Chat Now
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Market Prices */}
        <div
          onClick={() => onNavigate('market-prices')}
          className="rounded-2xl bg-white border border-slate-200/70 p-5 shadow-sm hover:shadow-md hover:border-sky-300 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm group-hover:text-sky-700 transition-colors">
              Market Prices
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Check current wholesale prices, trends, and selling advice.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-600 group-hover:underline">
              Check Trends
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Crop Health */}
        <div
          onClick={() => onNavigate('crop-health')}
          className="rounded-2xl bg-white border border-slate-200/70 p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm group-hover:text-amber-700 transition-colors">
              Crop Health
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Detect diseases from plant photos and get organic solutions.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600 group-hover:underline">
              Scan Leaves
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Upcoming Tasks & Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming Tasks (2 columns) */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/70 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-base">Upcoming Tasks</h3>
              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
                {tasks.filter((t) => !t.completed).length} pending
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
              <button
                onClick={() => onNavigate('calendar')}
                className="text-xs text-gray-500 hover:text-gray-800 font-medium"
              >
                View All
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                  task.completed
                    ? 'bg-gray-50/70 border-gray-200/60 opacity-60'
                    : 'bg-white border-gray-200/80 hover:border-emerald-300 hover:bg-emerald-50/20'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    className="text-emerald-600 hover:text-emerald-700 focus:outline-none"
                    aria-label={task.completed ? 'Mark incomplete' : 'Mark completed'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 hover:text-emerald-500" />
                    )}
                  </button>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{task.time}</p>
                  </div>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getCategoryColor(
                    task.category
                  )}`}
                >
                  {task.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips Card */}
        <div className="rounded-2xl bg-white border border-slate-200/70 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Quick Tips</h3>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/80 mt-2">
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                Use organic manure to improve soil health and increase yield naturally. Well-cured
                manure enriches beneficial soil bacteria and retains moisture.
              </p>
            </div>

            {/* Micro Highlight: Benefits shortcut */}
            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                Key Organic Principle
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Feeds the soil microbiome, not just the plant.</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Improves root aeration & drought tolerance.</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100">
            <button
              onClick={() => onNavigate('organic')}
              className="w-full py-2.5 rounded-xl border border-emerald-600 text-emerald-800 font-semibold text-xs hover:bg-emerald-50 active:scale-95 transition-all text-center"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Add Farm Activity</h3>
            <p className="text-xs text-gray-500 mb-4">
              Create an upcoming task to keep your farm schedule on track.
            </p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Apply organic compost or prune lower leaves"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Scheduled Time / Day
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Tomorrow • 8:00 AM or In 4 days"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none bg-white"
                >
                  <option value="Fertilizer">Fertilizer / Compost</option>
                  <option value="Irrigation">Irrigation / Watering</option>
                  <option value="Weather">Weather Scout</option>
                  <option value="Pest Control">Pest Control (Bio/Organic)</option>
                  <option value="Soil Prep">Soil Prep</option>
                  <option value="Harvest">Harvesting</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
