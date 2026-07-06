// routes/blogRoutes.js
import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  toggleFeatured,
  togglePublish,
  likeBlog,
  getBlogStats,
  addBlogImages,
  removeBlogImage,
  removeFeaturedImage
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/stats', getBlogStats);
router.get('/:id', getBlog);
router.get('/slug/:slug', getBlogBySlug);
router.post('/:id/like', likeBlog);

// Admin routes - Create blog with multiple files
// Use upload.fields() to handle both single and multiple images
router.post(
  '/', 
  protect, 
  admin, 
  upload.fields([
    { name: 'image', maxCount: 1 },      // Single featured image
    { name: 'images', maxCount: 10 }     // Multiple gallery images
  ]), 
  createBlog
);

// Admin routes - Update blog
router.put(
  '/:id', 
  protect, 
  admin, 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]), 
  updateBlog
);

// Admin routes - Add more gallery images
router.post(
  '/:id/images', 
  protect, 
  admin, 
  upload.array('images', 10), 
  addBlogImages
);

// Admin routes - Delete images
router.delete('/:id/images/:imageId', protect, admin, removeBlogImage);
router.delete('/:id/featured-image', protect, admin, removeFeaturedImage);

// Admin routes - Toggle status
router.patch('/:id/featured', protect, admin, toggleFeatured);
router.patch('/:id/publish', protect, admin, togglePublish);

// Admin routes - Delete blog
router.delete('/:id', protect, admin, deleteBlog);

export default router;