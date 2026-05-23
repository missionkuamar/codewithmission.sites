import express from 'express';
import { 
  googleAuthCallback, 
  getCurrentUser, 
  logout, 
  login,
  linkGoogleAccount 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  setup2FA,
  verifyAndEnable2FA,
  disable2FA,
  verify2FALogin,
  regenerateBackupCodes
} from '../controllers/twoFactorController.js';

const router = express.Router();

// Public routes
router.post('/google', googleAuthCallback);
router.post('/login', login);
router.post('/2fa/verify-login', verify2FALogin);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);
router.post('/link-google', protect, linkGoogleAccount);

// 2FA Protected Routes
router.post('/2fa/setup', protect, setup2FA);
router.post('/2fa/enable', protect, verifyAndEnable2FA);
router.post('/2fa/disable', protect, disable2FA);
router.post('/2fa/regenerate-backup-codes', protect, regenerateBackupCodes);

export default router;