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

    // Process media - if it's a string URL, convert to the expected format
    const mediaArray = media ? [
      {
        url: media,
        // Simple media type detection based on URL extension
        type: getMediaType(media)
      }
    ] : [];

    // Create the post with the updated schema
    const newPost = await PostModel.create({
      author: athleteId,
      content,
      media: mediaArray,
      likes: [],
      comments: [],
      // likeCount and commentCount will be set by the pre-save middleware
    });
    
    // Update the athlete's posts array
    athlete.posts.push(newPost._id);
    await athlete.save();
    
    return NextResponse.json({ 
      success: true, 
      message: "Post created successfully", 
      post: newPost 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}

// Helper function to determine media type from URL
function getMediaType(url: string): "image" | "video" | "other" {
  const lowercaseUrl = url.toLowerCase();
  
  // Check for image extensions
  if (lowercaseUrl.match(/\.(jpeg|jpg|gif|png|svg|webp)(\?.*)?$/)) {
    return "image";
  }
  
  // Check for video extensions
  if (lowercaseUrl.match(/\.(mp4|webm|ogg|mov|avi|wmv)(\?.*)?$/)) {
    return "video";
  }
  
  // Default to other if can't determine
  return "other";
}