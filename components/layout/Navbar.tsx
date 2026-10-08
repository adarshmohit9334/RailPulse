"use client";

import Link from "next/link";
import { Train, Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites";
import { useEffect, useState } from "react";

export default function Navbar() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-rp-surface/80 backdrop-blur-md border-b border-rp-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Train className="text-rp-blue-primary-dark" size={24} />
          <span className="font-bold text-xl tracking-tight text-rp-text-very-dark">
            RailPulse
          </span>
          <span className="bg-rp-success-bg text-rp-success text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ml-1">
            Live
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-rp-text-secondary hover:text-rp-text-very-dark">
            Search
          </Link>
          <Link href="/favorites" className="text-sm font-medium text-rp-text-secondary hover:text-rp-text-very-dark flex items-center space-x-1">
            <span>Favorites</span>
            {mounted && favorites.length > 0 && (
              <span className="bg-rp-surface-soft text-rp-blue-dark text-xs font-bold px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
