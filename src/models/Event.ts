// First, let's create an Event model
// models/Event.ts
import mongoose, { Document, Schema, Types } from "mongoose";

interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: {
    address?: string;
    city?: string;
    country?: string;
    coordinates?: number[];
  };
  type: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizer: Types.ObjectId; // Reference to fund provider
  participants: Types.ObjectId[]; // References to athletes
  budget?: number;
  ticketing?: {
    available: boolean;
    price?: number;
    url?: string;
  };
  streaming?: {
    available: boolean;
    platform?: string;
    url?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    address: String,
    city: String,
    country: String,
    coordinates: [Number]
  },
  type: {
    type: String,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'FundProvider',
    required: true
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'Athlete'
  }],
  budget: Number,
  ticketing: {
    available: Boolean,
    price: Number,
    url: String
  },
  streaming: {
    available: Boolean,
    platform: String,
    url: String
  }
}, {
  timestamps: true
});

// Indexes
// EventSchema.index({ title: 1 });
// EventSchema.index({ date: 1 });
// EventSchema.index({ organizer: 1 });
// EventSchema.index({ status: 1 });

const EventModel = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default EventModel;