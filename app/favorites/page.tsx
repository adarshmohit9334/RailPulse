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
        <div className="h-8 w-48 bg-slate-200 rounded-md"></div>
        <div className="h-24 bg-slate-100 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Your Favorite Trains</h1>
        <p className="text-slate-500 mt-1">Quickly access your most tracked routes.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm flex flex-col items-center">
          <div className="p-4 bg-blue-50 rounded-full text-blue-500 mb-4">
            <Train size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No favorites yet</h2>
          <p className="text-slate-500 mb-6">
            Search for a train and tap the star icon to save it here for quick access.
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Find a Train
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
          {favorites.map((train) => (
            <div key={train.number} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
              <Link
                href={`/train/${train.number}`}
                className="flex-1 flex items-start space-x-4"
              >
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl group-hover:bg-yellow-100 transition-colors">
                  <Train size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-lg">{train.number}</span>
                    <span className="text-slate-600 font-medium">{train.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mt-1">
                    <span>{train.from} ({train.fromCode})</span>
                    <ArrowRight size={14} className="text-slate-300" />
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
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
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
