# RailPulse 🚆

RailPulse is a modern, real-time train tracking application built specifically for Indian Railways. Designed with a clean, fluid interface and mobile-first architecture, it provides an unparalleled experience for tracking live journeys, accessing route analytics, and monitoring real-time environmental context.

## ✨ Features

- **Live Train Tracking:** Track train locations accurately using MapLibre GL.
- **Journey Timeline:** See upcoming and passed stations with live delay data.
- **Environment Context:** Context-aware weather conditions and geographical terrain modeling along the route.
- **Analytics Dashboard:** Insights into 30-day punctuality, average delays, and max speed records.
- **Favorites & Sharing:** Pin your favorite trains directly to your device via `localStorage` and share them effortlessly via native Web APIs.
- **Progressive Web App (PWA) Ready:** Responsive layout designed for desktop, tablet, and mobile.

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Data Fetching:** React Query (@tanstack/react-query)
- **Maps:** maplibre-gl & @turf/turf
- **Icons:** lucide-react

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Architecture

- **`app/`**: Next.js App Router endpoints and page layouts.
- **`components/`**: Reusable UI blocks and domain-specific presentational elements.
- **`features/`**: Feature-scoped modules (e.g., Maps with Web Workers).
- **`store/`**: Global Zustand stores for Client-side state.
- **`lib/`**: Data access layer and utility wrappers (mock APIs).
