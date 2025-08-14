import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number }, // For showing discounts
    currency: { type: String, default: 'PHP' },
    category: { type: String, index: true },
    condition: { 
      type: String, 
      enum: ['new', 'like-new', 'good', 'fair', 'poor'], 
      default: 'good' 
    },
    location: {
      city: String,
      region: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      address: String
    },
    images: [{ 
      url: String, 
      publicId: String,
      alt: String, // Accessibility
      isPrimary: { type: Boolean, default: false }
    }],
    seller: {
      name: String,
      phone: String,
      messagingLink: String,
      email: String,
      verified: { type: Boolean, default: false },
      rating: { type: Number, min: 1, max: 5, default: 5 },
      reviewCount: { type: Number, default: 0 },
      joinedDate: { type: Date, default: Date.now },
      responseTime: String, // e.g., "Usually responds within an hour"
    },
    status: { 
      type: String, 
      enum: ['active', 'sold', 'reserved', 'pending', 'draft'], 
      default: 'active', 
      index: true 
    },
    features: [String], // e.g., ["negotiable", "urgent", "delivery-available"]
    tags: [String], // For better search
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    inquiries: { type: Number, default: 0 },
    isPromoted: { type: Boolean, default: false },
    promotedUntil: Date,
    negotiable: { type: Boolean, default: true },
    deliveryOptions: [{
      type: { type: String, enum: ['pickup', 'delivery', 'shipping'] },
      cost: Number,
      timeframe: String
    }],
    socialProof: {
      urgencyText: String, // e.g., "3 people viewing this"
      similarSoldCount: Number // e.g., "5 similar items sold this week"
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better performance
listingSchema.index({ title: 'text', description: 'text', tags: 'text' });
listingSchema.index({ category: 1, status: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ 'location.city': 1, 'location.region': 1 });
listingSchema.index({ createdAt: -1 });
listingSchema.index({ views: -1 });
listingSchema.index({ 'seller.rating': -1 });
listingSchema.index({ 'location.coordinates.latitude': 1, 'location.coordinates.longitude': 1 });

// Virtual for distance calculation (if user location is provided)
listingSchema.virtual('distance').get(function() {
  return this._distance;
});

// Virtual for deal detection
listingSchema.virtual('isDeal').get(function() {
  return this.originalPrice && this.price < this.originalPrice * 0.8;
});

// Virtual for primary image
listingSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary || this.images[0];
});

// Methods
listingSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

listingSchema.methods.addToFavorites = function() {
  this.favorites += 1;
  return this.save();
};

listingSchema.methods.removeFromFavorites = function() {
  this.favorites = Math.max(0, this.favorites - 1);
  return this.save();
};

listingSchema.methods.addInquiry = function() {
  this.inquiries += 1;
  return this.save();
};

// Static methods for advanced queries
listingSchema.statics.findByDistance = function(lat, lng, maxDistance = 50) {
  return this.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distance",
        maxDistance: maxDistance * 1000, // Convert km to meters
        spherical: true
      }
    }
  ]);
};

listingSchema.statics.findDeals = function() {
  return this.find({
    $expr: {
      $and: [
        { $ne: ["$originalPrice", null] },
        { $lt: ["$price", { $multiply: ["$originalPrice", 0.8] }] }
      ]
    }
  });
};

listingSchema.statics.findPopular = function() {
  return this.find({ status: 'active' })
    .sort({ views: -1, favorites: -1, createdAt: -1 });
};

export default mongoose.model('Listing', listingSchema);
