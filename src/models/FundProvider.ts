import mongoose, { Document, Schema, Types } from "mongoose";

interface ISponsorship {
  athleteId: Types.ObjectId;
  amount: number;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  terms: string;
  deliverables?: string[];
  paymentSchedule: 'one-time' | 'monthly' | 'quarterly' | 'yearly';
  milestones?: {
    description: string;
    dueDate: Date;
    status: 'pending' | 'completed';
  }[];
}

interface IEvent {
  title: string;
  description: string;
  date: Date;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  type: 'tournament' | 'exhibition' | 'training' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  participants: Types.ObjectId[];
  budget: number;
  ticketing?: {
    available: boolean;
    price: number;
    totalTickets: number;
    soldTickets: number;
  };
  streaming?: {
    platform: string;
    url: string;
    viewerCount: number;
  };
}

interface IFundProvider extends Document {
  // Organization Info
  companyName: string;
  email: string;
  password: string;
  phone: string;
  website?: string;
  logo: string;
  industry: string;
  description: string;
  
  // Verification
  verificationStatus: string;
  businessDocuments: {
    type: string;
    url: string;
    verified: boolean;
  }[];
  
  // Financial
  totalInvestment: number;
  sponsorships: ISponsorship[];
  paymentInfo: {
    businessId: string;
    bankDetails?: {
      accountName: string;
      accountNumber: string;
      bankName: string;
    };
  };
  
  // Events
  eventsOrganized: IEvent[];
  upcomingEvents: Types.ObjectId[];
  
  // Athletes
  sponsoredAthletes: Types.ObjectId[];
  savedAthletes: Types.ObjectId[];
  
  // System
  accountStatus: string;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FundProviderSchema = new Schema<IFundProvider>({
  // Organization Info
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
  website: String,
  logo: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  
  // Verification
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  businessDocuments: [{
    type: {
      type: String,
    },
    url: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  }],
  
  // Financial
  totalInvestment: {
    type: Number,
    default: 0,
  },
  sponsorships: [{
    athleteId: {
      type: Schema.Types.ObjectId,
      ref: 'Athlete',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    status: {
      type: String,
      enum: ['active', 'pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    terms: {
      type: String,
      required: true,
    },
    deliverables: [String],
    paymentSchedule: {
      type: String,
      enum: ['one-time', 'monthly', 'quarterly', 'yearly'],
    },
    milestones: [{
      description: String,
      dueDate: Date,
      status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
      },
    }],
  }],
  paymentInfo: {
    businessId: {
      type: String,
    },
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankName: String,
    },
  },
  
  // Events
  eventsOrganized: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      address: String,
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    type: {
      type: String,
      enum: ['tournament', 'exhibition', 'training', 'other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'Athlete',
    }],
    budget: {
      type: Number,
      required: true,
    },
    ticketing: {
      available: {
        type: Boolean,
        default: false,
      },
      price: Number,
      totalTickets: Number,
      soldTickets: {
        type: Number,
        default: 0,
      },
    },
    streaming: {
      platform: String,
      url: String,
      viewerCount: {
        type: Number,
        default: 0,
      },
    },
  }],
  upcomingEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
  }],
  
  // Athletes
  sponsoredAthletes: [{
    type: Schema.Types.ObjectId,
    ref: 'Athlete',
  }],
  savedAthletes: [{
    type: Schema.Types.ObjectId,
    ref: 'Athlete',
  }],
  
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

// Indexes
FundProviderSchema.index({ companyName: 1 });
FundProviderSchema.index({ email: 1 });
FundProviderSchema.index({ verificationStatus: 1 });
FundProviderSchema.index({ totalInvestment: -1 });
FundProviderSchema.index({ 'eventsOrganized.date': 1 });

const FundProviderModel = mongoose.models.FundProvider || mongoose.model<IFundProvider>('FundProvider', FundProviderSchema);

export default FundProviderModel;