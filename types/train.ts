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
  weather?: {
    tempC: number;
    condition: "Sunny" | "Cloudy" | "Rainy" | "Clear" | "Mist";
    humidity: number;
    windSpeedKmh: number;
  };
  terrain?: {
    elevationM: number;
    type: "Plains" | "Hilly" | "Mountains" | "Coastal" | "Urban";
  };
  analytics?: {
    punctuality30Days: number; // percentage
    averageDelayMinutes: number;
    maxSpeedKmh: number;
    cleanlinessScore: number;
  };
}

export interface LocalTrain {
  id: string;
  name: string;
  number: string;
  origin?: string;
  destination?: string;
  from?: string;
  fromCode?: string;
  to?: string;
  toCode?: string;
  departureTime?: string;
  arrivalTime?: string;
  duration?: string;
  type?: string;
  days?: string[];
}
