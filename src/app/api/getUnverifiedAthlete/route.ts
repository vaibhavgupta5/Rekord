import { NextResponse } from "next/server";
import AthleteModel from "@/models/Athlete";
import { connectDB } from "@/utils/connectDB";


export async function GET() {
  try {
    await connectDB(); // Ensure DB is connected


    // Find athlete
    const athlete = await AthleteModel.find();

    const unverifiedAthlete = athlete.filter((athlete) => athlete.verificationStatus === "unverified");

    console.log(unverifiedAthlete)
    if (!athlete) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
    }


    return NextResponse.json({ message: "Athlete fetched successfully" , unverifiedAthlete }, { status: 200 });
  } catch (error) {
    console.error("Error verifying athlete:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
