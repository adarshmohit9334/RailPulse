"use client";

import { useFavoritesStore } from "@/store/favorites";
import { LiveJourney } from "@/types/train";
import { Share2, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface TrainHeaderProps {
  journey: LiveJourney;
}

export default function TrainHeader({ journey }: TrainHeaderProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFav = mounted ? isFavorite(journey.number) : false;

  const toggleFavorite = () => {
    if (isFav) {
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `RailPulse - ${journey.name} (${journey.number})`,
          text: `Track live journey of ${journey.name} from ${journey.origin} to ${journey.destination}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center justify-between bg-rp-surface p-4 rounded-[var(--radius-rp-card)] shadow-[var(--shadow-rp-soft)] border border-rp-border-soft mb-4">
      <div>
        <h1 className="text-xl font-bold text-rp-text-very-dark flex items-center space-x-2">
          <span>{journey.number}</span>
          <span className="text-rp-border">•</span>
          <span>{journey.name}</span>
        </h1>
        <p className="text-sm text-rp-text-secondary mt-1">
          {journey.origin} to {journey.destination}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleShare}
          className="p-2 text-rp-text-muted hover:text-rp-blue-primary hover:bg-rp-surface-soft rounded-full transition-colors"
          aria-label="Share journey"
        >
          <Share2 size={20} />
        </button>
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full transition-colors ${
            isFav 
              ? "text-rp-warning bg-yellow-50 hover:bg-yellow-100" 
              : "text-rp-text-muted hover:text-rp-warning hover:bg-yellow-50"
          }`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Star size={20} className={isFav ? "fill-current" : ""} />
        </button>
      </div>
    </div>
  );
}
