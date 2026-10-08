import { cn } from "@/utils/cn";
import { formatDelay } from "@/utils/time";

export default function DelayBadge({ minutes }: { minutes: number }) {
  if (minutes <= 0) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-rp-success-bg text-rp-success">
        On Time
      </span>
    );
  }

  const isMinorDelay = minutes < 15;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
        isMinorDelay ? "bg-rp-warning-bg text-rp-warning" : "bg-rp-danger-bg text-rp-danger"
      )}
    >
      {formatDelay(minutes)} delay
    </span>
  );
}
