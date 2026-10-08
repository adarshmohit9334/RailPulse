import { NextResponse } from "next/server";
import { fetchLiveJourney } from "@/lib/railradar";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Train ID is required" }, { status: 400 });
    }

    const journey = await fetchLiveJourney(id);
    return NextResponse.json(journey);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch train details" },
      { status: 404 }
    );
  }
}
