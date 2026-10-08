import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LocalTrain } from "@/types/train";

interface FavoritesState {
  favorites: LocalTrain[];
  addFavorite: (train: LocalTrain) => void;
  removeFavorite: (trainNumber: string) => void;
  isFavorite: (trainNumber: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (train) =>
        set((state) => {
          if (state.favorites.some((t) => t.number === train.number)) return state;
          return { favorites: [...state.favorites, train] };
        }),
      removeFavorite: (trainNumber) =>
        set((state) => ({
          favorites: state.favorites.filter((t) => t.number !== trainNumber),
        })),
      isFavorite: (trainNumber) => get().favorites.some((t) => t.number === trainNumber),
    }),
    {
      name: "railpulse-favorites",
    }
  )
);
