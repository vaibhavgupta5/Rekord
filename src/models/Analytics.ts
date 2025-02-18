import mongoose, { Document, Schema, Types } from "mongoose";

interface ITrendingAthlete {
  athleteId: Types.ObjectId;
  score: number;  // Calculated based on engagement
  rank: number;
  metrics: {
    viewsLast24h: number;
    viewsLast7d: number;
    likesLast24h: number;
    likesLast7d: number;
    commentsLast24h: number;
    commentsLast7d: number;
    followersGained24h: number;
    supportReceived24h: number;
  };
  lastUpdated: Date;
}

interface IEventAnalytics {
  eventId: Types.ObjectId;
  viewCount: number;
  registrations: number;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  ticketsSold?: number;
  revenue?: number;
}

interface IPlatformStats {
  date: Date;
  activeUsers: number;
  newUsers: number;
  totalTransactions: number;
  totalRevenue: number;
  topSports: {
    sport: string;
    athleteCount: number;
    viewCount: number;
  }[];
}

interface IAnalytics extends Document {
  // Trending Athletes
  trendingAthletes: {
    daily: ITrendingAthlete[];
    weekly: ITrendingAthlete[];
    monthly: ITrendingAthlete[];
  };
  
  // Event Analytics
  activeEvents: IEventAnalytics[];
  upcomingEvents: IEventAnalytics[];
  
  // Achievement Highlights
  recentAchievements: {
    athleteId: Types.ObjectId;
    achievement: string;
    date: Date;
    engagement: {
      views: number;
      likes: number;
      shares: number;
    };
  }[];
  
  // Support Analytics
  topSupportedAthletes: {
    athleteId: Types.ObjectId;
    totalSupport: number;
    supporterCount: number;
    period: 'daily' | 'weekly' | 'monthly';
  }[];
  
  // Platform Statistics
  platformStats: IPlatformStats;
  
  // Cache Control
  lastUpdated: {
    trendingAthletes: Date;
    eventAnalytics: Date;
    achievements: Date;
    supportStats: Date;
    platformStats: Date;
  };
}

const AnalyticsSchema = new Schema<IAnalytics>({
  // Trending Athletes
  trendingAthletes: {
    daily: [{
      athleteId: {
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      rank: {
        type: Number,
        required: true,
      },
      metrics: {
        viewsLast24h: {
          type: Number,
          default: 0,
        },
        viewsLast7d: {
          type: Number,
          default: 0,
        },
        likesLast24h: {
          type: Number,
          default: 0,
        },
        likesLast7d: {
          type: Number,
          default: 0,
        },
        commentsLast24h: {
          type: Number,
          default: 0,
        },
        commentsLast7d: {
          type: Number,
          default: 0,
        },
        followersGained24h: {
          type: Number,
          default: 0,
        },
        supportReceived24h: {
          type: Number,
          default: 0,
        },
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    }],
    weekly: [/* Same structure as daily */],
    monthly: [/* Same structure as daily */],
  },
  
  // Event Analytics
  activeEvents: [{
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    registrations: {
      type: Number,
      default: 0,
    },
    engagement: {
      likes: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
    },
    ticketsSold: Number,
    revenue: Number,
  }],
  upcomingEvents: [/* Same structure as activeEvents */],
  
  // Achievement Highlights
  recentAchievements: [{
    athleteId: {
      type: Schema.Types.ObjectId,
      ref: 'Athlete',
      required: true,
    },
    achievement: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    engagement: {
      views: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
    },
  }],
  
  // Support Analytics
  topSupportedAthletes: [{
    athleteId: {
      type: Schema.Types.ObjectId,
      ref: 'Athlete',
      required: true,
    },
    totalSupport: {
      type: Number,
      required: true,
    },
    supporterCount: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: true,
    },
  }],
  
  // Platform Statistics
  platformStats: {
    date: {
      type: Date,
      required: true,
    },
    activeUsers: {
      type: Number,
      default: 0,
    },
    newUsers: {
      type: Number,
      default: 0,
    },
    totalTransactions: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    topSports: [{
      sport: String,
      athleteCount: Number,
      viewCount: Number,
    }],
  },
  
  // Cache Control
  lastUpdated: {
    trendingAthletes: {
      type: Date,
      default: Date.now,
    },
    eventAnalytics: {
      type: Date,
      default: Date.now,
    },
    achievements: {
      type: Date,
      default: Date.now,
    },
    supportStats: {
      type: Date,
      default: Date.now,
    },
    platformStats: {
      type: Date,
      default: Date.now,
    },
  },
}, {
  timestamps: true,
});

// Indexes
AnalyticsSchema.index({ 'trendingAthletes.daily.rank': 1 });
AnalyticsSchema.index({ 'trendingAthletes.weekly.rank': 1 });
AnalyticsSchema.index({ 'trendingAthletes.monthly.rank': 1 });
AnalyticsSchema.index({ 'activeEvents.viewCount': -1 });
AnalyticsSchema.index({ 'lastUpdated.trendingAthletes': 1 });

const AnalyticsModel = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default AnalyticsModel;