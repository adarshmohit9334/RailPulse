"use client";

import SearchBar from "@/components/search/SearchBar";
import SearchResults from "@/components/search/SearchResults";
import { useState } from "react";
import { Train } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto w-full space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
            <Train size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            RailPulse
          </h1>
        </div>
        <p className="text-lg text-slate-500 max-w-md mx-auto">
          Live Indian Railway Tracking & Journey Intelligence
        </p>
      </div>

      <div className="w-full space-y-6">
        <SearchBar value={query} onChange={setQuery} />
        <SearchResults query={query} />
      </div>
    </div>
  );
}
