// // components/ProjectModal.jsx - Modal for Project Details
// import React, { useState, useEffect } from 'react';
// import { 
//   X, Eye, Download, Code, ExternalLink, Heart, Share2, Check, Copy, 
//   CloudDownload, ChevronLeft, ChevronRight, ShoppingCart, Star, 
//   Zap, Shield, Gift, Lock
// } from 'lucide-react';
// import { FaGithub } from "react-icons/fa";
// import { IoLogoYoutube } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { addToWishlist, removeFromWishlist, addToCart, removeFromCart, purchaseProduct } from '../redux/slices/productSlice';
// import toast from 'react-hot-toast';

// const ProjectModal = ({ project, onClose, currentTheme }) => {
//   const dispatch = useDispatch();
//   const { wishlist = [], cart = [], purchases = [], user } = useSelector((state) => state.products || {});
//   const [copied, setCopied] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [likesCount, setLikesCount] = useState(project?.likes || 0);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [allImages, setAllImages] = useState([]);
//   const [isPurchasing, setIsPurchasing] = useState(false);
//   const [showPurchaseModal, setShowPurchaseModal] = useState(false);

//   // Check if user has purchased this product
//   const isPurchased = purchases.some(p => p.product?._id === project?._id || p.productId === project?._id);
//   const isInWishlist = wishlist.includes(project?._id);
//   const isInCart = cart.includes(project?._id);

//   useEffect(() => {
//     if (project) {
//       const images = [];
//       if (project.thumbnail?.url) {
//         images.push(project.thumbnail.url);
//       }
//       if (project.images && Array.isArray(project.images)) {
//         project.images.forEach(img => {
//           if (img.url && !images.includes(img.url)) {
//             images.push(img.url);
//           }
//         });
//       }
//       if (images.length === 0) {
//         images.push('https://via.placeholder.com/800x400?text=No+Image');
//       }
//       setAllImages(images);
//     }
//   }, [project]);

//   if (!project) return null;

//   // Get social links
//   const getSocialLink = (platform) => {
//     if (!project.socialLinks) return null;
//     const link = project.socialLinks.find(link => link.platform === platform);
//     return link?.url || null;
//   };

//   const getGithubLink = () => getSocialLink('github') || project.githubUrl || null;
//   const getLiveDemoLink = () => getSocialLink('live-demo') || project.liveDemoUrl || null;
//   const getYoutubeLink = () => getSocialLink('youtube') || null;
//   const getZipUrl = () => project.zipFile?.url || null;

//   const getTags = () => {
//     if (!project.tags) return [];
//     if (Array.isArray(project.tags)) return project.tags;
//     if (typeof project.tags === 'string') {
//       try { return JSON.parse(project.tags); } 
//       catch { return project.tags.split(',').map(t => t.trim()); }
//     }
//     return [];
//   };

//   // Calculate discount
//   const getDiscount = () => {
//     if (project.mrp && project.price) {
//       return Math.round(((project.mrp - project.price) / project.mrp) * 100);
//     }
//     return 0;
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     toast.success('Link copied to clipboard!');
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleLike = () => {
//     if (liked) {
//       setLikesCount(prev => prev - 1);
//       setLiked(false);
//     } else {
//       setLikesCount(prev => prev + 1);
//       setLiked(true);
//       toast.success('Liked! ❤️');
//     }
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: project.title,
//           text: `Check out this project: ${project.title}`,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.log('Share cancelled');
//       }
//     } else {
//       await navigator.clipboard.writeText(window.location.href);
//       toast.success('Link copied to clipboard!');
//     }
//   };

//   const handleWishlistToggle = async () => {
//     try {
//       if (isInWishlist) {
//         await dispatch(removeFromWishlist(project._id)).unwrap();
//         toast.success('Removed from wishlist');
//       } else {
//         await dispatch(addToWishlist(project._id)).unwrap();
//         toast.success('Added to wishlist ❤️');
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to update wishlist');
//     }
//   };

//   const handleCartToggle = async () => {
//     try {
//       if (isInCart) {
//         await dispatch(removeFromCart(project._id)).unwrap();
//         toast.success('Removed from cart');
//       } else {
//         await dispatch(addToCart(project._id)).unwrap();
//         toast.success('Added to cart 🛒');
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to update cart');
//     }
//   };

//   const handlePurchase = async () => {
//     if (!user) {
//       toast.error('Please login to purchase');
//       return;
//     }
    
//     setIsPurchasing(true);
//     try {
//       const result = await dispatch(purchaseProduct({
//         productId: project._id,
//         paymentData: {
//           method: 'card',
//           amount: project.price
//         }
//       })).unwrap();
      
//       toast.success('Purchase successful! 🎉');
//       setShowPurchaseModal(false);
//       onClose();
//     } catch (error) {
//       toast.error(error.message || 'Purchase failed');
//     } finally {
//       setIsPurchasing(false);
//     }
//   };

//   const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % allImages.length);
//   const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);

//   const getCategoryLabel = (category) => {
//     const categories = {
//       'web-development': 'Web Development',
//       'mobile-app': 'Mobile App',
//       'e-commerce': 'E-Commerce',
//       'ai-ml': 'AI/ML',
//       'blockchain': 'Blockchain',
//       'iot': 'IoT',
//       'cloud-services': 'Cloud Services',
//       'design': 'Design',
//       'other': 'Other'
//     };
//     return categories[category] || category || 'Uncategorized';
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
//       <div className={`${currentTheme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
//         {/* Header */}
//         <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit rounded-t-2xl">
//           <h2 className="text-2xl font-bold truncate">{project.title}</h2>
//           <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
//             <X size={24} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Image Gallery */}
//           <div className="relative mb-6 group">
//             <img
//               src={allImages[currentImageIndex]}
//               alt={project.title}
//               className="w-full h-64 md:h-80 object-cover rounded-xl"
//             />
//             {allImages.length > 1 && (
//               <>
//                 <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
//                   <ChevronLeft size={24} className="text-white" />
//                 </button>
//                 <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
//                   <ChevronRight size={24} className="text-white" />
//                 </button>
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                   {allImages.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Price & MRP */}
//           <div className="mb-4 flex items-center gap-4">
//             <div>
//               <span className="text-3xl font-bold text-purple-500">${project.price}</span>
//               {project.mrp && project.mrp > project.price && (
//                 <>
//                   <span className="ml-2 text-lg text-gray-400 line-through">${project.mrp}</span>
//                   <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
//                     {getDiscount()}% OFF
//                   </span>
//                 </>
//               )}
//             </div>
//             {project.inStock ? (
//               <span className="flex items-center gap-1 text-green-500 text-sm">
//                 <Zap size={16} /> In Stock
//               </span>
//             ) : (
//               <span className="flex items-center gap-1 text-red-500 text-sm">
//                 <Lock size={16} /> Out of Stock
//               </span>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//             {getLiveDemoLink() && (
//               <a href={getLiveDemoLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:scale-105 transition-transform text-white text-sm font-medium">
//                 <ExternalLink size={18} /> Live Demo
//               </a>
//             )}
            
//             {getYoutubeLink() && (
//               <a href={getYoutubeLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:scale-105 transition-transform text-white text-sm font-medium">
//                 <IoLogoYoutube size={18} /> Watch Video
//               </a>
//             )}
            
//             {getGithubLink() && (
//               <a href={getGithubLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:scale-105 transition-transform text-white text-sm font-medium">
//                 <FaGithub size={18} /> Source Code
//               </a>
//             )}
            
//             {/* ZIP Download - Only show if purchased */}
//             {isPurchased && getZipUrl() && (
//               <a href={getZipUrl()} download className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 rounded-lg hover:scale-105 transition-transform text-white text-sm font-medium">
//                 <CloudDownload size={18} /> Download ZIP
//               </a>
//             )}
//           </div>

//           {/* Purchase/Wishlist/Cart Actions */}
//           <div className="flex flex-wrap gap-3 mb-6">
//             {!isPurchased && project.inStock && (
//               <button
//                 onClick={() => setShowPurchaseModal(true)}
//                 className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
//               >
//                 <ShoppingCart size={20} /> Buy Now - ${project.price}
//               </button>
//             )}
            
//             {isPurchased && (
//               <div className="flex-1 px-6 py-3 bg-green-500/20 text-green-500 font-semibold rounded-lg flex items-center justify-center gap-2">
//                 <Gift size={20} /> Purchased ✓
//               </div>
//             )}

//             <button
//               onClick={handleWishlistToggle}
//               className={`px-4 py-3 rounded-lg transition flex items-center gap-2 ${
//                 isInWishlist ? 'bg-red-500/20 text-red-500' : 'bg-gray-700 hover:bg-gray-600'
//               }`}
//             >
//               <Heart size={20} className={isInWishlist ? 'fill-red-500' : ''} />
//               {isInWishlist ? 'Wishlisted' : 'Wishlist'}
//             </button>

//             <button
//               onClick={handleCartToggle}
//               className={`px-4 py-3 rounded-lg transition flex items-center gap-2 ${
//                 isInCart ? 'bg-green-500/20 text-green-500' : 'bg-gray-700 hover:bg-gray-600'
//               }`}
//             >
//               <ShoppingCart size={20} />
//               {isInCart ? 'In Cart' : 'Add to Cart'}
//             </button>
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold mb-2">Description</h3>
//             <p className="opacity-90 leading-relaxed whitespace-pre-wrap">
//               {project.description || 'No description available'}
//             </p>
//           </div>

//           {/* Category */}
//           {project.category && (
//             <div className="mb-4">
//               <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-sm">
//                 Category: {getCategoryLabel(project.category)}
//               </span>
//             </div>
//           )}

//           {/* Tags */}
//           {getTags().length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-xl font-semibold mb-2">Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {getTags().map((tag) => (
//                   <span key={tag} className="px-3 py-1 rounded-full bg-gray-700 text-sm">#{tag}</span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-gray-800/50">
//             <div className="text-center">
//               <Heart className={`inline mb-1 ${liked ? 'text-red-500 fill-red-500' : 'text-red-500'}`} size={24} />
//               <p className="text-2xl font-bold">{likesCount}</p>
//               <p className="text-sm opacity-75">Likes</p>
//             </div>
//             <div className="text-center">
//               <Eye className="inline mb-1" size={24} />
//               <p className="text-2xl font-bold">{project.views || 0}</p>
//               <p className="text-sm opacity-75">Views</p>
//             </div>
//             <div className="text-center">
//               <Code className="inline mb-1" size={24} />
//               <p className="text-2xl font-bold">{getTags().length}</p>
//               <p className="text-sm opacity-75">Tags</p>
//             </div>
//           </div>

//           {/* Share Section */}
//           <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-gray-700">
//             <div>
//               <p className="text-sm opacity-75">
//                 Price: <span className="text-2xl font-bold text-purple-500">${project.price}</span>
//               </p>
//               {project.type && (
//                 <p className="text-xs opacity-50 mt-1">Type: {project.type === 'gallery' ? 'Gallery' : 'Single Image'}</p>
//               )}
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <button onClick={handleCopyLink} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
//                 {copied ? <Check size={18} /> : <Copy size={18} />}
//                 {copied ? 'Copied!' : 'Copy Link'}
//               </button>
//               <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${liked ? 'bg-red-500/20 text-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
//                 <Heart size={18} className={liked ? 'fill-red-500' : ''} />
//                 {liked ? 'Liked' : 'Like'}
//               </button>
//               <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm">
//                 <Share2 size={18} /> Share
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Purchase Modal */}
//       {showPurchaseModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
//           <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Confirm Purchase</h3>
//               <button onClick={() => setShowPurchaseModal(false)} className="p-1 hover:bg-gray-700 rounded-lg">
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="mb-4 p-4 bg-gray-800 rounded-lg">
//               <p className="font-semibold">{project.title}</p>
//               <p className="text-2xl font-bold text-purple-500 mt-2">${project.price}</p>
//             </div>

//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between text-sm">
//                 <span className="opacity-75">Subtotal</span>
//                 <span>${project.price}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="opacity-75">Tax</span>
//                 <span>$0.00</span>
//               </div>
//               <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
//                 <span>Total</span>
//                 <span className="text-purple-500">${project.price}</span>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowPurchaseModal(false)}
//                 className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handlePurchase}
//                 disabled={isPurchasing}
//                 className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition flex items-center justify-center gap-2"
//               >
//                 {isPurchasing ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     Processing...
//                   </>
//                 ) : (
//                   <>Confirm Purchase</>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectModal;