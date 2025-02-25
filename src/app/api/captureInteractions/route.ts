import { NextResponse } from "next/server";
import PostModel from "@/models/Post";
import AthleteModel from "@/models/Athlete";
import { connectDB } from "@/utils/connectDB";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { postId, userId } = await req.json();

    const post = await PostModel.findById(postId);
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    // Check if already liked
    const alreadyLiked = await PostModel.exists({ _id: postId, likes: userId });
    if (alreadyLiked) {
      return NextResponse.json({ success: false, message: "Already liked" }, { status: 400 });
    }

    // Get the post author (athlete)
    const athlete = await AthleteModel.findById(post.author);
    if (!athlete) {
      return NextResponse.json({ success: false, message: "Athlete not found" }, { status: 404 });
    }

    // Update both PostModel and AthleteModel
    await Promise.all([
      PostModel.updateOne(
        { _id: postId },
        { $inc: { likeCount: 1 }, $push: { likes: userId } }
      ),
      AthleteModel.updateOne(
        { _id: post.author },
        { $inc: { totalViews: 1 } } // Assuming totalViews is used for engagement tracking
      )
    ]);

    return NextResponse.json({ success: true, message: "Post liked & athlete engagement updated" }, { status: 200 });
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
