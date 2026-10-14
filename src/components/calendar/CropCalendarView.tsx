'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  Plus,
  Edit2,
  Trash2,
  Tractor,
  Sprout,
  Leaf,
  Flower2,
  Apple,
  ShoppingBag,
  Droplets,
  ShieldAlert,
  Clock,
  Check,
  X
} from 'lucide-react';
import { CalendarStage, CalendarTask, CropPlan } from '@/types';

interface CropCalendarViewProps {
  plan: CropPlan;
  onUpdateTasks: (tasks: CalendarTask[]) => void;
}

export const CropCalendarView: React.FC<CropCalendarViewProps> = ({ plan, onUpdateTasks }) => {
  const [tasks, setTasks] = useState<CalendarTask[]>(plan.tasks);
  const [isEditingTask, setIsEditingTask] = useState<CalendarTask | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newActivity, setNewActivity] = useState('');
  const [newDate, setNewDate] = useState('Jun 01, 2025');
  const [newDetails, setNewDetails] = useState('');
  const [newCategory, setNewCategory] = useState('Maintenance');

  const toggleTaskStatus = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    onUpdateTasks(updated);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingTask) return;
    const updated = tasks.map((t) => (t.id === isEditingTask.id ? isEditingTask : t));
    setTasks(updated);
    onUpdateTasks(updated);
    setIsEditingTask(null);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;
    const newTask: CalendarTask = {
      id: `task-${Date.now()}`,
      activity: newActivity,
      date: newDate,
      details: newDetails,
      icon: 'Leaf',
      category: newCategory,
      completed: false,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    onUpdateTasks(updated);
    setNewActivity('');
    setNewDetails('');
    setShowAddModal(false);
  };

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tractor':
        return Tractor;
      case 'Sprout':
        return Sprout;
      case 'Leaf':
        return Leaf;
      case 'Flower2':
        return Flower2;
      case 'Apple':
        return Apple;
      case 'ShoppingBag':
        return ShoppingBag;
      default:
        return Leaf;
    }
  };

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tractor':
        return Tractor;
      case 'Sprout':
        return Sprout;
      case 'Leaf':
        return Leaf;
      case 'Droplets':
        return Droplets;
      case 'ShieldAlert':
        return ShieldAlert;
      case 'ShoppingBag':
        return ShoppingBag;
      default:
        return Leaf;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching reference image Panel 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {plan.cropName} Growing Calendar{' '}
            <span className="text-sm font-normal text-gray-500">({plan.durationDays} days)</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Planting: {plan.plantingDate} • Expected Harvest: {plan.expectedHarvestDate}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-white border border-gray-300 hover:border-emerald-500 text-gray-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-700" />
            <span>Add Activity</span>
          </button>
        </div>
      </div>

      {/* Horizontal Stage Timeline matching reference screenshot exactly */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <div className="min-w-[650px] flex items-center justify-between relative py-2">
          {/* Connecting line */}
          <div className="absolute top-[30px] left-10 right-10 h-0.5 bg-emerald-100 z-0" />

          {plan.stages.map((stage, idx) => {
            const Icon = getStageIcon(stage.icon);
            const isPast = idx < 2; // Land prep & Sowing done

            return (
              <div key={stage.id} className="relative z-10 flex flex-col items-center text-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isPast
                      ? 'bg-emerald-700 text-white shadow-md ring-4 ring-emerald-50'
                      : 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-gray-900 mt-2.5">{stage.name}</p>
                <p className="text-[11px] text-gray-500 font-medium">{stage.dayRange}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Schedule Table matching screenshot */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">Detailed Schedule</h3>
          <span className="text-xs text-gray-500">
            {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Activity</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Details</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task) => {
                const Icon = getActivityIcon(task.icon);

                return (
                  <tr
                    key={task.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      task.completed ? 'opacity-70' : ''
                    }`}
                  >
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleTaskStatus(task.id)}
                          className="text-emerald-700 hover:text-emerald-800 focus:outline-none"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300 hover:text-emerald-600" />
                          )}
                        </button>
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`font-semibold ${
                            task.completed ? 'line-through text-gray-400' : 'text-gray-900'
                          }`}
                        >
                          {task.activity}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 text-gray-600 font-medium whitespace-nowrap">
                      {task.date}
                    </td>
                    <td className="py-3.5 text-gray-600">{task.details}</td>
                    <td className="py-3.5 text-right pr-2">
                      <button
                        onClick={() => setIsEditingTask(task)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                        title="Edit schedule details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Task Modal */}
      {isEditingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-gray-900 mb-3">Edit Activity</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Activity Name</label>
                <input
                  type="text"
                  value={isEditingTask.activity}
                  onChange={(e) =>
                    setIsEditingTask({ ...isEditingTask, activity: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Scheduled Date</label>
                <input
                  type="text"
                  value={isEditingTask.date}
                  onChange={(e) => setIsEditingTask({ ...isEditingTask, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Details & Dosage</label>
                <input
                  type="text"
                  value={isEditingTask.details}
                  onChange={(e) =>
                    setIsEditingTask({ ...isEditingTask, details: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingTask(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white rounded-xl font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Activity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-gray-900 mb-3">Add Calendar Activity</h3>
            <form onSubmit={handleAddNewTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Activity Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Staking plants or foliar micronutrient spray"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Target Date</label>
                <input
                  type="text"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Instructions / Dosage</label>
                <input
                  type="text"
                  placeholder="e.g. 500g per bed, dilute with water"
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white rounded-xl font-semibold"
                >
                  Add to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
