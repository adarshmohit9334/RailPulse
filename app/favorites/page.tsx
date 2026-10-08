"use client";

import { useFavoritesStore } from "@/store/favorites";
import { Train, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded-rp-btn"></div>
        <div className="h-24 bg-rp-bg-secondary rounded-[var(--radius-rp-card)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-rp-text">Your Favorite Trains</h1>
        <p className="text-rp-text-secondary mt-1">Quickly access your most tracked routes.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-rp-surface rounded-[var(--radius-rp-card)] p-12 text-center border border-rp-border-soft shadow-[var(--shadow-rp-soft)] flex flex-col items-center">
          <div className="p-4 bg-rp-surface-soft rounded-full text-rp-blue-primary mb-4">
            <Train size={32} />
          </div>
          <h2 className="text-xl font-bold text-rp-text-very-dark mb-2">No favorites yet</h2>
          <p className="text-rp-text-secondary mb-6">
            Search for a train and tap the star icon to save it here for quick access.
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-rp-blue-primary text-white font-medium rounded-full hover:bg-rp-blue-dark transition-colors"
          >
            Find a Train
          </Link>
        </div>
      ) : (
        <div className="bg-rp-surface rounded-[var(--radius-rp-card)] shadow-[var(--shadow-rp-soft)] border border-rp-border-soft divide-y divide-slate-100 overflow-hidden">
          {favorites.map((train) => (
            <div key={train.number} className="flex items-center justify-between p-4 hover:bg-rp-bg-secondary transition-colors group">
              <Link
                href={`/train/${train.number}`}
                className="flex-1 flex items-start space-x-4"
              >
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-[var(--radius-rp-card)] group-hover:bg-yellow-100 transition-colors">
                  <Train size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-rp-text-very-dark text-lg">{train.number}</span>
                    <span className="text-rp-text-secondary font-medium">{train.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-rp-text-secondary mt-1">
                    <span>{train.from} ({train.fromCode})</span>
                    <ArrowRight size={14} className="text-rp-border" />
                    <span>{train.to} ({train.toCode})</span>
                  </div>
                </div>
              </Link>
              <div className="flex items-center ml-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFavorite(train.number);
                  }}
                  className="p-2 text-rp-border hover:text-rp-danger hover:bg-rp-danger-bg rounded-full transition-colors"
                  aria-label="Remove favorite"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
