import { NextResponse } from "next/server";
import AudienceModel from "@/models/Audience";
import {connectDB} from "@/utils/connectDB";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB(); // Ensure DB is connected

    const body = await req.json();
    const { email, username, name, password, avatar, bio } = body;

    // Validate required fields
    if (!email || !username || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if audience already exists
    const existingAudience = await AudienceModel.findOne({ $or: [{ email }, { username }] });
    if (existingAudience) {
      return NextResponse.json({ error: "Email or username already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new audience
    const newAudience = new AudienceModel({
      email,
      username,
      name,
      password: hashedPassword,
      avatar,
      bio,
      following: [],
      followers: [],
      socialStats: { totalLikes: 0, totalComments: 0, totalFollowing: 0, totalFollowers: 0 },
      likedPosts: [],
      likedVideos: [],
      savedPosts: [],
      comments: [],
      shortVideos: [],
      supportHistory: [],
      paymentInfo: {},
      accountStatus: "active",
      lastActive: new Date(),
    });

    await newAudience.save();

    return NextResponse.json({ message: "Audience created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating audience:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
