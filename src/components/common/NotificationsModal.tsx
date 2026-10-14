'use client';

import React from 'react';
import { Bell, CloudRain, CheckCircle, AlertTriangle, Calendar, X } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCalendar: () => void;
  onNavigateToWeather: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigateToCalendar,
  onNavigateToWeather,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Optimal Spraying Window Tomorrow',
      message: 'Calm morning conditions predicted before Wednesday rain. Good window for organic neem foliar spray.',
      type: 'weather',
      time: '1 hour ago',
      action: onNavigateToWeather,
      actionLabel: 'Check Weather',
    },
    {
      id: 'n2',
      title: 'Upcoming Task Due: Apply Organic Compost',
      message: 'Scheduled for Today at 2:00 PM for Green Valley Farm field #1.',
      type: 'calendar',
      time: '3 hours ago',
      action: onNavigateToCalendar,
      actionLabel: 'View Task',
    },
    {
      id: 'n3',
      title: 'Market Price Update: Maize +5%',
      message: 'Wholesale prices rose to KSh 72/kg at Nairobi Wakulima terminal.',
      type: 'market',
      time: 'Yesterday',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/30 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-200 mt-12 sm:mt-14">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-sm text-gray-900">Notifications & Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-gray-900">{n.title}</p>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
              </div>
              <p className="text-gray-600 mt-1 leading-relaxed">{n.message}</p>
              {n.action && (
                <button
                  onClick={() => {
                    n.action!();
                    onClose();
                  }}
                  className="mt-2 text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  {n.actionLabel} →
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
          <button
            onClick={onClose}
            className="text-xs text-gray-500 font-medium hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
