import mongoose, { Document, Schema, Types } from "mongoose";
import AthleteModel from "@/models/Athlete"; // Import the Athlete model

interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  media?: { url: string; type: "image" | "video" | "other" }[]; // Array of media objects
  likes: Types.ObjectId[]; // Users who liked
  comments: Types.ObjectId[]; // Comment references
  likeCount: number; // Cached count
  commentCount: number; // Cached count
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Athlete",
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    media: [
      {
        url: { type: String, required: true },
        type: {
          type: String,
          enum: ["image", "video", "other"],
          required: true,
        },
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Audience",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to auto-update counts when likes or comments change
PostSchema.pre("save", function (next) {
  this.likeCount = this.likes.length;
  this.commentCount = this.comments.length;
  next();
});

const PostModel =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default PostModel;
