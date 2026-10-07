import { LiveJourney, Station } from "@/types/train";
import { popularTrains } from "./trains-db";

export async function fetchLiveJourney(trainId: string): Promise<LiveJourney> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let train = popularTrains.find((t) => t.number === trainId);
  
  if (!train) {
    // Generate a fallback train instead of throwing an error for testing
    train = {
      number: trainId,
      name: `Unknown Train ${trainId}`,
      from: "Origin Station",
      fromCode: "ORG",
      to: "Destination Station",
      toCode: "DEST"
    };
  }

  // Create a realistic-looking fallback journey
  const totalDistanceKm = 1450;
  const distanceCoveredKm = 960;
  const completionPercentage = (distanceCoveredKm / totalDistanceKm) * 100;
  
  const stations: Station[] = [
    {
      code: train.fromCode,
      name: train.from,
      scheduledArrival: null,
      scheduledDeparture: "08:00",
      actualArrival: null,
      actualDeparture: "08:00",
      delayMinutes: 0,
      platform: "1",
      distanceKm: 0,
      passed: true,
      lat: 18.9696,
      lng: 72.8197,
    },
    {
      code: "ST",
      name: "Surat",
      scheduledArrival: "11:30",
      scheduledDeparture: "11:35",
      actualArrival: "11:30",
      actualDeparture: "11:35",
      delayMinutes: 0,
      platform: "2",
      distanceKm: 250,
      passed: true,
      lat: 21.2049,
      lng: 72.8407,
    },
    {
      code: "BRC",
      name: "Vadodara Jn",
      scheduledArrival: "13:20",
      scheduledDeparture: "13:30",
      actualArrival: "13:35",
      actualDeparture: "13:45",
      delayMinutes: 15,
      platform: "3",
      distanceKm: 380,
      passed: true,
      lat: 22.3106,
      lng: 73.1765,
    },
    {
      code: "RTM",
      name: "Ratlam Jn",
      scheduledArrival: "17:00",
      scheduledDeparture: "17:10",
      actualArrival: "17:25",
      actualDeparture: "17:35",
      delayMinutes: 25,
      platform: "5",
      distanceKm: 650,
      passed: true,
      lat: 23.3323,
      lng: 75.0503,
    },
    {
      code: "KOTA",
      name: "Kota Jn",
      scheduledArrival: "20:30",
      scheduledDeparture: "20:40",
      actualArrival: "20:50",
      actualDeparture: "21:00",
      delayMinutes: 20,
      platform: "1",
      distanceKm: 920,
      passed: true,
      lat: 25.1668,
      lng: 75.8235,
    },
    {
      code: "SWM",
      name: "Sawai Madhopur",
      scheduledArrival: "22:15",
      scheduledDeparture: "22:20",
      actualArrival: null,
      actualDeparture: null,
      delayMinutes: 20,
      platform: "1",
      distanceKm: 1030,
      passed: false,
      lat: 26.0028,
      lng: 76.3533,
    },
    {
      code: train.toCode,
      name: train.to,
      scheduledArrival: "04:00",
      scheduledDeparture: null,
      actualArrival: null,
      actualDeparture: null,
      delayMinutes: 20,
      platform: "3",
      distanceKm: 1450,
      passed: false,
      lat: 28.6429,
      lng: 77.2191,
    }
  ];

  const now = new Date();
  
  return {
    trainId: train.number,
    number: train.number,
    name: train.name,
    origin: train.from,
    destination: train.to,
    currentLocation: { lat: 25.4, lng: 76.0 }, // between Kota and SWM
    status: "Delayed",
    delayMinutes: 20,
    speedKmh: 110,
    distanceCoveredKm,
    remainingDistanceKm: totalDistanceKm - distanceCoveredKm,
    totalDistanceKm,
    completionPercentage,
    lastUpdated: now.toISOString(),
    ETA: "04:20", // Added delay
    previousStation: stations[4],
    currentStation: stations[4],
    nextStation: stations[5],
    stations,
    routeGeometry: [
      [72.8197, 18.9696],
      [72.8407, 21.2049],
      [73.1765, 22.3106],
      [75.0503, 23.3323],
      [75.8235, 25.1668],
      [76.0000, 25.4000], // current
      [76.3533, 26.0028],
      [77.2191, 28.6429]
    ]
  };
}
