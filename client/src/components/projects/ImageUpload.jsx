import { useState } from 'react';
import { FiUpload, FiX, FiCloud, FiDatabase, FiHardDrive, FiCheckCircle, FiAlertCircle, FiTrash2 } from 'react-icons/fi';
import { uploadToCloudinary, uploadToS3, uploadLocal, deleteImage } from '../../services/uploadService';
import toast from 'react-hot-toast';

const ImageUpload = ({ onImageUpload, onRemove, existingImages = [], multiple = false, required = false }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProvider, setUploadProvider] = useState('local');
  const [images, setImages] = useState(existingImages.map(img => ({
    url: img,
    provider: img.includes('cloudinary') ? 'cloudinary' : img.includes('amazonaws') ? 's3' : 'local'
  })));

  const detectProvider = (url) => {
    if (url.includes('cloudinary')) return 'cloudinary';
    if (url.includes('amazonaws')) return 's3';
    return 'local';
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!multiple && images.length + files.length > 1) {
      toast.error('You can only upload one image');
      return;
    }

    setUploading(true);
    
    for (const file of files) {
      try {
        let result;
        
        // Use the selected upload provider
        if (uploadProvider === 'cloudinary') {
          result = await uploadToCloudinary(file);
        } else if (uploadProvider === 's3') {
          result = await uploadToS3(file);
        } else {
          result = await uploadLocal(file);
        }
        
        const newImage = {
          url: result.url,
          provider: result.provider || uploadProvider
        };
        
        const newImages = [...images, newImage];
        setImages(newImages);
        onImageUpload(newImages.map(img => img.url));
        toast.success(`Uploaded to ${uploadProvider.toUpperCase()}!`);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(error.message || 'Failed to upload image');
        
        // If the selected provider fails, suggest using local
        if (uploadProvider !== 'local') {
          toast.info('Try using Local upload option instead', { duration: 5000 });
        }
      }
    }
    
    setUploading(false);
    e.target.value = '';
  };

  const handleRemoveImage = async (index) => {
    const imageToRemove = images[index];
    
    try {
      // Show deleting toast
      toast.loading('Deleting image...', { id: 'deleting' });
      
      // Delete from server based on provider
      await deleteImage(imageToRemove.url, imageToRemove.provider);
      
      // Remove from state
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImageUpload(newImages.map(img => img.url));
      
      toast.success('Image deleted successfully', { id: 'deleting' });
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image', { id: 'deleting' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Provider Selection */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setUploadProvider('local')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition text-sm ${
            uploadProvider === 'local'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          <FiHardDrive />
          <span>Local</span>
          <FiCheckCircle className="text-green-500 text-xs" />
        </button>
        
        <button
          type="button"
          onClick={() => setUploadProvider('cloudinary')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition text-sm ${
            uploadProvider === 'cloudinary'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          <FiCloud />
          <span>Cloudinary</span>
        </button>
        
        <button
          type="button"
          onClick={() => setUploadProvider('s3')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition text-sm ${
            uploadProvider === 's3'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          <FiDatabase />
          <span>AWS S3</span>
        </button>
      </div>

      {/* Upload Area */}
      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
        required && images.length === 0 
          ? 'border-red-500' 
          : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
      }`}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          id="image-upload"
          multiple={multiple}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <FiUpload className={`w-8 h-8 ${uploading ? 'animate-bounce' : ''} text-gray-400`} />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {uploading ? `Uploading to ${uploadProvider.toUpperCase()}...` : 'Click or drag to upload images'}
          </span>
          <span className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</span>
        </label>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className={`grid ${multiple ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'} gap-4`}>
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  if (image.url.startsWith('/uploads/')) {
                    e.target.src = `http://localhost:5000${image.url}`;
                  }
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {image.provider === 'cloudinary' && '☁️'}
                {image.provider === 's3' && '📦'}
                {image.provider === 'local' && '💾'}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {required && images.length === 0 && (
        <p className="text-red-500 text-xs">Please upload at least one image (cover image)</p>
      )}
      
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 <strong>Upload & Delete Features:</strong></p>
        <p>• <strong>Local</strong> - Files saved on server (working)</p>
        <p>• <strong>Cloudinary</strong> - Upload and delete from Cloudinary (needs credentials)</p>
        <p>• <strong>AWS S3</strong> - Upload and delete from S3 (needs credentials)</p>
        <p>• Click the trash icon to delete images from any provider</p>
      </div>
    </div>
  );
};

export default ImageUpload;