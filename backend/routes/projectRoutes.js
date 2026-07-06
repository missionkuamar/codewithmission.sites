// routes/productRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/projectController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Setup file upload middleware
const uploadFiles = upload.fields([
  { name: 'images', maxCount: 20 },
  { name: 'thumbnail', maxCount: 1 },
  { name: 'zipFile', maxCount: 1 }
]);

// Routes
router.post('/', protect, uploadFiles, createProduct);
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.put('/:id', protect, uploadFiles, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;