import { cn } from "@/utils/cn";

export default function DelayBadge({ minutes }: { minutes: number }) {
  if (minutes <= 0) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        On Time
      </span>
    );
  }

  const isMinorDelay = minutes < 15;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
        isMinorDelay ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
      )}
    >
      {minutes}m delay
    </span>
  );
}
