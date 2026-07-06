import Code from '../models/Code.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllCodes = async (req, res) => {
  try {
    const codes = await Code.find({ isPublic: true });
    res.json({ success: true, codes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCodeById = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (!code) {
      return res.status(404).json({ success: false, message: 'Code not found' });
    }
    res.json({ success: true, code });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadCode = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (!code) {
      return res.status(404).json({ success: false, message: 'Code not found' });
    }

    const user = req.user;
    const hasAccess = code.isPublic || 
                     (user && user.isPaid) || 
                     (user && user.purchasedCodes?.includes(code._id));

    if (!hasAccess) {
      return res.status(403).json({ success: false, message: 'Payment required' });
    }

    const filePath = path.join(__dirname, '..', code.filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    res.download(filePath, code.fileName);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin only
export const createCode = async (req, res) => {
  try {
    const { name, description, price, isPublic } = req.body;
    
    const code = await Code.create({
      name,
      description,
      price: price || 0,
      filePath: req.file ? req.file.path : '',
      fileName: req.file ? req.file.originalname : '',
      isPublic: isPublic || false,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, code });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminCodes = async (req, res) => {
  try {
    const codes = await Code.find({});
    res.json({ success: true, codes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCode = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (!code) {
      return res.status(404).json({ success: false, message: 'Code not found' });
    }
    await code.deleteOne();
    res.json({ success: true, message: 'Code deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};