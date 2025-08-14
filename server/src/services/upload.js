import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.warn('Cloudinary env vars not fully set. Image upload will fail until configured.');
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'localshop/listings',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 1200, crop: 'limit' }],
  },
});

export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
