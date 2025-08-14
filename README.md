# LocalShop PH

Mobile-first marketplace MVP for second-hand goods in the Philippines.

## Stack
- Frontend: HTML + Tailwind via CDN, vanilla JS
- Backend: Node.js + Express
- DB: MongoDB Atlas
- Images: Cloudinary
- Deploy: Netlify (client) + Railway (server)

## Dev
Backend
- cd server
- copy .env.example to .env and set MongoDB + Cloudinary
- npm install
- npm run dev

Frontend
- open `client/index.html` in Live Server or serve statically
- set `window.API_BASE` in a small script if backend runs on a different origin

## Environment
Server `.env` Keys
- MONGODB_URI, MONGODB_DB
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
- PORT (default 4000)

## API
See `server/README.md`.
