import express from 'express';
import {
  getUserOrders,
  getOrderById,
  createOrder,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/my-orders', getUserOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);

router.use(admin);
router.get('/all', getAllOrders);
router.put('/:id/status', updateOrderStatus);

export default router;