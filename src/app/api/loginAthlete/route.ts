import { NextRequest, NextResponse } from "next/server";
import AthleteModel from "@/models/Athlete";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected

    const body = await req.json();
    const { email, password } = body;

    // Check if athlete exists and explicitly include the password field
    const existingAthlete = await AthleteModel.findOne({ email }).select("+password");
    if (!existingAthlete) {
      return NextResponse.json({ error: "Email does not exist" }, { status: 400 });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, existingAthlete.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Password is incorrect" }, { status: 400 });
    }

    return NextResponse.json({ message: "Athlete logged in successfully" , data: existingAthlete}, { status: 200 });
  } catch (error) {
    console.error("Error logging in athlete:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
