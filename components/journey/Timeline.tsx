import { Station } from "@/types/train";
import { cn } from "@/utils/cn";
import { MapPin } from "lucide-react";
import { formatDelay } from "@/utils/time";

export default function Timeline({ stations, currentStationCode }: { stations: Station[], currentStationCode?: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-bold text-lg text-slate-900 mb-6">Journey Timeline</h3>
      <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
        {stations.map((station, idx) => {
          const isCurrent = station.code === currentStationCode;
          
          return (
            <div key={station.code} className="relative pl-6">
              {/* Timeline marker */}
              <div
                className={cn(
                  "absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 bg-white",
                  station.passed ? "border-green-500" : isCurrent ? "border-blue-600 ring-4 ring-blue-100" : "border-slate-300"
                )}
              />
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={cn(
                    "font-bold text-base",
                    isCurrent ? "text-blue-600" : station.passed ? "text-slate-700" : "text-slate-500"
                  )}>
                    {station.name} ({station.code})
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mt-1">
                    {station.platform && <span>PF {station.platform}</span>}
                    <span>•</span>
                    <span>{station.distanceKm} km</span>
                  </div>
                  {isCurrent && (
                    <div className="mt-2 inline-flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-semibold">
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
                        station.delayMinutes > 0 ? "text-red-500" : "text-green-600"
                      )}>
                        {station.actualArrival}
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium">{station.scheduledArrival || "--:--"}</span>
                    )}
                  </div>
                  {station.delayMinutes > 0 && !station.passed && (
                    <div className="text-xs text-red-500 font-medium mt-1">
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
