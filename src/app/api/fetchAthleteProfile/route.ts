import { NextRequest, NextResponse } from "next/server";
import AthleteModel from "@/models/Athlete";
import { connectDB } from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Ensure database connection
    // // Optional: Check if user is authenticated
    // const session = await getAuthSession(req);
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    

    const body = await req.json();

    const { athleteId } = body;

    // Fetch athlete details with populated fields including posts
    const athlete = await AthleteModel.findById(athleteId)
      // .populate("sponsorships.athleteId", "name avatar")
      // .populate("eventsParticipated")
      // .populate("posts")
      .lean();
    
    if (!athlete) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
    }
    
    return NextResponse.json({ athlete }, { status: 200 });
  } catch (error) {
    console.error("Error fetching athlete profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}