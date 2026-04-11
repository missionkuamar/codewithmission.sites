import express from 'express';
import {
  uploadToCloudinary,
  uploadToS3,
  deleteCloudinaryImage,
  deleteS3Image,
  getCloudinarySignature
} from '../controllers/uploadController.js';
import { uploadLocal, getUploadedFiles, deleteLocalFile } from '../controllers/localUploadController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadSingleImage, handleUploadError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Local upload routes (no authentication for testing)
router.post('/local', uploadSingleImage, handleUploadError, uploadLocal);
router.get('/local/files', getUploadedFiles);
router.delete('/local/:fileName', deleteLocalFile);

// Cloudinary routes
router.post('/cloudinary', protect, uploadSingleImage, handleUploadError, uploadToCloudinary);
router.delete('/cloudinary', protect, deleteCloudinaryImage);
router.get('/cloudinary/signature', protect, getCloudinarySignature);

// S3 routes
router.post('/s3', protect, uploadSingleImage, handleUploadError, uploadToS3);
router.delete('/s3', protect, deleteS3Image);

export default router;