// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import FundProviderModel from "@/models/FundProvider";
import EventModel from "@/models/Event";

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Get request body
    const eventData = await req.json();
    
    // Get fund provider ID from request or query
    // In a real app, this would come from authentication
    const fundProviderId = eventData.fundProviderId || req.nextUrl.searchParams.get("fundProviderId");
    
    if (!fundProviderId) {
      return NextResponse.json(
        { error: "Fund provider ID is required" },
        { status: 400 }
      );
    }
    
    // Find the fund provider
    const fundProvider = await FundProviderModel.findById(fundProviderId);
    
    if (!fundProvider) {
      return NextResponse.json(
        { error: "Fund provider not found" },
        { status: 404 }
      );
    }
    
    // Create new event document
    const newEvent = new EventModel({
      title: eventData.title,
      description: eventData.description,
      date: new Date(eventData.date),
      location: {
        address: eventData.location?.address,
        city: eventData.location?.city,
        country: eventData.location?.country,
        coordinates: eventData.location?.coordinates
      },
      type: eventData.type,
      status: eventData.status || "upcoming",
      organizer: fundProviderId, // Reference to the fund provider
      participants: eventData.participants || [],
      budget: eventData.budget,
      ticketing: eventData.ticketing,
      streaming: eventData.streaming
    });
    
    // Save the new event document
    const savedEvent = await newEvent.save();
    
    // Add the event ID to the fund provider's eventsOrganized array
    fundProvider.eventsOrganized.push(savedEvent._id);
    
    // If the event is upcoming, also add it to upcomingEvents
    if (savedEvent.status === 'upcoming') {
      fundProvider.upcomingEvents.push(savedEvent._id);
    }
    
    // Update lastActive field
    fundProvider.lastActive = new Date();
    
    // Save the updated fund provider document
    await fundProvider.save();
    
    // Return the newly created event
    return NextResponse.json({
      success: true,
      message: "Event created successfully",
      event: savedEvent
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event", details: (error as Error).message },
      { status: 500 }
    );
  }
}