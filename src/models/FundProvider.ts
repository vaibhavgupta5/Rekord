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
  
  // Events - Updated to use Event model
  eventsOrganized: Types.ObjectId[];
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
  
  // Events - Updated to use Event model
  eventsOrganized: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
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

const FundProviderModel = mongoose.models.FundProvider || mongoose.model<IFundProvider>('FundProvider', FundProviderSchema);

export default FundProviderModel;