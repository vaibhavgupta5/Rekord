import mongoose, { Document, Schema, Types } from "mongoose";

interface ICareer {
  sport: string;
  position: string;
  level: string; // 'professional', 'olympic', 'national', 'state'
  activeYears: {
    from: Date;
    to?: Date;
  };
  currentTeam?: string;
  pastTeams?: string[];
}

interface IStats {
  totalMatches: number;
  achievements: string[];
  rankings: {
    category: string;
    rank: number;
    date: Date;
  }[];
}

interface ICertification {
  type: string;  // 'identity', 'achievement', 'professional'
  documentUrl: string;
  issuedBy: string;
  issuedDate: Date;
  expiryDate?: Date;
  verificationStatus: string;
  verifiedAt?: Date;
}

interface IEvent {
  title: string;
  date: Date;
  location: string;
  type: string;
  status: string;
  participants: Types.ObjectId[];
}

interface IAthlete extends Document {
  // Basic Info
  email: string;
  username: string;
  name: string;
  password: string;
  phone: string;
  dateOfBirth: Date;
  nationality: string;
  location: string;
  
  // Profile Media
  profileImage: string;
  coverImage?: string;
  gallery: string[];
  
  // Professional Info
  career: ICareer;
  stats: IStats;
  bio: string;
  certifications: ICertification[];
  
  // Content
  shortVideos: Types.ObjectId[];
  longVideos: Types.ObjectId[];
  posts: Types.ObjectId[];
  
  // Events
  eventsOrganized: IEvent[];
  eventsParticipated: Types.ObjectId[];
  
  // Social & Engagement
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  totalFollowers: number;
  totalViews: number;
  
  // Verification & Status
  verificationStatus: string;
  accountStatus: string;
  featuredAthlete: boolean;
  ranking: number;
  
  // System
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AthleteSchema = new Schema<IAthlete>({
  // Basic Info
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  location: String,

  // Profile Media
  profileImage: {
    type: String,
    required: true,
  },
  coverImage: String,
  gallery: [String],

  // Professional Info
  career: {
    sport: {
      type: String,
      required: true,
    },
    position: String,
    level: {
      type: String,
      enum: ['professional', 'olympic', 'national', 'state'],
      required: true,
    },
    activeYears: {
      from: {
        type: Date,
        required: true,
      },
      to: Date,
    },
    currentTeam: String,
    pastTeams: [String],
  },

  stats: {
    totalMatches: {
      type: Number,
      default: 0,
    },
    achievements: [String],
    rankings: [{
      category: String,
      rank: Number,
      date: Date,
    }],
  },

  bio: {
    type: String,
    maxlength: 1000,
  },

  certifications: [{
    type: {
      type: String,
      required: true,
    },
    documentUrl: {
      type: String,
      required: true,
    },
    issuedBy: {
      type: String,
      required: true,
    },
    issuedDate: {
      type: Date,
      required: true,
    },
    expiryDate: Date,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verifiedAt: Date,
  }],

  // Content
  shortVideos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video',
  }],
  longVideos: [{
    type: Schema.Types.ObjectId,
    ref: 'Video',
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],

  // Events
  eventsOrganized: [{
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: String,
    type: String,
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'Audience',
    }],
  }],
  eventsParticipated: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
  }],

  // Social & Engagement
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'Audience',
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'Audience',
  }],
  totalFollowers: {
    type: Number,
    default: 0,
  },
  totalViews: {
    type: Number,
    default: 0,
  },

  // Verification & Status
  verificationStatus: {
    type: String,
    enum: ['unverified', 'pending', 'verified'],
    default: 'unverified',
  },
  accountStatus: {
    type: String,
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
  },
  featuredAthlete: {
    type: Boolean,
    default: false,
  },
  ranking: {
    type: Number,
    default: 0,
  },

  // System
  lastActive: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Indexes
// AthleteSchema.index({ username: 1 });
// AthleteSchema.index({ email: 1 });
// AthleteSchema.index({ 'career.sport': 1 });
// AthleteSchema.index({ ranking: -1 });
// AthleteSchema.index({ verificationStatus: 1 });
// AthleteSchema.index({ featuredAthlete: 1 });

const AthleteModel = mongoose.models.Athlete || mongoose.model<IAthlete>('Athlete', AthleteSchema);

export default AthleteModel;