import { NextRequest, NextResponse } from "next/server";
import AthleteModel from "@/models/Athlete";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected

    const body = await req.json();
    const { email, username, name, password, phone, dateOfBirth, nationality, location, profileImage, career, stats, bio } = body;

    // // Validate required fields
    // if (!email || !username || !name || !password || !phone || !dateOfBirth || !nationality || !profileImage || !career) {
    //   return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    // }

    // Check if athlete already exists
    const existingAthlete = await AthleteModel.findOne({ $or: [{ email }, { username }] });
    if (existingAthlete) {
      return NextResponse.json({ error: "Email or username already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new athlete
    const newAthlete = new AthleteModel({
      email,
      username,
      name,
      password: hashedPassword,
      phone,
      dateOfBirth,
      nationality,
      location,
      profileImage,
      career,
      stats: stats || { totalMatches: 0, achievements: [], rankings: [] },
      bio,
      gallery: [],
      certifications: [],
      shortVideos: [],
      longVideos: [],
      posts: [],
      eventsOrganized: [],
      eventsParticipated: [],
      followers: [],
      following: [],
      totalFollowers: 0,
      totalViews: 0,
      verificationStatus: "unverified",
      accountStatus: "active",
      featuredAthlete: false,
      ranking: 0,
    });

    await newAthlete.save();

    return NextResponse.json({ message: "Athlete created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating athlete:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
