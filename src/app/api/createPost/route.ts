import { NextResponse } from "next/server";
import PostModel from "@/models/Post";
import AthleteModel from "@/models/Athlete";
import { connectDB } from "@/utils/connectDB";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { content, media, athleteId } = body;

    if (!content || content.trim() === "") {
      return NextResponse.json({ success: false, message: "Content is required" }, { status: 400 });
    }

    // Ensure the user is an athlete
    const athlete = await AthleteModel.findById(athleteId);
    if (!athlete) {
      return NextResponse.json({ success: false, message: "Only athletes can post" }, { status: 403 });
    }

    // Create the post
    const newPost = await PostModel.create({
      author: athleteId,
      content,
      media,
      likes: [],
      comments: [],
      likeCount: 0,
      commentCount: 0,
    });


   
    athlete.posts.push(newPost._id);
    
    await athlete.save();


    return NextResponse.json({ success: true, message: "Post created successfully", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
