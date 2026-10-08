import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 5) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.RAILRADAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ results: [], error: "Missing API Key" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.railradar.in/v1/trains/${query}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    if (!data.success || !data.data || !data.data.train) {
      return NextResponse.json({ results: [] });
    }

    const train = data.data.train;
    const route = data.data.route;
    
    let departureTime = "";
    let arrivalTime = "";
    
    if (route && route.length > 0) {
      departureTime = route[0].departure || "";
      arrivalTime = route[route.length - 1].arrival || "";
    }

    const localTrain = {
      id: train.number,
      name: train.name,
      number: train.number,
      origin: train.source.code,
      destination: train.destination.code,
      departureTime,
      arrivalTime,
      duration: `${Math.floor(train.duration / 60)}h ${train.duration % 60}m`,
      type: train.type || "Express"
    };

    return NextResponse.json({ results: [localTrain] });
  } catch (error) {
    return NextResponse.json({ results: [] });
  }
}
