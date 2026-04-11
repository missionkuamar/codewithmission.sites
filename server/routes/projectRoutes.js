import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getUserProjects,
  toggleLike,
  getRelatedProjects,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  validateProject,
  validateProjectUpdate,
  validateId,
  validatePagination,
  validateSearch,
  handleValidationErrors,
} from '../utils/validators.js';

const router = express.Router();

// Public routes - make validation optional for query params
router.get('/', getProjects); // Remove validation middleware temporarily

router.get('/:id', getProjectById);

router.get('/:id/related', getRelatedProjects);

// Protected routes
router.post(
  '/',
  protect,
//   validateProject,
//   handleValidationErrors,
  createProject
);

router.put(
  '/:id',
  protect,
  validateId,
//   validateProjectUpdate,
//   handleValidationErrors,
  updateProject
);

router.delete(
  '/:id',
  protect,
 // validateId,
//   handleValidationErrors,
  deleteProject
);

router.get(
  '/user/:userId',
  protect,
//   validateId,
//   handleValidationErrors,
  getUserProjects
);

router.post(
  '/:id/like',
  protect,
//   validateId,
//   handleValidationErrors,
  toggleLike
);

export default router;