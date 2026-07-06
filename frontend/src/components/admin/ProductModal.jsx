// import React, { useState, useEffect } from 'react';
// import { 
//   X, CloudUpload, Loader, Check, Plus, Trash2, 
//   Link2, ExternalLink, FileArchive 
// } from 'lucide-react';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { createProduct, updateProduct } from '../../redux/slices/productSlice';
// import { FaGithub } from "react-icons/fa";
// const ProductModal = ({ product, onClose, currentTheme }) => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
  
//   const [formData, setFormData] = useState({
//     title: product?.title || '',
//     description: product?.description || '',
//     price: product?.price || '',
//     category: product?.category || 'web-development',
//     type: product?.type || 'gallery',
//     tags: product?.tags?.join(', ') || '',
//     featured: product?.featured || false,
//     inStock: product?.inStock || true,
//     liveDemoUrl: product?.liveDemoUrl || '',
//     githubUrl: product?.githubUrl || '',
//     socialLinks: product?.socialLinks || [],
//   });

//   const [thumbnail, setThumbnail] = useState(null);
//   const [images, setImages] = useState(product?.images || []);
//   const [zipFile, setZipFile] = useState(null);
//   const [socialLink, setSocialLink] = useState({ platform: 'github', url: '', label: '' });

//   const categories = [
//     { value: 'web-development', label: 'Web Development' },
//     { value: 'mobile-app', label: 'Mobile App' },
//     { value: 'e-commerce', label: 'E-Commerce' },
//     { value: 'ai-ml', label: 'AI/ML' },
//     { value: 'blockchain', label: 'Blockchain' },
//     { value: 'iot', label: 'IoT' },
//     { value: 'cloud-services', label: 'Cloud Services' },
//     { value: 'design', label: 'Design' },
//     { value: 'other', label: 'Other' }
//   ];

//   const platforms = [
//     { value: 'github', label: 'GitHub', icon: <FaGithub size={16} /> },
//     { value: 'live-demo', label: 'Live Demo', icon: <ExternalLink size={16} /> },
//     { value: 'youtube', label: 'YouTube', icon: '▶️' },
//     { value: 'instagram', label: 'Instagram', icon: '📸' },
//     { value: 'twitter', label: 'Twitter', icon: '🐦' },
//     { value: 'facebook', label: 'Facebook', icon: '📘' },
//     { value: 'linkedin', label: 'LinkedIn', icon: '💼' }
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const imageUrls = files.map(file => ({
//       file,
//       url: URL.createObjectURL(file),
//       isThumbnail: false
//     }));
//     setImages(prev => [...prev, ...imageUrls]);
//     toast.success(`${files.length} image(s) added`);
//   };

//   const handleThumbnailUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setThumbnail({
//         file,
//         url: URL.createObjectURL(file)
//       });
//       toast.success('Thumbnail selected');
//     }
//   };

//   const handleZipUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 50 * 1024 * 1024) { // 50MB limit
//         toast.error('File size exceeds 50MB limit');
//         return;
//       }
//       setZipFile(file);
//       toast.success('ZIP file selected');
//     }
//   };

//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const addSocialLink = () => {
//     if (socialLink.url) {
//       setFormData(prev => ({
//         ...prev,
//         socialLinks: [...prev.socialLinks, { ...socialLink }]
//       }));
//       setSocialLink({ platform: 'github', url: '', label: '' });
//       toast.success('Social link added');
//     } else {
//       toast.error('Please enter a URL');
//     }
//   };

//   const removeSocialLink = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       socialLinks: prev.socialLinks.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.title) {
//       toast.error('Please enter a title');
//       return;
//     }
//     if (!formData.description) {
//       toast.error('Please enter a description');
//       return;
//     }
//     if (!formData.price) {
//       toast.error('Please enter a price');
//       return;
//     }
//     if (!thumbnail && images.length === 0) {
//       toast.error('Please upload at least one image');
//       return;
//     }

//     setLoading(true);
//     setUploadProgress(0);

//     try {
//       const formDataToSend = new FormData();
      
//       // Basic fields
//       formDataToSend.append('title', formData.title);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('type', formData.type);
//       formDataToSend.append('featured', formData.featured);
//       formDataToSend.append('inStock', formData.inStock);
//       formDataToSend.append('liveDemoUrl', formData.liveDemoUrl);
//       formDataToSend.append('githubUrl', formData.githubUrl);
      
//       // Tags
//       const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
//       formDataToSend.append('tags', JSON.stringify(tagsArray));
      
//       // Social links
//       formDataToSend.append('socialLinks', JSON.stringify(formData.socialLinks));

//       // Images
//       const imagesToUpload = thumbnail ? [thumbnail.file, ...images.map(img => img.file)] : images.map(img => img.file);
//       for (const img of imagesToUpload) {
//         if (img instanceof File) {
//           formDataToSend.append('images', img);
//         }
//       }

//       // ZIP file
//       if (zipFile) {
//         formDataToSend.append('zipFile', zipFile);
//       }

//       // Track upload progress
//       const onUploadProgress = (progressEvent) => {
//         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         setUploadProgress(progress);
//       };

//       let result;
//       if (product) {
//         result = await dispatch(updateProduct({ 
//           id: product._id, 
//           data: formDataToSend,
//           onUploadProgress 
//         })).unwrap();
//         toast.success('Product updated successfully!');
//       } else {
//         result = await dispatch(createProduct({ 
//           data: formDataToSend,
//           onUploadProgress 
//         })).unwrap();
//         toast.success('Product created successfully!');
//       }

//       onClose();
//     } catch (error) {
//       console.error('Submit error:', error);
//       toast.error(error.message || 'Failed to save product');
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
//       <div className={`${currentTheme.card} rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto`}>
//         {/* Header */}
//         <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit z-10">
//           <h2 className="text-2xl font-bold">
//             {product ? 'Edit Product' : 'Create New Product'}
//           </h2>
//           <button 
//             onClick={onClose} 
//             className="p-2 rounded-lg hover:bg-gray-700 transition"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-4">
//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                   placeholder="Enter product title"
//                   required
//                 />
//               </div>

//               {/* Price */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Price ($) *
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                   placeholder="0.00"
//                   min="0"
//                   step="0.01"
//                   required
//                 />
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Category *
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                 >
//                   {categories.map(cat => (
//                     <option key={cat.value} value={cat.value}>
//                       {cat.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Type */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Gallery Type *
//                 </label>
//                 <select
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                 >
//                   <option value="single">Single Image</option>
//                   <option value="gallery">Multiple Images Gallery</option>
//                 </select>
//               </div>

//               {/* Tags */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Tags (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={formData.tags}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                   placeholder="react, javascript, web-dev"
//                 />
//               </div>

//               {/* Live Demo & GitHub URLs */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     Live Demo URL
//                   </label>
//                   <input
//                     type="url"
//                     name="liveDemoUrl"
//                     value={formData.liveDemoUrl}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                     placeholder="https://demo.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2">
//                     GitHub URL
//                   </label>
//                   <input
//                     type="url"
//                     name="githubUrl"
//                     value={formData.githubUrl}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                     placeholder="https://github.com/..."
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   rows="4"
//                   className={`w-full px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                   placeholder="Detailed description of your product"
//                   required
//                 />
//               </div>

//               {/* Thumbnail Upload */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Thumbnail Image *
//                 </label>
//                 <div className={`relative border-2 border-dashed rounded-lg p-4 ${currentTheme.border} hover:border-purple-500 transition`}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleThumbnailUpload}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                   />
//                   <div className="text-center">
//                     <CloudUpload className="mx-auto mb-2" size={32} />
//                     <p className="text-sm">Click or drag to upload thumbnail</p>
//                     <p className="text-xs opacity-60">Recommended: 800x600px</p>
//                   </div>
//                 </div>
//                 {thumbnail && (
//                   <div className="mt-2 relative">
//                     <img 
//                       src={thumbnail.url} 
//                       alt="Thumbnail" 
//                       className="h-20 w-20 object-cover rounded-lg"
//                     />
//                     <p className="text-xs text-green-500 mt-1">✓ Thumbnail selected</p>
//                   </div>
//                 )}
//               </div>

//               {/* Images Upload */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Product Images *
//                 </label>
//                 <div className={`relative border-2 border-dashed rounded-lg p-4 ${currentTheme.border} hover:border-purple-500 transition`}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleImageUpload}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                   />
//                   <div className="text-center">
//                     <CloudUpload className="mx-auto mb-2" size={32} />
//                     <p className="text-sm">Upload multiple images</p>
//                     <p className="text-xs opacity-60">JPG, PNG, WebP up to 10MB</p>
//                   </div>
//                 </div>
                
//                 {/* Image Preview */}
//                 {images.length > 0 && (
//                   <div className="grid grid-cols-4 gap-2 mt-3">
//                     {images.map((img, index) => (
//                       <div key={index} className="relative group">
//                         <img 
//                           src={img.url} 
//                           alt={`Product ${index + 1}`}
//                           className="w-full h-20 object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition"
//                         >
//                           <X size={12} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* ZIP File Upload */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   ZIP File (Optional)
//                 </label>
//                 <div className={`relative border-2 border-dashed rounded-lg p-4 ${currentTheme.border} hover:border-purple-500 transition`}>
//                   <input
//                     type="file"
//                     accept=".zip,.rar,.7z"
//                     onChange={handleZipUpload}
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                   />
//                   <div className="text-center">
//                     <FileArchive className="mx-auto mb-2" size={32} />
//                     <p className="text-sm">Upload project ZIP file</p>
//                     <p className="text-xs opacity-60">Max 50MB</p>
//                   </div>
//                 </div>
//                 {zipFile && (
//                   <p className="text-xs text-green-500 mt-1">
//                     ✓ {zipFile.name} ({(zipFile.size / 1024 / 1024).toFixed(2)} MB)
//                   </p>
//                 )}
//               </div>

//               {/* Social Links */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Social Links
//                 </label>
//                 <div className="flex gap-2 mb-2">
//                   <select
//                     value={socialLink.platform}
//                     onChange={(e) => setSocialLink({...socialLink, platform: e.target.value})}
//                     className={`flex-1 px-3 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
//                   >
//                     {platforms.map(p => (
//                       <option key={p.value} value={p.value}>
//                         {p.label}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     type="url"
//                     value={socialLink.url}
//                     onChange={(e) => setSocialLink({...socialLink, url: e.target.value})}
//                     className={`flex-1 px-3 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border}`}
//                     placeholder="https://..."
//                   />
//                   <button
//                     type="button"
//                     onClick={addSocialLink}
//                     className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
//                   >
//                     <Plus size={18} />
//                   </button>
//                 </div>

//                 {formData.socialLinks.length > 0 && (
//                   <div className="space-y-1 max-h-32 overflow-y-auto">
//                     {formData.socialLinks.map((link, index) => (
//                       <div key={index} className="flex items-center justify-between bg-gray-700 p-2 rounded-lg">
//                         <span className="text-sm truncate flex-1">
//                           <span className="font-semibold text-purple-400">
//                             {platforms.find(p => p.value === link.platform)?.label || link.platform}:
//                           </span>
//                           {' '}{link.url}
//                         </span>
//                         <button
//                           type="button"
//                           onClick={() => removeSocialLink(index)}
//                           className="text-red-500 hover:text-red-400"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Checkboxes */}
//               <div className="flex gap-6 pt-2">
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="featured"
//                     checked={formData.featured}
//                     onChange={handleChange}
//                     className="w-4 h-4 rounded"
//                   />
//                   <span className="text-sm">Featured Product</span>
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="inStock"
//                     checked={formData.inStock}
//                     onChange={handleChange}
//                     className="w-4 h-4 rounded"
//                   />
//                   <span className="text-sm">In Stock</span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition flex items-center gap-2 disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <Loader size={18} className="animate-spin" />
//                   {uploadProgress > 0 ? `${uploadProgress}%` : 'Saving...'}
//                 </>
//               ) : (
//                 <>
//                   <Check size={18} />
//                   {product ? 'Update Product' : 'Create Product'}
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;