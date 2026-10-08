import { Station } from "@/types/train";
import { cn } from "@/utils/cn";
import { MapPin } from "lucide-react";
import { formatDelay } from "@/utils/time";

export default function Timeline({ stations, currentStationCode }: { stations: Station[], currentStationCode?: string }) {
  return (
    <div className="bg-rp-surface rounded-[var(--radius-rp-card)] p-6 shadow-[var(--shadow-rp-soft)] border border-rp-border-soft">
      <h3 className="font-bold text-lg text-rp-text-very-dark mb-6">Journey Timeline</h3>
      <div className="relative border-l-2 border-rp-border ml-4 space-y-8">
        {stations.map((station, idx) => {
          const isCurrent = station.code === currentStationCode;
          
          return (
            <div key={`${station.code}-${idx}`} className="relative pl-6">
              {/* Timeline marker */}
              <div
                className={cn(
                  "absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 bg-rp-surface",
                  station.passed ? "border-rp-success" : isCurrent ? "border-rp-blue-primary ring-4 ring-rp-surface-soft" : "border-rp-border"
                )}
              />
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={cn(
                    "font-bold text-base",
                    isCurrent ? "text-rp-blue-primary-dark" : station.passed ? "text-rp-text" : "text-rp-text-secondary"
                  )}>
                    {station.name} ({station.code})
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-rp-text-secondary mt-1">
                    {station.platform && <span>PF {station.platform}</span>}
                    <span>•</span>
                    <span>{station.distanceKm} km</span>
                  </div>
                  {isCurrent && (
                    <div className="mt-2 inline-flex items-center space-x-1 bg-rp-surface-soft text-rp-blue-dark px-2 py-1 rounded-rp-btn text-xs font-semibold">
                      <MapPin size={12} />
                      <span>Current Location</span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-sm">
                    {station.actualArrival ? (
                      <span className={cn(
                        "font-medium",
                        station.delayMinutes > 0 ? "text-rp-danger" : "text-rp-success"
                      )}>
                        {station.actualArrival}
                      </span>
                    ) : (
                      <span className="text-rp-text-secondary font-medium">{station.scheduledArrival || "--:--"}</span>
                    )}
                  </div>
                  {station.delayMinutes > 0 && !station.passed && (
                    <div className="text-xs text-rp-danger font-medium mt-1">
                      {formatDelay(station.delayMinutes)} late
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
