import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LocalTrain } from "@/lib/trains-db";

export interface RecentTrain extends LocalTrain {}

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  recentSearches: RecentTrain[];
  addRecentSearch: (train: RecentTrain) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      query: "",
      setQuery: (query) => set({ query }),
      recentSearches: [],
      addRecentSearch: (train) =>
        set((state) => {
          // Remove duplicates
          const filtered = state.recentSearches.filter((t) => t.number !== train.number);
          // Prepend new search and keep only last 5
          return { recentSearches: [train, ...filtered].slice(0, 5) };
        }),
    }),
    {
      name: "railpulse-recent-searches",
    }
  )
);
