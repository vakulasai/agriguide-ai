'use client';

import React from 'react';
import {
  LayoutDashboard,
  Sprout,
  Compass,
  Calendar,
  Leaf,
  Bot,
  ScanLine,
  CloudSun,
  TrendingUp,
  Settings,
  Globe,
  ChevronDown,
  X
} from 'lucide-react';

export type NavSection =
  | 'home'
  | 'my-farm'
  | 'crop-planner'
  | 'calendar'
  | 'organic'
  | 'ai-assistant'
  | 'crop-health'
  | 'weather'
  | 'market-prices'
  | 'settings'
  | 'crop-plan-details';

interface SidebarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  isOpen: boolean;
  onClose: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onNavigate,
  isOpen,
  onClose,
  language,
  onLanguageChange
}) => {
  const [showLangMenu, setShowLangMenu] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'my-farm', label: 'My Farm', icon: Sprout },
    { id: 'crop-planner', label: 'Crop Planner', icon: Compass },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'organic', label: 'Organic Farming', icon: Leaf },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'crop-health', label: 'Crop Health', icon: ScanLine },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'market-prices', label: 'Market Prices', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'sw', label: 'Kiswahili' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ];

  const handleSelectNav = (id: string) => {
    onNavigate(id as NavSection);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#154734] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-emerald-800/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400/40 shadow-inner">
                <Leaf className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight text-white leading-none">
                  AgriGuide AI
                </h1>
                <p className="text-[11px] text-emerald-300/80 mt-1 font-medium">
                  Smart Farming, Better Tomorrow.
                </p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-800/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id || (item.id === 'crop-planner' && currentSection === 'crop-plan-details');

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#22694f] text-white shadow-sm font-semibold'
                      : 'text-emerald-100/85 hover:bg-[#1a553e] hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Language Selector */}
        <div className="p-4 border-t border-emerald-800/40 relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#113d2c] hover:bg-[#19523c] text-emerald-200 text-xs font-medium transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{languages.find((l) => l.code === language)?.label || 'English'}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>

          {showLangMenu && (
            <div className="absolute bottom-16 left-4 right-4 bg-[#0e3525] border border-emerald-800 rounded-lg shadow-xl py-1 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-800/60 ${
                    language === lang.code ? 'text-emerald-300 font-semibold bg-emerald-800/40' : 'text-emerald-100'
                  }`}
                >
                  {lang.label}
                  {language === lang.code && <span className="text-emerald-400">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
