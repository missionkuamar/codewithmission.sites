import cloudinary from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (filePath, folder = 'products') => {
  const result = await cloudinary.v2.uploader.upload(filePath, {
    folder: folder,
    resource_type: 'auto',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ]
  });
  
  // Clean up temp file
  fs.unlinkSync(filePath);
  
  return {
    secure_url: result.secure_url,
    public_id: result.public_id
  };
};

export const deleteFromCloudinary = async (publicId) => {
  await cloudinary.v2.uploader.destroy(publicId);
};

export const uploadMultipleToCloudinary = async (files, folder = 'products') => {
  const uploadPromises = files.map(file => uploadToCloudinary(file.path, folder));
  return Promise.all(uploadPromises);
};