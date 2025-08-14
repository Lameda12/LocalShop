import mongoose from 'mongoose';
import Listing from '../models/Listing.js';
import User from '../models/User.js';

export async function createListing(req, res, next) {
  try {
    const { 
      title, 
      description, 
      price, 
      originalPrice,
      category, 
      condition,
      city, 
      region, 
      sellerName, 
      sellerPhone, 
      sellerEmail,
      messagingLink,
      negotiable,
      features,
      tags
    } = req.body;
    
    const images = (req.files || []).map((f, index) => ({ 
      url: f.path, 
      publicId: f.filename,
      alt: `${title} - Image ${index + 1}`,
      isPrimary: index === 0
    }));

    // Enhanced listing data
    const listingData = {
      title: title.trim(),
      description: description?.trim() || '',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      condition: condition || 'good',
      location: { 
        city: city?.trim(), 
        region: region?.trim()
      },
      images,
      seller: { 
        name: sellerName?.trim(), 
        phone: sellerPhone?.trim(), 
        email: sellerEmail?.trim(),
        messagingLink: messagingLink?.trim(),
        verified: false, // Default to false, can be updated later
        rating: 5, // Default rating
        reviewCount: 0,
        responseTime: 'Usually responds within a day'
      },
      negotiable: negotiable === 'true' || negotiable === true,
      features: features ? features.split(',').map(f => f.trim()) : [],
      tags: tags ? tags.split(',').map(t => t.trim().toLowerCase()) : [],
      deliveryOptions: []
    };

    // Auto-generate tags from title and category
    const autoTags = title.toLowerCase().split(' ').filter(word => word.length > 2);
    listingData.tags = [...new Set([...listingData.tags, ...autoTags, category?.toLowerCase()].filter(Boolean))];

    const doc = await Listing.create(listingData);
    
    // Populate seller info for response
    await doc.populate('seller');
    
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

export async function getListings(req, res, next) {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        items: [],
        nextCursor: null,
        analytics: { totalItems: 0, averagePrice: 0, withImages: 0, verified: 0 },
        filters: {},
        message: 'Database connecting... Please try again in a moment.'
      });
    }
    const { 
      q, 
      category, 
      minPrice, 
      maxPrice, 
      city, 
      region, 
      sellerPhone, 
      sellerName, 
      hasImages, 
      status = 'active', 
      cursor, 
      limit = 20, 
      sort = 'newest',
      lat,
      lng,
      verified,
      condition,
      negotiable,
      features
    } = req.query;

    const filter = { status };
    
    // Basic filters
    if (category) filter.category = category;
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (region) filter['location.region'] = new RegExp(region, 'i');
    if (sellerPhone) filter['seller.phone'] = sellerPhone;
    if (sellerName) filter['seller.name'] = new RegExp(sellerName, 'i');
    if (hasImages === 'true') filter['images.0'] = { $exists: true };
    if (verified === 'true') filter['seller.verified'] = true;
    if (condition) filter.condition = condition;
    if (negotiable === 'true') filter.negotiable = true;
    if (features) {
      const featureList = features.split(',').map(f => f.trim());
      filter.features = { $in: featureList };
    }
    
    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Text search with better scoring
    if (q) {
      filter.$text = { $search: q };
    }

    const pageSize = Math.min(Number(limit) || 20, 50);

    // Enhanced sorting strategy
    let sortObj = { createdAt: -1 };
    let useCursor = true;
    let useAggregation = false;
    
    switch (sort) {
      case 'price_asc':
        sortObj = { price: 1, createdAt: -1 };
        useCursor = false;
        break;
      case 'price_desc':
        sortObj = { price: -1, createdAt: -1 };
        useCursor = false;
        break;
      case 'popular':
        sortObj = { views: -1, favorites: -1, createdAt: -1 };
        useCursor = false;
        break;
      case 'distance':
        if (lat && lng) {
          useAggregation = true;
          useCursor = false;
        }
        break;
      default: // newest
        sortObj = { createdAt: -1 };
    }

    // Cursor pagination only for newest (createdAt desc)
    if (useCursor && cursor) {
      filter.createdAt = { $lt: new Date(cursor) };
    }

    let items;
    
    if (useAggregation && lat && lng) {
      // Use aggregation for distance-based search
      const pipeline = [
        {
          $geoNear: {
            near: { 
              type: "Point", 
              coordinates: [Number(lng), Number(lat)] 
            },
            distanceField: "distance",
            maxDistance: 50000, // 50km radius
            spherical: true,
            query: filter
          }
        },
        {
          $addFields: {
            distanceKm: { $round: [{ $divide: ["$distance", 1000] }, 1] }
          }
        },
        { $limit: pageSize + 1 },
        {
          $project: {
            title: 1,
            price: 1,
            originalPrice: 1,
            category: 1,
            condition: 1,
            location: 1,
            'images.url': 1,
            'images.isPrimary': 1,
            createdAt: 1,
            'seller.name': 1,
            'seller.verified': 1,
            'seller.rating': 1,
            'seller.reviewCount': 1,
            views: 1,
            favorites: 1,
            negotiable: 1,
            features: 1,
            distanceKm: 1,
            isDeal: 1
          }
        }
      ];
      
      items = await Listing.aggregate(pipeline);
    } else {
      // Standard query
      items = await Listing.find(filter)
        .sort(sortObj)
        .limit(pageSize + 1)
        .select(`
          title 
          price 
          originalPrice
          category 
          condition
          location 
          images.url 
          images.isPrimary
          createdAt 
          seller.name 
          seller.verified
          seller.rating
          seller.reviewCount
          views 
          favorites 
          negotiable
          features
          isDeal
        `)
        .lean();
    }

    // Handle pagination
    let nextCursor = null;
    if (useCursor && items.length > pageSize) {
      const last = items.pop();
      nextCursor = last.createdAt;
    } else if (items.length > pageSize) {
      items.length = pageSize;
    }

    // Add computed fields for frontend
    items = items.map(item => ({
      ...item,
      primaryImage: item.images?.find(img => img.isPrimary) || item.images?.[0],
      isHotDeal: item.originalPrice && item.price < item.originalPrice * 0.8,
      priceDisplay: `₱${item.price.toLocaleString()}`,
      sellerRating: item.seller?.rating || 5,
      isVerified: item.seller?.verified || false
    }));

    // Analytics data
    const totalItems = await Listing.countDocuments(filter);
    const analytics = {
      totalItems,
      averagePrice: items.length > 0 ? Math.round(items.reduce((sum, item) => sum + item.price, 0) / items.length) : 0,
      withImages: items.filter(item => item.images?.length > 0).length,
      verified: items.filter(item => item.seller?.verified).length
    };

    res.json({ 
      items, 
      nextCursor,
      analytics,
      filters: {
        category,
        priceRange: { min: minPrice, max: maxPrice },
        location: { city, region },
        hasImages: hasImages === 'true',
        verified: verified === 'true'
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function getListingById(req, res, next) {
  try {
    const item = await Listing.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ message: 'Listing not found' });
    
    // Increment view count
    await Listing.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
    // Add computed fields
    const enhancedItem = {
      ...item,
      primaryImage: item.images?.find(img => img.isPrimary) || item.images?.[0],
      isHotDeal: item.originalPrice && item.price < item.originalPrice * 0.8,
      discountPercentage: item.originalPrice ? Math.round((1 - item.price / item.originalPrice) * 100) : 0,
      priceDisplay: `₱${item.price.toLocaleString()}`,
      sellerRating: item.seller?.rating || 5,
      isVerified: item.seller?.verified || false
    };
    
    res.json(enhancedItem);
  } catch (err) {
    next(err);
  }
}

export async function markSold(req, res, next) {
  try {
    const item = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'sold' } },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Listing not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

// New endpoints for enhanced functionality

export async function toggleFavorite(req, res, next) {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'add' or 'remove'
    
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    if (action === 'add') {
      await listing.addToFavorites();
    } else if (action === 'remove') {
      await listing.removeFromFavorites();
    }
    
    res.json({ 
      message: `${action === 'add' ? 'Added to' : 'Removed from'} favorites`,
      favorites: listing.favorites 
    });
  } catch (err) {
    next(err);
  }
}

export async function addInquiry(req, res, next) {
  try {
    const { id } = req.params;
    const { message, contactMethod } = req.body;
    
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    await listing.addInquiry();
    
    // In a real app, you would save the inquiry and possibly send notifications
    const inquiry = {
      listingId: id,
      message,
      contactMethod,
      timestamp: new Date(),
      sellerPhone: listing.seller.phone,
      sellerMessaging: listing.seller.messagingLink
    };
    
    res.json({ 
      message: 'Inquiry sent successfully',
      inquiry,
      contactInfo: {
        phone: listing.seller.phone,
        messaging: listing.seller.messagingLink
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function searchSuggestions(req, res, next) {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({ suggestions: [] });
    }
    
    // Get suggestions from titles and tags
    const suggestions = await Listing.aggregate([
      {
        $match: {
          status: 'active',
          $or: [
            { title: new RegExp(q, 'i') },
            { tags: new RegExp(q, 'i') },
            { category: new RegExp(q, 'i') }
          ]
        }
      },
      {
        $group: {
          _id: null,
          titles: { $addToSet: '$title' },
          categories: { $addToSet: '$category' },
          tags: { $addToSet: '$tags' }
        }
      },
      {
        $project: {
          suggestions: {
            $slice: [
              {
                $setUnion: [
                  { $slice: ['$titles', 5] },
                  { $slice: ['$categories', 3] },
                  { $slice: [{ $reduce: { input: '$tags', initialValue: [], in: { $concatArrays: ['$$value', '$$this'] } } }, 5] }
                ]
              },
              10
            ]
          }
        }
      }
    ]);
    
    const result = suggestions[0]?.suggestions || [];
    const filtered = result.filter(item => 
      item && item.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 8);
    
    res.json({ suggestions: filtered });
  } catch (err) {
    next(err);
  }
}

export async function getHotDeals(req, res, next) {
  try {
    const { limit = 10 } = req.query;
    
    const deals = await Listing.find({
      status: 'active',
      originalPrice: { $exists: true },
      $expr: {
        $lt: ['$price', { $multiply: ['$originalPrice', 0.8] }]
      }
    })
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .select('title price originalPrice category location images.url createdAt seller.name')
    .lean();
    
    const enhancedDeals = deals.map(deal => ({
      ...deal,
      discountPercentage: Math.round((1 - deal.price / deal.originalPrice) * 100),
      savings: deal.originalPrice - deal.price,
      primaryImage: deal.images?.[0]
    }));
    
    res.json({ deals: enhancedDeals });
  } catch (err) {
    next(err);
  }
}

export async function getListingAnalytics(req, res, next) {
  try {
    const { id } = req.params;
    
    const listing = await Listing.findById(id).select('views favorites inquiries createdAt');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Calculate some basic analytics
    const daysSincePosted = Math.floor((Date.now() - listing.createdAt) / (1000 * 60 * 60 * 24));
    const avgViewsPerDay = daysSincePosted > 0 ? Math.round(listing.views / daysSincePosted) : listing.views;
    
    const analytics = {
      views: listing.views,
      favorites: listing.favorites,
      inquiries: listing.inquiries,
      daysSincePosted,
      avgViewsPerDay,
      engagementRate: listing.views > 0 ? Math.round(((listing.favorites + listing.inquiries) / listing.views) * 100) : 0
    };
    
    res.json({ analytics });
  } catch (err) {
    next(err);
  }
}
