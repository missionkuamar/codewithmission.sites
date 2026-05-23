import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostStore from '../store/postStore';
import { categories } from '../utils/constants';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const { createPost, loading, error } = usePostStore();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Other',
    tags: ''
  });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      errors.content = 'Content must be at least 10 characters';
    }
    
    if (images.length > 5) {
      errors.images = 'Maximum 5 images allowed';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear validation error for this field
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file sizes
    const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast.error('Some images exceed 5MB limit');
      return;
    }
    
    setImages(files);
    
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }
    
    const postData = new FormData();
    postData.append('title', formData.title.trim());
    postData.append('content', formData.content.trim());
    postData.append('category', formData.category);
    
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    postData.append('tags', JSON.stringify(tagsArray));
    
    images.forEach(image => {
      postData.append('images', image);
    });
    
    const result = await createPost(postData);
    
    if (result.success) {
      // Clear form
      setFormData({
        title: '',
        content: '',
        category: 'Other',
        tags: ''
      });
      setImages([]);
      setPreviewUrls([]);
      
      // Navigate after short delay to show success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                validationErrors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter post title"
            />
            {validationErrors.title && (
              <p className="mt-1 text-xs text-red-500">{validationErrors.title}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="6"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                validationErrors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write your post content here..."
            />
            {validationErrors.content && (
              <p className="mt-1 text-xs text-red-500">{validationErrors.content}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.content.length} characters (minimum 10)
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.filter(c => c !== 'All').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., react, javascript, webdev"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate tags with commas for better discoverability
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold">Images (max 5, 5MB each)</label>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              className="w-full"
            />
            {validationErrors.images && (
              <p className="mt-1 text-xs text-red-500">{validationErrors.images}</p>
            )}
            {previewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img src={url} alt={`Preview ${idx}`} className="h-32 w-full object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => {
                        setImages(images.filter((_, i) => i !== idx));
                        setPreviewUrls(previewUrls.filter((_, i) => i !== idx));
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Post...
              </>
            ) : (
              'Create Post'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;