export interface Station {
  code: string;
  name: string;
  scheduledArrival: string | null;
  scheduledDeparture: string | null;
  actualArrival: string | null;
  actualDeparture: string | null;
  delayMinutes: number;
  platform: string | null;
  distanceKm: number;
  lat?: number;
  lng?: number;
  passed: boolean;
}

export interface CurrentLocation {
  lat: number;
  lng: number;
}

export type TrainStatus = "Running" | "On Time" | "Delayed" | "Arrived" | "Cancelled" | "Unknown";

export interface LiveJourney {
  trainId: string;
  number: string;
  name: string;
  origin: string;
  destination: string;
  currentLocation?: CurrentLocation;
  status: TrainStatus;
  delayMinutes: number;
  speedKmh: number;
  distanceCoveredKm: number;
  remainingDistanceKm: number;
  totalDistanceKm: number;
  completionPercentage: number;
  lastUpdated: string;
  ETA: string | null;
  previousStation?: Station;
  currentStation?: Station;
  nextStation?: Station;
  stations: Station[];
  routeGeometry?: number[][]; // [lng, lat][]
}
