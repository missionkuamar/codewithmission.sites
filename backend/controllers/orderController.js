import Order from '../models/Order.js';
import Project from '../models/Project.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.project')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('items.project');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if user owns this order
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;
    
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.project');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    const items = cart.items.map(item => ({
      project: item.project._id,
      price: item.project.price,
      title: item.project.title,
    }));

    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentId,
      orderId,
      paymentStatus: 'completed',
      status: 'completed',
    });

    // Clear cart
    await Cart.findOneAndDelete({ user: req.user._id });

    // Add to user's purchased projects
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: {
        purchasedCodes: { $each: items.map(item => item.project) },
      },
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.project')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};