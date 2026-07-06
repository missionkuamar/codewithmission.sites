import express from 'express';
import { googleAuthCallback, getCurrentUser, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/google', googleAuthCallback);
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);

export default router;