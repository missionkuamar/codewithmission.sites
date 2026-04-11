import express from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  validateUserRegistration,
  validateUserLogin,
  validateRefreshToken,
  handleValidationErrors,
} from '../utils/validators.js';

const router = express.Router();

router.post(
  '/register',
//   validateUserRegistration,
//   handleValidationErrors,
  registerUser
);

router.post(
  '/login',
//   validateUserLogin,
//   handleValidationErrors,
  loginUser
);

router.post(
  '/refresh',
//   validateRefreshToken,
//   handleValidationErrors,
  refreshToken
);

router.post('/logout', protect, logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;