import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, sparse: true },
    phone: { type: String, required: true },
    avatar: String,
    password: { type: String, select: false }, // For local auth
    messagingLink: { type: String }, // Messenger/WhatsApp link
    
    // OAuth fields
    googleId: String,
    facebookId: String,
    
    // Profile information
    location: {
      city: String,
      region: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    bio: { type: String, maxlength: 500 },
    
    // Verification and trust
    verified: { type: Boolean, default: false },
    verificationMethod: { 
      type: String, 
      enum: ['email', 'phone', 'identity', 'facebook', 'google'],
      default: 'phone'
    },
    
    // Ratings and reviews
    rating: { type: Number, min: 1, max: 5, default: 5 },
    reviewCount: { type: Number, default: 0 },
    
    // Activity stats
    listingsCount: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },
    responseTime: { 
      type: String, 
      enum: ['within-hour', 'within-day', 'within-week', 'slow'],
      default: 'within-day'
    },
    lastActiveAt: { type: Date, default: Date.now },
    
    // Preferences
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false }
      },
      privacy: {
        showPhone: { type: Boolean, default: true },
        showEmail: { type: Boolean, default: false },
        showLastActive: { type: Boolean, default: true }
      }
    },
    
    // Social features
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
    savedSearches: [{
      query: String,
      filters: mongoose.Schema.Types.Mixed,
      createdAt: { type: Date, default: Date.now }
    }],
    
    // Business features
    isBusiness: { type: Boolean, default: false },
    businessInfo: {
      name: String,
      description: String,
      address: String
    },
    
    // Account status
    status: {
      type: String,
      enum: ['active', 'suspended', 'banned'],
      default: 'active'
    }
  },
  { 
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ facebookId: 1 });
userSchema.index({ verified: 1, rating: -1 });

// Virtuals
userSchema.virtual('responseTimeText').get(function() {
  const timeMap = {
    'within-hour': 'Usually responds within an hour',
    'within-day': 'Usually responds within a day', 
    'within-week': 'Usually responds within a week',
    'slow': 'Response time varies'
  };
  return timeMap[this.responseTime] || timeMap['within-day'];
});

// Methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.addToFavorites = function(listingId) {
  if (!this.favorites.includes(listingId)) {
    this.favorites.push(listingId);
    return this.save();
  }
  return Promise.resolve(this);
};

userSchema.methods.removeFromFavorites = function(listingId) {
  this.favorites = this.favorites.filter(id => !id.equals(listingId));
  return this.save();
};

userSchema.methods.updateActivity = function() {
  this.lastActiveAt = new Date();
  return this.save();
};

// Pre-save middleware
userSchema.pre('save', async function(next) {
  // Hash password if modified
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() }).select('+password');
};

userSchema.statics.findByPhone = function(phone) {
  return this.findOne({ phone });
};

export default mongoose.model('User', userSchema);
