"use client";

import { useQuery } from "@tanstack/react-query";
import { LocalTrain, popularTrains } from "@/lib/trains-db";
import { Train, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/search";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const debouncedQuery = useDebounce(query, 300);
  const recentSearches = useSearchStore((state) => state.recentSearches);
  const addRecentSearch = useSearchStore((state) => state.addRecentSearch);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) return [];
      const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      return data.results as LocalTrain[];
    },
    enabled: debouncedQuery.length >= 2,
  });

  const isSearchActive = debouncedQuery.length >= 2;
  const displayResults = isSearchActive 
    ? (searchResults || []) 
    : (recentSearches.length > 0 ? recentSearches : popularTrains.slice(0, 5));
  
  // If user entered a 5 digit number and it's not in the db, offer to track it directly
  const is5Digit = /^\d{5}$/.test(debouncedQuery);
  const exactMatch = displayResults.find(t => t.number === debouncedQuery);

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {isSearchActive ? "Search Results" : (recentSearches.length > 0 ? "Recent Searches" : "Popular Trains")}
        </h3>
      </div>
      
      <div className="divide-y divide-slate-100">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Searching...</div>
        ) : (
          <>
            {is5Digit && !exactMatch && (
              <Link
                href={`/train/${debouncedQuery}`}
                onClick={() => addRecentSearch({
                  number: debouncedQuery,
                  name: "Tracked Train",
                  from: "",
                  fromCode: "",
                  to: "",
                  toCode: ""
                })}
                className="flex items-center justify-between p-4 bg-blue-50/50 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Train size={20} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">Track Train {debouncedQuery}</span>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      Live tracking for any 5-digit Indian train number
                    </div>
                  </div>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors hidden sm:block" />
              </Link>
            )}

            {displayResults.length === 0 && !is5Digit ? (
              <div className="p-8 text-center text-slate-500">No trains found. Enter a 5-digit train number to track it live.</div>
            ) : (
              displayResults.map((train) => (
                <Link
                  key={train.number}
                  href={`/train/${train.number}`}
                  onClick={() => addRecentSearch(train)}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Train size={20} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{train.number}</span>
                        <span className="text-slate-600 font-medium">{train.name}</span>
                      </div>
                      {(train.from || train.to) && (
                        <div className="flex items-center space-x-2 text-sm text-slate-500 mt-1">
                          {train.from && <span>{train.from} {train.fromCode && `(${train.fromCode})`}</span>}
                          {train.from && train.to && <ArrowRight size={14} className="text-slate-300" />}
                          {train.to && <span>{train.to} {train.toCode && `(${train.toCode})`}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors hidden sm:block" />
                </Link>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
