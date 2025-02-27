// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import FundProviderModel from "@/models/FundProvider";

export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Fetch all events from all fund providers
    const fundProviders = await FundProviderModel.find({}, "eventsOrganized");
    
    // Flatten the events into a single array
    const allEvents = fundProviders.flatMap(provider => provider.eventsOrganized);
    
    return NextResponse.json({
      success: true,
      events: allEvents
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: (error as Error).message },
      { status: 500 }
    );
  }
}
