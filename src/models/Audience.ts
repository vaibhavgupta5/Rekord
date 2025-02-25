import mongoose, { Document, Schema, Types } from "mongoose";

interface ISocialStats {
  totalLikes: number;
  totalComments: number;
  totalFollowing: number;
  totalFollowers: number;
}

interface ISupport {
  athleteId: Types.ObjectId;
  amount: number;
  date: Date;
  message?: string;
  type: 'money' | 'work';
  status: 'pending' | 'completed' | 'cancelled';
}

interface IAudience extends Document {
  // Basic Info
  email: string;
  username: string;
  name: string;
  password: string;
  avatar?: string;
  bio?: string;
  
  // Social
  following: Types.ObjectId[];      // Athletes & other audience members they follow
  followers: Types.ObjectId[];      // Other audience members following them
  socialStats: ISocialStats;
  
  // Interaction History
  likedPosts: Types.ObjectId[];
  likedVideos: Types.ObjectId[];
  savedPosts: Types.ObjectId[];
  comments: Types.ObjectId[];
  
  // Content
  shortVideos: Types.ObjectId[];    // Their own video content
  
  // Support/Donations
  supportHistory: ISupport[];       // History of support given to athletes
  paymentInfo?: {
    stripeCustomerId?: string;
    lastPaymentDate?: Date;
  };
  
  // System
  accountStatus: string;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AudienceSchema = new Schema<IAudience>({
  // Basic Info
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: String,
  bio: {
    type: String,
    maxlength: 300,
  },
  
  // Social
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'Athlete',
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'Audience',
  }],
  socialStats: {
    totalLikes: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
    totalFollowing: {
      type: Number,
      default: 0,
    },
    totalFollowers: {
      type: Number,
      default: 0,
    },
  },
  
  // Interaction History
  likedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  likedVideos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video',
  }],
  savedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  
  // Content
  shortVideos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video',
  }],
  
  // Support/Donations
  supportHistory: [{
    athleteId: {
      type: Schema.Types.ObjectId,
      ref: 'Athlete',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    message: String,
    type: {
      type: String,
      enum: ['money', 'work'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
  }],
  paymentInfo: {
    stripeCustomerId: String,
    lastPaymentDate: Date,
  },
  
  // System
  accountStatus: {
    type: String,
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});


const AudienceModel = mongoose.models.Audience || mongoose.model<IAudience>('Audience', AudienceSchema);

export default AudienceModel;