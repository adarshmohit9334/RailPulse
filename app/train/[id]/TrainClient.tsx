"use client";

import { useQuery } from "@tanstack/react-query";
import { LiveJourney } from "@/types/train";
import TrainHeader from "@/components/journey/TrainHeader";
import JourneyCard from "@/components/journey/JourneyCard";
import Timeline from "@/components/journey/Timeline";
import EnvironmentWidget from "@/components/journey/EnvironmentWidget";
import AnalyticsDashboard from "@/components/journey/AnalyticsDashboard";
import MapView from "@/features/maps/MapView";
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
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <TrainHeader journey={journey} />
        <JourneyCard journey={journey} />
        <EnvironmentWidget journey={journey} />
        <AnalyticsDashboard journey={journey} />
        <MapView journey={journey} />
      </div>
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <Timeline stations={journey.stations} currentStationCode={journey.currentStation?.code} />
        </div>
      </div>
    </div>
  );
}
