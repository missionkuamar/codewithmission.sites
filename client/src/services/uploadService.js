import api from './api';

// Local upload
export const uploadLocal = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await fetch('http://localhost:5000/api/upload/local', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }
    
    const data = await response.json();
    return { ...data, provider: 'local' };
  } catch (error) {
    console.error('Local upload error:', error);
    throw new Error(error.message || 'Failed to upload locally');
  }
};

// Cloudinary upload
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await api.post('/upload/cloudinary', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload to Cloudinary');
  }
};

// AWS S3 upload
export const uploadToS3 = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await api.post('/upload/s3', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload to S3');
  }
};

// Delete from Cloudinary
export const deleteCloudinaryImage = async (publicId) => {
  try {
    const response = await api.delete('/upload/cloudinary', { 
      data: { publicId } 
    });
    return response.data;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete from Cloudinary');
  }
};

// Delete from S3
export const deleteS3Image = async (key) => {
  try {
    const response = await api.delete('/upload/s3', { 
      data: { key } 
    });
    return response.data;
  } catch (error) {
    console.error('S3 delete error:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete from S3');
  }
};

// Delete image based on provider
export const deleteImage = async (imageUrl, provider) => {
  try {
    if (provider === 'cloudinary') {
      // Extract publicId from URL
      const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
      return await deleteCloudinaryImage(publicId);
    } else if (provider === 's3') {
      // Extract key from URL
      const key = imageUrl.split('.com/')[1];
      return await deleteS3Image(key);
    } else {
      // Local file - extract filename
      const fileName = imageUrl.split('/').pop();
      const response = await fetch(`http://localhost:5000/api/upload/local/${fileName}`, {
        method: 'DELETE',
      });
      return await response.json();
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};