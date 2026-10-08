import { Clock } from "lucide-react";

export default function ETAChip({ eta }: { eta: string | null }) {
  if (!eta) return null;

  return (
    <div className="flex items-center space-x-1.5 text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
      <Clock size={16} className="text-blue-500" />
      <span>ETA {eta}</span>
    </div>
  );
}
