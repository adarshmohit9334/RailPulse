"use client";

import { LiveJourney } from "@/types/train";
import { Activity, Clock, Gauge, Sparkles } from "lucide-react";

interface AnalyticsDashboardProps {
  journey: LiveJourney;
}

export default function AnalyticsDashboard({ journey }: AnalyticsDashboardProps) {
  const { analytics } = journey;

  if (!analytics) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="text-purple-500" size={20} />
        <h3 className="text-lg font-bold text-slate-900">Train Analytics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Punctuality */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
          <div className="flex items-center space-x-2 text-slate-500 mb-2">
            <Clock size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Punctuality</span>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-2xl font-bold text-slate-900">{analytics.punctuality30Days}%</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">on time (last 30 days)</p>
          
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-green-500 h-full rounded-full" 
              style={{ width: `${analytics.punctuality30Days}%` }}
            />
          </div>
        </div>

        {/* Avg Delay */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
          <div className="flex items-center space-x-2 text-slate-500 mb-2">
            <Activity size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Delay</span>
          </div>
          <div className="flex items-end space-x-1">
            <span className="text-2xl font-bold text-slate-900">{analytics.averageDelayMinutes}</span>
            <span className="text-sm font-medium text-slate-600 mb-1">min</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">average arrival delay</p>
        </div>

        {/* Max Speed */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
          <div className="flex items-center space-x-2 text-slate-500 mb-2">
            <Gauge size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Max Speed</span>
          </div>
          <div className="flex items-end space-x-1">
            <span className="text-2xl font-bold text-slate-900">{analytics.maxSpeedKmh}</span>
            <span className="text-sm font-medium text-slate-600 mb-1">km/h</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">top speed recorded</p>
        </div>

        {/* Cleanliness */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
          <div className="flex items-center space-x-2 text-slate-500 mb-2">
            <Sparkles size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Cleanliness</span>
          </div>
          <div className="flex items-end space-x-1">
            <span className="text-2xl font-bold text-slate-900">{analytics.cleanlinessScore}</span>
            <span className="text-sm font-medium text-slate-600 mb-1">/ 5.0</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">user ratings average</p>
        </div>
      </div>
    </div>
  );
}
