import mongoose, { Document, Schema } from "mongoose";

interface ISuperAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin' | 'moderator';
  
  // Core Permissions
  permissions: {
    manageUsers: boolean;      // Manage athletes, audience, fund providers
    manageContent: boolean;    // Moderate posts, videos, comments
    manageEvents: boolean;     // Oversee events and sponsorships
    viewAnalytics: boolean;    // Access to platform statistics
  };
  
  // Basic Tracking
  lastLogin: Date;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const SuperAdminSchema = new Schema<ISuperAdmin>({
  name: {
    type: String,
    required: true,
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
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'moderator'],
    default: 'moderator',
  },
  
  // Core Permissions
  permissions: {
    manageUsers: {
      type: Boolean,
      default: false,
    },
    manageContent: {
      type: Boolean,
      default: false,
    },
    manageEvents: {
      type: Boolean,
      default: false,
    },
    viewAnalytics: {
      type: Boolean,
      default: false,
    },
  },
  
  // Basic Tracking
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, {
  timestamps: true,
});

// Essential indexes
SuperAdminSchema.index({ email: 1 });
SuperAdminSchema.index({ role: 1 });

const SuperAdminModel = mongoose.models.SuperAdmin || mongoose.model<ISuperAdmin>('SuperAdmin', SuperAdminSchema);

export default SuperAdminModel;