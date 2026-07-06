import express from 'express';
import {
  getAllCodes,
  getCodeById,
  downloadCode,
  createCode,
  getAdminCodes,
  deleteCode,
} from '../controllers/codeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCodes);
router.get('/:id', getCodeById);
router.get('/:id/download', protect, downloadCode);
router.post('/', protect, admin, createCode);
router.get('/admin/all', protect, admin, getAdminCodes);
router.delete('/:id', protect, admin, deleteCode);

export default router;