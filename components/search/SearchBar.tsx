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
        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <input
        type="text"
        className="w-full bg-white border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-12 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
        placeholder="Enter train name, number or station..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
