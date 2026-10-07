"use client";

import { useQuery } from "@tanstack/react-query";
import { LiveJourney } from "@/types/train";
import JourneyCard from "@/components/journey/JourneyCard";
import Timeline from "@/components/journey/Timeline";
import { useJourneyStore } from "@/store/journey";
import { useEffect } from "react";

export default function TrainClient({ id }: { id: string }) {
  const setActiveJourney = useJourneyStore((state) => state.setActiveJourney);

  const { data: journey, isLoading, error } = useQuery<LiveJourney>({
    queryKey: ["journey", id],
    queryFn: async () => {
      const res = await fetch(`/api/train/${id}`);
      if (!res.ok) throw new Error("Failed to fetch journey");
      return res.json();
    },
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (journey) {
      setActiveJourney(journey);
    }
  }, [journey, setActiveJourney]);

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading live journey data...</div>;
  }

  if (error || !journey) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-50 rounded-2xl">
        Failed to load train details. Please check the train number and try again.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <JourneyCard journey={journey} />
      <Timeline stations={journey.stations} currentStationCode={journey.currentStation?.code} />
      
      {/* Map Placeholder for Phase 3 */}
      <div className="bg-slate-100 rounded-3xl p-6 text-center text-slate-500 border border-slate-200">
        Map will be implemented in Phase 3
      </div>
    </div>
  );
}
