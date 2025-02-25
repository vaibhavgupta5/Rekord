import { NextResponse } from "next/server";
import AthleteModel from "@/models/Athlete";
import { connectDB } from "@/utils/connectDB";

import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected

    const body = await req.json();
    const { athleteId, adminId } = body;

    // Validate required fields
    if (!athleteId || !adminId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find athlete
    const athlete = await AthleteModel.findById(athleteId);
    if (!athlete) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
    }

    // Verify athlete
    athlete.verificationStatus = "verified";
    athlete.verifiedAt = new Date();
    await athlete.save();

    return NextResponse.json({ message: "Athlete verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying athlete:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
