// components/admin/blog/BlogModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X, Upload, Loader, Image, Trash2, Plus } from 'lucide-react';
import { createBlog, updateBlog } from '../../../redux/slices/blogSlice';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Web Development', 'React', 'JavaScript', 'TypeScript', 
  'Node.js', 'UI/UX Design', 'Database', 'DevOps', 
  'Security', 'AI/ML', 'Mobile Development', 'Other'
];

const BlogModal = ({ post, onClose, onSave, currentTheme }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || 'Web Development',
    tags: post?.tags?.join(', ') || '',
    featured: post?.featured || false,
    published: post?.published || false,
    readTime: post?.readTime || '',
    authorName: post?.author?.name || '',
    authorBio: post?.author?.bio || '',
    authorAvatar: post?.author?.avatar || ''
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(post?.image?.url || '');
  const [galleryImages, setGalleryImages] = useState(post?.images || []);
  const [existingImage, setExistingImage] = useState(post?.image?.url || '');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        category: post.category || 'Web Development',
        tags: post.tags?.join(', ') || '',
        featured: post.featured || false,
        published: post.published || false,
        readTime: post.readTime || '',
        authorName: post.author?.name || '',
        authorBio: post.author?.bio || '',
        authorAvatar: post.author?.avatar || ''
      });
      setImagePreview(post.image?.url || '');
      setExistingImage(post.image?.url || '');
      setGalleryImages(post.images || []);
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      preview: true
    }));
    setGalleryImages(prev => [...prev, ...newImages]);
    toast.success(`${files.length} image(s) added to gallery`);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeFeaturedImage = () => {
    setImage(null);
    setImagePreview('');
    setExistingImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!formData.excerpt.trim()) {
      toast.error('Excerpt is required');
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Content is required');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      
      // Basic fields
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('excerpt', formData.excerpt.trim());
      formDataToSend.append('content', formData.content.trim());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('featured', String(formData.featured));
      formDataToSend.append('published', String(formData.published));
      if (formData.readTime) formDataToSend.append('readTime', formData.readTime);
      
      // Tags
      const tagsArray = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
      formDataToSend.append('tags', JSON.stringify(tagsArray));
      
      // Author
      const author = {
        name: formData.authorName || 'Admin',
        bio: formData.authorBio || '',
        avatar: formData.authorAvatar || ''
      };
      formDataToSend.append('author', JSON.stringify(author));

      // Featured Image
      if (image) {
        formDataToSend.append('image', image);
      }

      // Gallery Images
      const galleryFiles = galleryImages
        .filter(img => img.file && img.preview)
        .map(img => img.file);
      
      for (const file of galleryFiles) {
        if (file instanceof File) {
          formDataToSend.append('images', file);
        }
      }

      const onUploadProgress = (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      };

      let result;
      if (post) {
        result = await dispatch(updateBlog({
          id: post._id,
          data: formDataToSend,
          onUploadProgress
        })).unwrap();
        toast.success('Blog updated successfully!');
      } else {
        result = await dispatch(createBlog({
          data: formDataToSend,
          onUploadProgress
        })).unwrap();
        toast.success('Blog created successfully!');
      }

      if (onSave) onSave(result?.blog || result);
      onClose();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Failed to save blog');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className={`${currentTheme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit z-10">
          <h2 className="text-2xl font-bold">
            {post ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700 transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="react, javascript, web-dev"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="5 min read"
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Published</span>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Brief summary of your blog post"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Full blog content with HTML support"
                  required
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-semibold mb-2">Featured Image</label>
                <div className={`relative border-2 border-dashed rounded-lg p-4 ${currentTheme.border} hover:border-purple-500 transition`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Upload className="mx-auto mb-2" size={32} />
                    <p className="text-sm">Click to upload featured image</p>
                    <p className="text-xs opacity-60">Max 5MB</p>
                  </div>
                </div>
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img src={imagePreview} alt="Featured" className="h-32 w-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                    {existingImage && !image && (
                      <p className="text-xs text-green-500 mt-1">✓ Existing image will be kept</p>
                    )}
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-semibold mb-2">Gallery Images</label>
                <div className={`relative border-2 border-dashed rounded-lg p-4 ${currentTheme.border} hover:border-purple-500 transition`}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <Image className="mx-auto mb-2" size={32} />
                    <p className="text-sm">Click to upload gallery images</p>
                    <p className="text-xs opacity-60">Max 10 images</p>
                  </div>
                </div>
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {galleryImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.url || img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-2">Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Author Bio</label>
                  <input
                    type="text"
                    name="authorBio"
                    value={formData.authorBio}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Author bio"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  {uploadProgress > 0 ? `${uploadProgress}%` : 'Saving...'}
                </>
              ) : (
                <>
                  {post ? 'Update Blog' : 'Create Blog'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;