// hooks/useProductForm.js
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../../../../redux/slices/productSlice.js';

export const useProductForm = (product, onClose, onSave) => { // Added onSave parameter
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorDetails, setErrorDetails] = useState(null);
  
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || 'web-development',
    type: product?.type || 'gallery',
    tags: product?.tags?.join(', ') || '',
    featured: product?.featured || false,
    inStock: product?.inStock || true,
    liveDemoUrl: product?.liveDemoUrl || '',
    githubUrl: product?.githubUrl || '',
    socialLinks: product?.socialLinks || [],
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState(product?.images || []);
  const [zipFile, setZipFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isThumbnail: false
    }));
    setImages(prev => [...prev, ...imageUrls]);
    toast.success(`${files.length} image(s) added`);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setThumbnail({
        file,
        url: URL.createObjectURL(file)
      });
      toast.success('Thumbnail selected');
    }
  };

  const handleZipUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error('File size exceeds 50MB limit');
        return;
      }
      setZipFile(file);
      toast.success('ZIP file selected');
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addSocialLink = (link) => {
    if (link.url) {
      try {
        new URL(link.url);
      } catch {
        toast.error('Please enter a valid URL');
        return false;
      }
      
      setFormData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, link]
      }));
      toast.success('Social link added');
      return true;
    }
    toast.error('Please enter a URL');
    return false;
  };

  const removeSocialLink = (index) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.title?.trim()) {
      errors.push('Title is required');
    }
    if (!formData.description?.trim()) {
      errors.push('Description is required');
    }
    if (!formData.price || formData.price <= 0) {
      errors.push('Price must be greater than 0');
    }
    if (!thumbnail && images.length === 0) {
      errors.push('Please upload at least one image');
    }
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return false;
    }
    return true;
  };

  const buildFormData = () => {
    const formDataToSend = new FormData();
    
    // Basic fields
    formDataToSend.append('title', formData.title.trim());
    formDataToSend.append('description', formData.description.trim());
    formDataToSend.append('price', String(formData.price));
    formDataToSend.append('category', formData.category);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('featured', String(formData.featured));
    formDataToSend.append('inStock', String(formData.inStock));
    
    if (formData.liveDemoUrl?.trim()) {
      formDataToSend.append('liveDemoUrl', formData.liveDemoUrl.trim());
    }
    if (formData.githubUrl?.trim()) {
      formDataToSend.append('githubUrl', formData.githubUrl.trim());
    }
    
    // Tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);
    formDataToSend.append('tags', JSON.stringify(tagsArray));
    
    // Social links
    if (formData.socialLinks.length > 0) {
      formDataToSend.append('socialLinks', JSON.stringify(formData.socialLinks));
    }

    // Images
    const imagesToUpload = [];
    
    if (thumbnail && thumbnail.file instanceof File) {
      imagesToUpload.push(thumbnail.file);
    }
    
    images.forEach(img => {
      if (img.file instanceof File) {
        imagesToUpload.push(img.file);
      }
    });
    
    imagesToUpload.forEach((file, index) => {
      formDataToSend.append('images', file);
    });

    // ZIP file
    if (zipFile instanceof File) {
      formDataToSend.append('zipFile', zipFile);
    }

    return formDataToSend;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setUploadProgress(0);
    setErrorDetails(null);

    try {
      const formDataToSend = buildFormData();
      
      const onUploadProgress = (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      };

      let result;
      if (product) {
        result = await dispatch(updateProduct({ 
          id: product._id, 
          data: formDataToSend,
          onUploadProgress 
        })).unwrap();
        toast.success('Product updated successfully!');
      } else {
        result = await dispatch(createProduct({ 
          data: formDataToSend,
          onUploadProgress 
        })).unwrap();
        toast.success('Product created successfully!');
      }

      // ✅ Call onSave if provided (to refresh parent component)
      if (onSave && typeof onSave === 'function') {
        onSave(result?.product || result);
      }
      
      onClose();
    } catch (error) {
      console.error('Submit error:', error);
      
      let errorMessage = 'Failed to save product';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.map(e => e.msg).join(', ');
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      if (error.response?.status === 400) {
        toast.error('Validation Error: ' + errorMessage);
      } else if (error.response?.status === 401) {
        toast.error('Authentication Error: Please login again');
      } else if (error.response?.status === 403) {
        toast.error('Permission Denied: You don\'t have access to create products');
      } else if (error.response?.status === 500) {
        toast.error('Server Error: Please try again later');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    thumbnail,
    handleThumbnailUpload,
    images,
    handleImageUpload,
    removeImage,
    zipFile,
    handleZipUpload,
    addSocialLink,
    removeSocialLink,
    handleSubmit,
    loading,
    uploadProgress,
    errorDetails,
    isEditing: !!product
  };
};