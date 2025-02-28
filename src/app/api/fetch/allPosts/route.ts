import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import PostModel from "@/models/Post";
import "@/models/Athlete";

export async function GET() {
  await connectDB();

  try {
    
    // Now models should be properly registered
    
    const posts = await PostModel.find({})
      .sort({ createdAt: -1 })
      .populate("author")
      .limit(50);

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}