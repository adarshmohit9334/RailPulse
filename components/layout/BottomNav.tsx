"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart } from "lucide-react";
import { cn } from "@/utils/cn";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500",
            pathname === "/" && "text-blue-600"
          )}
        >
          <Search size={20} />
          <span className="text-xs font-medium">Search</span>
        </Link>
        
        <Link
          href="/favorites"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500",
            pathname === "/favorites" && "text-blue-600"
          )}
        >
          <Heart size={20} />
          <span className="text-xs font-medium">Favorites</span>
        </Link>
      </div>
    </div>
  );
}
