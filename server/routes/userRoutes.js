import express from 'express';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import {
  getUserProfile,
  updateProfile,
  followUser,
  searchUsers
} from '../controllers/userController.js';

const router = express.Router();

router.get('/search', searchUsers);
router.get('/:id', getUserProfile);
router.put('/profile', protect, upload.single('profilePicture'), updateProfile);
router.post('/:id/follow', protect, followUser);

export default router;