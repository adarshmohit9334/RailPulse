import { create } from "zustand";
import { LiveJourney } from "@/types/train";

interface JourneyState {
  activeJourney: LiveJourney | null;
  setActiveJourney: (journey: LiveJourney | null) => void;
  updateJourneyLocation: (lat: number, lng: number) => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  activeJourney: null,
  setActiveJourney: (journey) => set({ activeJourney: journey }),
  updateJourneyLocation: (lat, lng) =>
    set((state) => {
      if (!state.activeJourney) return state;
      return {
        activeJourney: {
          ...state.activeJourney,
          currentLocation: { lat, lng },
        },
      };
    }),
}));
