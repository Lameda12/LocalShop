import { Router } from 'express';
import { upload } from '../services/upload.js';
import { 
  createListing, 
  getListings, 
  getListingById, 
  markSold,
  toggleFavorite,
  addInquiry,
  searchSuggestions,
  getHotDeals,
  getListingAnalytics
} from '../controllers/listingController.js';

const router = Router();

// GET /api/listings - Enhanced search and filtering
router.get('/', getListings);

// GET /api/listings/suggestions - Search autocomplete
router.get('/suggestions', searchSuggestions);

// GET /api/listings/deals - Hot deals endpoint
router.get('/deals', getHotDeals);

// GET /api/listings/:id - Get single listing with view tracking
router.get('/:id', getListingById);

// GET /api/listings/:id/analytics - Get listing analytics
router.get('/:id/analytics', getListingAnalytics);

// POST /api/listings - Create new listing (multipart: images[])
router.post('/', upload.array('images', 6), createListing);

// POST /api/listings/:id/favorite - Toggle favorite status
router.post('/:id/favorite', toggleFavorite);

// POST /api/listings/:id/inquiry - Send inquiry to seller
router.post('/:id/inquiry', addInquiry);

// PATCH /api/listings/:id/sold - Mark as sold
router.patch('/:id/sold', markSold);

export default router;
