import { Clock } from "lucide-react";

export default function ETAChip({ eta }: { eta: string | null }) {
  if (!eta) return null;

  return (
    <div className="flex items-center space-x-1.5 text-sm font-medium text-rp-text-very-dark bg-rp-bg-secondary px-3 py-1.5 rounded-rp-input border border-rp-border shadow-[var(--shadow-rp-soft)]">
      <Clock size={16} className="text-rp-blue-primary" />
      <span>ETA {eta}</span>
    </div>
  );
}
