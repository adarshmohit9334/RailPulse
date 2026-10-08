"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart } from "lucide-react";
import { cn } from "@/utils/cn";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-rp-surface border-t border-rp-border pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 text-rp-text-secondary",
            pathname === "/" && "text-rp-blue-primary-dark"
          )}
        >
          <Search size={20} />
          <span className="text-xs font-medium">Search</span>
        </Link>
        
        <Link
          href="/favorites"
          className={cn(
            "flex flex-col items-center justify-center w-full h-full space-y-1 text-rp-text-secondary",
            pathname === "/favorites" && "text-rp-blue-primary-dark"
          )}
        >
          <Heart size={20} />
          <span className="text-xs font-medium">Favorites</span>
        </Link>
      </div>
    </div>
  );
}
