'use client';

import React from 'react';
import {
  Menu,
  Bell,
  Search,
  Sparkles,
  ChevronDown,
  User,
  CheckCircle2,
  Calendar,
  CloudRain
} from 'lucide-react';
import { Farm } from '@/types';

interface TopBarProps {
  onToggleSidebar: () => void;
  farm: Farm;
  onOpenNotifications: () => void;
  onOpenAssistant: () => void;
  onNavigateToSettings: () => void;
  userName?: string;
  userRole?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onToggleSidebar,
  farm,
  onOpenNotifications,
  onOpenAssistant,
  onNavigateToSettings,
  userName = 'John Doe',
  userRole = 'Farmer'
}) => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenAssistant();
    }
  };

  return (
    <header className="bg-transparent py-4 px-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Greeting and Subtitle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-white border border-emerald-100 text-emerald-800 shadow-sm hover:bg-emerald-50"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 tracking-tight">
            Good Morning, Farmer!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Let's make your farm more productive and sustainable.
          </p>
        </div>
      </div>

      {/* Right: Search / Actions / Profile */}
      <div className="flex items-center gap-3 self-end md:self-auto">
        {/* Quick Ask AI Search bar */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask AI or search crops..."
            className="w-56 lg:w-64 pl-9 pr-8 py-2 bg-white text-xs text-gray-700 rounded-full border border-gray-200/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all placeholder:text-gray-400"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <button
            type="button"
            onClick={onOpenAssistant}
            title="Ask AI Farming Assistant"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-full bg-white border border-gray-200/80 shadow-sm text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors"
          title="Notifications & Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </button>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-white border border-gray-200/80 shadow-sm hover:border-emerald-300 transition-all"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-emerald-700 flex items-center justify-center text-white font-semibold text-xs border border-emerald-400">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="John Doe"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-gray-900 leading-tight">{userName}</p>
              <p className="text-[11px] text-gray-500 leading-tight">{userRole}</p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50 text-xs">
              <div className="px-3.5 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-gray-500 text-[11px]">farmer@agriguide.ai</p>
                <p className="text-emerald-700 text-[10px] font-medium mt-1">Farm: {farm.name}</p>
              </div>
              <button
                onClick={() => {
                  onNavigateToSettings();
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 text-gray-700 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Account & Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
