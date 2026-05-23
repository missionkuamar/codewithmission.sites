import express from 'express';
import { protect } from '../middleware/auth.js';
import { uploadMultiple } from '../middleware/upload.js';
import { validatePost, validateComment } from '../middleware/validation.js';
import {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  addComment,
  deleteComment,
  deletePost,
  getPostsByCategory,
  updatePost,
  getSavedPosts
} from '../controllers/postController.js';

const router = express.Router();

// Public routes (but with protection for user data)
router.get('/', getPosts);
router.get('/category/:category', getPostsByCategory);
router.get('/:id', getPostById);

// Protected routes
router.post('/', protect, uploadMultiple, validatePost, createPost);
router.put('/:id', protect, uploadMultiple, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, validateComment, addComment);
router.delete('/:postId/comment/:commentId', protect, deleteComment);
router.get('/saved/posts', protect, getSavedPosts);

export default router;