# LocalShop Backend

Express + MongoDB API for listings.

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run dev: `npm run dev`

## Routes
- `GET /health`
- `GET /api/listings` query: `q, category, minPrice, maxPrice, city, region, cursor, limit`
- `GET /api/listings/:id`
- `POST /api/listings` multipart form-data with `images[]`, fields: `title, description, price, category, city, region, sellerName, sellerPhone, messagingLink`
- `PATCH /api/listings/:id/sold`
