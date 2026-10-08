"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim().length >= 2) {
      router.push(`/train/${value.trim()}`);
    }
  };

  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-rp-text-muted group-focus-within:text-rp-blue-primary transition-colors" />
      </div>
      <input
        type="text"
        className="w-full bg-rp-surface border border-rp-border text-rp-text-very-dark rounded-[var(--radius-rp-card)] pl-12 pr-12 py-4 text-lg shadow-[var(--shadow-rp-soft)] focus:outline-none focus:ring-2 focus:ring-rp-blue-primary/20 focus:border-rp-blue-primary transition-all placeholder:text-rp-text-muted"
        placeholder="Enter train name, number or station..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-4 flex items-center text-rp-text-muted hover:text-rp-text-secondary"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
