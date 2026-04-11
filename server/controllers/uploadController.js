import cloudinary, { deleteFromCloudinary } from '../config/cloudinary.js';
import s3, { deleteFromS3 } from '../config/aws.js';
import { v4 as uuidv4 } from 'uuid';

// Upload to Cloudinary
export const uploadToCloudinary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return res.status(503).json({ 
        message: 'Cloudinary is not configured. Please add credentials to .env file',
        fallback: 'local'
      });
    }

    // Convert buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileType = req.file.mimetype;
    const dataUri = `data:${fileType};base64,${fileStr}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'projects',
      resource_type: 'auto',
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      provider: 'cloudinary'
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to upload to Cloudinary',
      fallback: 'local'
    });
  }
};

// Upload to AWS S3
export const uploadToS3 = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Check if S3 is configured
    if (!process.env.AWS_S3_BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID) {
      return res.status(503).json({ 
        message: 'AWS S3 is not configured. Please add credentials to .env file',
        fallback: 'local'
      });
    }
    
    // Generate unique filename
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const fileKey = `projects/${fileName}`;
    
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    
    const result = await s3.upload(params).promise();
    
    res.json({
      success: true,
      url: result.Location,
      key: result.Key,
      provider: 's3'
    });
  } catch (error) {
    console.error('S3 upload error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to upload to S3',
      fallback: 'local'
    });
  }
};

// Delete from Cloudinary
export const deleteCloudinaryImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    
    if (!publicId) {
      return res.status(400).json({ message: 'Public ID is required' });
    }
    
    const result = await deleteFromCloudinary(publicId);
    
    if (result.result === 'ok') {
      res.json({ 
        success: true, 
        message: 'Image deleted successfully from Cloudinary',
        result: result
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Image not found or already deleted' 
      });
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to delete from Cloudinary'
    });
  }
};

// Delete from S3
export const deleteS3Image = async (req, res) => {
  try {
    const { key } = req.body;
    
    if (!key) {
      return res.status(400).json({ message: 'File key is required' });
    }
    
    const result = await deleteFromS3(key);
    
    res.json({ 
      success: true, 
      message: 'Image deleted successfully from S3',
      result: result
    });
  } catch (error) {
    console.error('S3 delete error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to delete from S3'
    });
  }
};

// Get Cloudinary upload signature (for direct uploads)
export const getCloudinarySignature = async (req, res) => {
  try {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: 'projects' },
      process.env.CLOUDINARY_API_SECRET
    );
    
    res.json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      folder: 'projects'
    });
  } catch (error) {
    console.error('Signature generation error:', error);
    res.status(500).json({ message: error.message });
  }
};