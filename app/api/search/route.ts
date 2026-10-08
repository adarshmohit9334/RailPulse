import { NextResponse } from "next/server";
import { searchLocalTrains } from "@/lib/trains-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = searchLocalTrains(query);
  return NextResponse.json({ results });
}
