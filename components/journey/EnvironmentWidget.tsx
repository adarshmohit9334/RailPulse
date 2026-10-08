"use client";

import { LiveJourney } from "@/types/train";
import { Cloud, Droplets, Mountain, Wind, Map as MapIcon, CloudRain, Sun, CloudFog } from "lucide-react";

interface EnvironmentWidgetProps {
  journey: LiveJourney;
}

export default function EnvironmentWidget({ journey }: EnvironmentWidgetProps) {
  const { weather, terrain } = journey;

  if (!weather && !terrain) return null;

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "Rainy":
        return <CloudRain className="text-blue-500" />;
      case "Sunny":
      case "Clear":
        return <Sun className="text-yellow-500" />;
      case "Mist":
      case "Cloudy":
      default:
        return <CloudFog className="text-slate-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {/* Weather Card */}
      {weather && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              {getWeatherIcon(weather.condition)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Weather</p>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-slate-900">{weather.tempC}°C</span>
                <span className="text-sm font-medium text-slate-600 mb-1">{weather.condition}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 text-xs text-slate-500 font-medium border-l border-slate-100 pl-4">
            <div className="flex items-center space-x-1.5">
              <Droplets size={14} className="text-blue-400" />
              <span>{weather.humidity}% Humidity</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Wind size={14} className="text-slate-400" />
              <span>{weather.windSpeedKmh} km/h Wind</span>
            </div>
          </div>
        </div>
      )}

      {/* Terrain Card */}
      {terrain && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Mountain className="text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Terrain</p>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-slate-900">{terrain.elevationM}m</span>
                <span className="text-sm font-medium text-slate-600 mb-1">Elevation</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 text-xs text-slate-500 font-medium border-l border-slate-100 pl-4 justify-center">
            <div className="flex items-center space-x-1.5">
              <MapIcon size={14} className="text-emerald-400" />
              <span className="text-sm">{terrain.type}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
