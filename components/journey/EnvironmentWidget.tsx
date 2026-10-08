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
        return <CloudRain className="text-rp-blue-primary" />;
      case "Sunny":
      case "Clear":
        return <Sun className="text-rp-warning" />;
      case "Mist":
      case "Cloudy":
      default:
        return <CloudFog className="text-rp-text-muted" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {/* Weather Card */}
      {weather && (
        <div className="bg-rp-surface rounded-[var(--radius-rp-card)] p-5 shadow-[var(--shadow-rp-soft)] border border-rp-border-soft flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-rp-surface-soft rounded-[var(--radius-rp-card)]">
              {getWeatherIcon(weather.condition)}
            </div>
            <div>
              <p className="text-sm font-semibold text-rp-text-secondary uppercase tracking-wider">Weather</p>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-rp-text">{weather.tempC}°C</span>
                <span className="text-sm font-medium text-rp-text-secondary mb-1">{weather.condition}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 text-xs text-rp-text-secondary font-medium border-l border-rp-border-soft pl-4">
            <div className="flex items-center space-x-1.5">
              <Droplets size={14} className="text-rp-blue-primary-muted" />
              <span>{weather.humidity}% Humidity</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Wind size={14} className="text-rp-text-muted" />
              <span>{weather.windSpeedKmh} km/h Wind</span>
            </div>
          </div>
        </div>
      )}

      {/* Terrain Card */}
      {terrain && (
        <div className="bg-rp-surface rounded-[var(--radius-rp-card)] p-5 shadow-[var(--shadow-rp-soft)] border border-rp-border-soft flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-rp-surface-soft rounded-[var(--radius-rp-card)]">
              <Mountain className="text-rp-blue-primary-muted" />
            </div>
            <div>
              <p className="text-sm font-semibold text-rp-text-secondary uppercase tracking-wider">Terrain</p>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-rp-text">{terrain.elevationM}m</span>
                <span className="text-sm font-medium text-rp-text-secondary mb-1">Elevation</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 text-xs text-rp-text-secondary font-medium border-l border-rp-border-soft pl-4 justify-center">
            <div className="flex items-center space-x-1.5">
              <MapIcon size={14} className="text-rp-blue-primary-muted" />
              <span className="text-sm">{terrain.type}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
