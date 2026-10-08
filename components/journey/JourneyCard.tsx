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
    <div className="bg-rp-surface rounded-[var(--radius-rp-card)] p-6 shadow-[var(--shadow-rp-soft)] border border-rp-border-soft mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <span className="px-2.5 py-1 bg-rp-surface-soft text-rp-blue-dark font-bold text-sm rounded-rp-input">
              {journey.number}
            </span>
            <DelayBadge minutes={journey.delayMinutes} />
            <span className={cn(
              "px-2 py-1 text-xs font-bold uppercase rounded-rp-input border",
              journey.status === "Running" ? "border-blue-200 text-rp-blue-primary-dark bg-rp-surface-soft" : "border-rp-border text-rp-text-secondary bg-rp-bg-secondary"
            )}>
              {journey.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-rp-text">{journey.name}</h1>
        </div>
        <button
          onClick={toggleFavorite}
          className="p-2.5 rounded-full hover:bg-rp-bg-secondary transition-colors"
        >
          <Heart
            className={cn("w-6 h-6", favorite ? "fill-red-500 text-rp-danger" : "text-rp-text-muted")}
          />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center mb-6">
        <div>
          <p className="text-sm text-rp-text-secondary mb-1">Origin</p>
          <p className="font-bold text-rp-text">{journey.origin}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ProgressRing percentage={journey.completionPercentage} size={56} strokeWidth={4} />
        </div>
        <div className="text-right">
          <p className="text-sm text-rp-text-secondary mb-1">Destination</p>
          <p className="font-bold text-rp-text">{journey.destination}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-rp-bg-secondary rounded-[var(--radius-rp-card)] border border-rp-border-soft">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rp-surface-soft text-rp-blue-primary-dark rounded-rp-input">
            <Navigation size={20} />
          </div>
          <div>
            <p className="text-xs text-rp-text-secondary font-medium">Next Station</p>
            <p className="font-bold text-rp-text-very-dark text-sm">{journey.nextStation?.name || "Arrived"}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rp-warning-bg text-rp-warning rounded-rp-input">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-xs text-rp-text-secondary font-medium">Speed</p>
            <p className="font-bold text-rp-text-very-dark text-sm">{journey.speedKmh} km/h</p>
          </div>
        </div>

        <ETAChip eta={journey.ETA} />
      </div>
    </div>
  );
}
