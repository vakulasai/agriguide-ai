'use client';

import React, { useState } from 'react';
import {
  CloudSun,
  Sun,
  CloudRain,
  Cloud,
  Droplets,
  Wind,
  Compass,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { WeatherData } from '@/types';

interface WeatherViewProps {
  weather: WeatherData;
  onRefreshWeather?: () => void;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ weather, onRefreshWeather }) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return Sun;
      case 'CloudRain':
        return CloudRain;
      case 'Cloud':
        return Cloud;
      case 'CloudSun':
      default:
        return CloudSun;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching reference image Panel 7 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Weather Information</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Forecast Location: {weather.location}, {weather.country} • Updated: {weather.updatedAt}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
            7 Day Forecast
          </span>
          {onRefreshWeather && (
            <button
              onClick={onRefreshWeather}
              className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl border border-gray-200 transition-colors"
              title="Refresh live forecast"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 7-Day Forecast Cards Row matching screenshot Panel 7 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {weather.dailyForecast.map((day, idx) => {
          const Icon = getWeatherIcon(day.iconName);
          const isSelected = selectedDay === idx;

          return (
            <div
              key={idx}
              onClick={() => setSelectedDay(idx)}
              className={`bg-white border rounded-2xl p-4 text-center cursor-pointer transition-all shadow-xs flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-100 shadow-sm'
                  : 'border-slate-200/80 hover:border-emerald-300'
              }`}
            >
              <p className="text-xs font-bold text-gray-900">{day.dayName}</p>

              <div className="my-3 flex justify-center text-amber-500">
                <Icon
                  className={`w-8 h-8 ${
                    day.iconName === 'Sun'
                      ? 'text-amber-500'
                      : day.iconName === 'CloudRain'
                      ? 'text-sky-500'
                      : 'text-amber-400'
                  }`}
                />
              </div>

              <div>
                <p className="text-xs font-bold text-gray-900">
                  {day.tempMax}° / {day.tempMin}°
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5 truncate">{day.condition}</p>
                <p className="text-[10px] text-sky-600 font-semibold mt-1">
                  {day.rainChance}% rain
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info Cards matching screenshot Panel 7 */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-3">Additional Info</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-2">
              <Droplets className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Humidity</p>
            <p className="text-base font-extrabold text-gray-900 mt-0.5">{weather.humidity}%</p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center mx-auto mb-2">
              <Wind className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Wind Speed</p>
            <p className="text-base font-extrabold text-gray-900 mt-0.5">
              {weather.windSpeed} km/h
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-2">
              <Compass className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Soil Moisture</p>
            <p className="text-base font-extrabold text-emerald-800 mt-0.5">
              {weather.soilMoisture}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <Sun className="w-5 h-5" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Radiation</p>
            <p className="text-base font-extrabold text-gray-900 mt-0.5">
              {weather.solarRadiation}
            </p>
          </div>
        </div>
      </div>

      {/* Weather-related Agronomic Farming Suggestions */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-3">Weather-Related Farming Advice</h3>
        <div className="space-y-2.5">
          {weather.farmingAdvice.map((advice, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-gray-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{advice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
