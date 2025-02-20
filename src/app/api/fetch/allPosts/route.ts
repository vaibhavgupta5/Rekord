import { NextResponse } from "next/server";
import PostModel from "@/models/Post";
import { connectDB } from "@/utils/connectDB";

export async function GET() {
  try {
    await connectDB();

    // Fetch posts sorted by newest first
    const posts = await PostModel.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("author", "name profileImage") // Populate author details
      .populate("comments", "content createdAt") // Populate comments (optional)
      .limit(50); // Limit results (adjust as needed)

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
