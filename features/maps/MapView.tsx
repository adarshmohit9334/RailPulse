"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LiveJourney } from "@/types/train";
import { env } from "@/config/env";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
}

interface MapViewProps {
  journey: LiveJourney;
}

export default function MapView({ journey }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const trainMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Use MapTiler if API key is provided, otherwise fallback to OSM generic style
    const maptilerKey = env.NEXT_PUBLIC_MAPTILER_API_KEY || "get_your_own_OpIi9ZULNHzrESv6T2vL";
    const styleUrl = `https://api.maptiler.com/maps/streets-v2/style.json?key=${maptilerKey}`;

    // Initialize Map
    if (!map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: styleUrl,
        center: [78.9629, 20.5937], // Center of India
        zoom: 4,
        attributionControl: false,
      });

      map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
      map.current.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

      map.current.on("load", () => {
        setMapLoaded(true);
      });
    }

    return () => {
      // Cleanup on unmount handled gracefully
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    const currentMap = map.current;

    // 1. Draw Route Geometry
    if (journey.routeGeometry && journey.routeGeometry.length > 0) {
      if (currentMap.getSource("route")) {
        (currentMap.getSource("route") as maplibregl.GeoJSONSource).setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: journey.routeGeometry,
          },
        });
      } else {
        currentMap.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: journey.routeGeometry,
            },
          },
        });

        currentMap.addLayer({
          id: "route-layer",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3b82f6", // blue-500
            "line-width": 4,
            "line-opacity": 0.8,
          },
        });
      }

      // Fit bounds to route
      const bounds = new maplibregl.LngLatBounds();
      journey.routeGeometry.forEach((coord) => {
        bounds.extend(coord as [number, number]);
      });
      currentMap.fitBounds(bounds, { padding: 50, maxZoom: 12 });
    }

    // 2. Draw Station Markers
    journey.stations.forEach((station) => {
      if (station.lat && station.lng) {
        // Create custom element for station marker
        const el = document.createElement("div");
        const isCurrent = station.code === journey.currentStation?.code;
        
        el.className = `w-4 h-4 rounded-full border-2 bg-rp-surface shadow-[var(--shadow-rp-soft)] ${
          station.passed ? "border-rp-success" : isCurrent ? "border-rp-blue-primary scale-125 ring-2 ring-[var(--color-rp-border-soft)]" : "border-rp-text-muted"
        }`;
        
        new maplibregl.Marker({ element: el })
          .setLngLat([station.lng, station.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 15 }).setHTML(
              `<div class="p-1"><p class="font-bold text-sm text-rp-text">${station.name} (${station.code})</p>
              <p class="text-xs text-rp-text-secondary">${station.passed ? "Passed" : isCurrent ? "Current" : "Upcoming"}</p></div>`
            )
          )
          .addTo(currentMap);
      }
    });

    // 3. Draw Train Marker
    if (journey.currentLocation) {
      const { lat, lng } = journey.currentLocation;

      const trainEl = document.createElement("div");
      trainEl.className = "flex items-center justify-center w-10 h-10 bg-rp-blue-primary text-white rounded-full shadow-[var(--shadow-rp-soft)] border-2 border-white z-50 transition-transform";
      trainEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-train-front"><path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1.5 6"/><path d="m15 15 1.5 6"/><path d="M3 15h18"/><path d="M4 11v4"/><path d="M20 11v4"/><rect x="8" y="11" width="8" height="4" rx="1"/><rect x="5" y="3" width="14" height="12" rx="4"/></svg>`;

      if (trainMarkerRef.current) {
        trainMarkerRef.current.setLngLat([lng, lat]);
      } else {
        trainMarkerRef.current = new maplibregl.Marker({ element: trainEl })
          .setLngLat([lng, lat])
          .setPopup(
            new maplibregl.Popup({ offset: 20 }).setHTML(
              `<div class="p-1"><p class="font-bold text-sm text-rp-text">${journey.number} - ${journey.status}</p>
              <p class="text-xs text-rp-text-secondary">${journey.speedKmh} km/h • ${journey.delayMinutes}m delay</p></div>`
            )
          )
          .addTo(currentMap);
      }
    }
  }, [mapLoaded, journey]);

  return (
    <div className="bg-rp-surface rounded-[var(--radius-rp-card)] p-2 shadow-[var(--shadow-rp-soft)] border border-rp-border-soft h-[400px] md:h-[500px] relative overflow-hidden">
      <div ref={mapContainer} className="w-full h-full rounded-[var(--radius-rp-card)]" />
      
      {/* Live Badge Overlay */}
      <div className="absolute top-6 left-6 bg-rp-surface/90 backdrop-blur px-3 py-1.5 rounded-rp-input shadow-[var(--shadow-rp-soft)] border border-rp-border flex items-center space-x-2 z-10">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rp-danger"></span>
        </span>
        <span className="text-xs font-bold text-rp-text">LIVE TRACKING</span>
      </div>
    </div>
  );
}
