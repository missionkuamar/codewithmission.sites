// backend/controllers/paymentController.js
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import dotenv from 'dotenv';


dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { projectId } = req.body;
    
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check if already purchased
    const existingOrder = await Order.findOne({
      user: req.user._id,
      'items.project': projectId,
      paymentStatus: 'completed',
    });

    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: 'You already own this project',
      });
    }

    const options = {
      amount: project.price * 100, // Convert to paise
      currency: 'INR',
      receipt: `project_${projectId}`,
      notes: {
        projectId: projectId,
        userId: req.user._id.toString(),
      },
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      projectId 
    } = req.body;
    
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid signature',
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Create order record
    const order = await Order.create({
      user: req.user._id,
      items: [{
        project: project._id,
        price: project.price,
        title: project.title,
        downloadUrl: project.zipFileUrl,
      }],
      totalAmount: project.price,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: 'completed',
      status: 'completed',
    });

    // Add to user's purchased projects
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: {
        purchasedCodes: project._id,
      },
    });

    // Increment sold count
    project.soldCount = (project.soldCount || 0) + 1;
    await project.save();

    res.json({
      success: true,
      message: 'Payment verified successfully',
      order,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};