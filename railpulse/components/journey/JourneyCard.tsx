"use client";

import { LiveJourney } from "@/types/train";
import DelayBadge from "./DelayBadge";
import ETAChip from "./ETAChip";
import ProgressRing from "./ProgressRing";
import { useFavoritesStore } from "@/store/favorites";
import { Heart, Navigation, Activity } from "lucide-react";
import { cn } from "@/utils/cn";

export default function JourneyCard({ journey }: { journey: LiveJourney }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(journey.number);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(journey.number);
    } else {
      addFavorite({
        number: journey.number,
        name: journey.name,
        from: journey.origin,
        fromCode: journey.stations[0]?.code || "",
        to: journey.destination,
        toCode: journey.stations[journey.stations.length - 1]?.code || "",
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-bold text-sm rounded-lg">
              {journey.number}
            </span>
            <DelayBadge minutes={journey.delayMinutes} />
            <span className={cn(
              "px-2 py-1 text-xs font-bold uppercase rounded-lg border",
              journey.status === "Running" ? "border-blue-200 text-blue-600 bg-blue-50" : "border-slate-200 text-slate-500 bg-slate-50"
            )}>
              {journey.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{journey.name}</h1>
        </div>
        <button
          onClick={toggleFavorite}
          className="p-2.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <Heart
            className={cn("w-6 h-6", favorite ? "fill-red-500 text-red-500" : "text-slate-400")}
          />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center mb-6">
        <div>
          <p className="text-sm text-slate-500 mb-1">Origin</p>
          <p className="font-bold text-slate-900">{journey.origin}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ProgressRing percentage={journey.completionPercentage} size={56} strokeWidth={4} />
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 mb-1">Destination</p>
          <p className="font-bold text-slate-900">{journey.destination}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Navigation size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Next Station</p>
            <p className="font-bold text-slate-900 text-sm">{journey.nextStation?.name || "Arrived"}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Speed</p>
            <p className="font-bold text-slate-900 text-sm">{journey.speedKmh} km/h</p>
          </div>
        </div>

        <ETAChip eta={journey.ETA} />
      </div>
    </div>
  );
}
