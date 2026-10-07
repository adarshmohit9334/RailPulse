import { create } from "zustand";

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  recentSearches: [],
  addRecentSearch: (query) =>
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 5),
    })),
}));
