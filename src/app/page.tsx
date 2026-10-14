'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar, NavSection } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { HomeDashboard } from '@/components/dashboard/HomeDashboard';
import { MyFarmView } from '@/components/farm/MyFarmView';
import { CropPlannerView } from '@/components/crops/CropPlannerView';
import { CropCalendarView } from '@/components/calendar/CropCalendarView';
import { OrganicFarmingView } from '@/components/organic/OrganicFarmingView';
import { AIAssistantView } from '@/components/assistant/AIAssistantView';
import { CropHealthView } from '@/components/health/CropHealthView';
import { WeatherView } from '@/components/weather/WeatherView';
import { MarketPricesView } from '@/components/market/MarketPricesView';
import { CompleteCropPlanView } from '@/components/plan/CompleteCropPlanView';
import { SettingsView } from '@/components/settings/SettingsView';
import { NotificationsModal } from '@/components/common/NotificationsModal';
import { Farm, UpcomingTask, CropPlan, WeatherData } from '@/types';
import { DEFAULT_FARM, DEFAULT_TASKS, DEFAULT_TOMATO_PLAN } from '@/lib/farmStore';
import { getFallbackWeatherData } from '@/lib/weatherService';
import { getRankedCropRecommendations } from '@/lib/cropRecommendationEngine';

export default function AgriGuideApp() {
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Core Persistent Application State
  const [farm, setFarm] = useState<Farm>(DEFAULT_FARM);
  const [tasks, setTasks] = useState<UpcomingTask[]>(DEFAULT_TASKS);
  const [cropPlan, setCropPlan] = useState<CropPlan>(DEFAULT_TOMATO_PLAN);
  const [weather, setWeather] = useState<WeatherData>(getFallbackWeatherData());
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('KSh');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Initial load from server APIs
  useEffect(() => {
    async function loadInitialData() {
      try {
        // 1. Fetch Farm
        const farmRes = await fetch('/api/farm');
        if (farmRes.ok) {
          const data = await farmRes.json();
          if (data.farm) setFarm(data.farm);
        }

        // 2. Fetch Tasks
        const tasksRes = await fetch('/api/tasks');
        if (tasksRes.ok) {
          const data = await tasksRes.json();
          if (data.tasks) setTasks(data.tasks);
        }

        // 3. Fetch Weather
        const weatherRes = await fetch('/api/weather');
        if (weatherRes.ok) {
          const data = await weatherRes.json();
          if (data.weather) setWeather(data.weather);
        }
      } catch (err) {
        console.warn('Initial background load failed, using local fallback state:', err);
      }
    }

    loadInitialData();
  }, []);

  // Handlers for farm state
  const handleSaveFarm = async (updatedFarm: Farm) => {
    setFarm(updatedFarm);
    try {
      await fetch('/api/farm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFarm),
      });
    } catch (err) {
      console.error('Failed to sync farm to API:', err);
    }
  };

  // Handlers for tasks
  const handleToggleTask = async (taskId: string) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    const target = updated.find((t) => t.id === taskId);
    try {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, completed: target?.completed }),
      });
    } catch (err) {
      console.error('Failed to sync task toggle:', err);
    }
  };

  const handleAddTask = async (
    title: string,
    time: string,
    category: UpcomingTask['category']
  ) => {
    const newTask: UpcomingTask = {
      id: `task-${Date.now()}`,
      title,
      time,
      category,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, time, category }),
      });
    } catch (err) {
      console.error('Failed to sync added task:', err);
    }
  };

  const handleAddCalendarTask = (taskTitle: string, category: string) => {
    handleAddTask(taskTitle, 'Tomorrow • 9:00 AM', category as any);
  };

  // Recommendations calculated based on current farm profile
  const cropRecommendations = getRankedCropRecommendations(farm, weather.currentTemp);

  return (
    <div className="flex min-h-screen bg-[#f4f8f5] text-slate-900">
      {/* 1. Deep forest-green Sidebar matching reference */}
      <Sidebar
        currentSection={currentSection}
        onNavigate={(sec) => setCurrentSection(sec)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Bar matching reference */}
        <TopBar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          farm={farm}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenAssistant={() => setCurrentSection('ai-assistant')}
          onNavigateToSettings={() => setCurrentSection('settings')}
          userName="John Doe"
          userRole="Farmer"
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-8 pt-2">
          {currentSection === 'home' && (
            <HomeDashboard
              farm={farm}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onNavigate={(sec) => setCurrentSection(sec)}
              weather={weather}
            />
          )}

          {currentSection === 'my-farm' && (
            <MyFarmView farm={farm} onSaveFarm={handleSaveFarm} />
          )}

          {currentSection === 'crop-planner' && (
            <CropPlannerView
              farm={farm}
              recommendations={cropRecommendations}
              onSelectCropPlan={(cropName) => {
                setCropPlan({ ...cropPlan, cropName });
                setCurrentSection('crop-plan-details');
              }}
              onNavigate={(sec) => setCurrentSection(sec)}
            />
          )}

          {currentSection === 'calendar' && (
            <CropCalendarView
              plan={cropPlan}
              onUpdateTasks={(updated) => setCropPlan({ ...cropPlan, tasks: updated })}
            />
          )}

          {currentSection === 'organic' && <OrganicFarmingView />}

          {currentSection === 'ai-assistant' && (
            <AIAssistantView onAddCalendarTask={handleAddCalendarTask} />
          )}

          {currentSection === 'crop-health' && (
            <CropHealthView onAddCalendarTask={handleAddCalendarTask} />
          )}

          {currentSection === 'weather' && (
            <WeatherView
              weather={weather}
              onRefreshWeather={async () => {
                const res = await fetch('/api/weather');
                if (res.ok) {
                  const data = await res.json();
                  if (data.weather) setWeather(data.weather);
                }
              }}
            />
          )}

          {currentSection === 'market-prices' && (
            <MarketPricesView country={farm.country} region={farm.region} />
          )}

          {currentSection === 'crop-plan-details' && (
            <CompleteCropPlanView
              plan={cropPlan}
              onNavigate={(sec) => setCurrentSection(sec)}
              onUpdateBudget={(budget) => setCropPlan({ ...cropPlan, budget })}
            />
          )}

          {currentSection === 'settings' && (
            <SettingsView
              language={language}
              onLanguageChange={setLanguage}
              currency={currency}
              onCurrencyChange={setCurrency}
              unitSystem={unitSystem}
              onUnitSystemChange={setUnitSystem}
            />
          )}
        </main>
      </div>

      {/* Notifications Modal Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToCalendar={() => {
          setIsNotificationsOpen(false);
          setCurrentSection('calendar');
        }}
        onNavigateToWeather={() => {
          setIsNotificationsOpen(false);
          setCurrentSection('weather');
        }}
      />
    </div>
  );
}
