import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import Navbar from "@/components/layout/Navbar";
import BottomNav from "@/components/layout/BottomNav";

import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RailPulse — Live Train Tracking",
  description: "Track Indian trains live with real-time location, delay updates, route analytics, weather and journey intelligence.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RailPulse",
  },
};

export const viewport = {
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-rp-bg-secondary text-rp-text-very-dark min-h-screen flex flex-col`}>
        <QueryProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
            {children}
          </main>
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
