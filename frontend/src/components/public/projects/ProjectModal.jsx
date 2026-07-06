// components/projects/ProjectModal.jsx
import React, { useEffect, useState } from 'react';
import { 
  X, ExternalLink, Heart, ShoppingCart, Star, 
  Calendar, Eye, User, Mail, Tag, Layers, Clock,
  Download, Share2, Check, ChevronLeft, ChevronRight
} from 'lucide-react';
import { FaYoutube, FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, addToWishlist, removeFromWishlist, addToCart, removeFromCart } from '../../../redux/slices/productSlice';
import toast from 'react-hot-toast';

const ProjectModal = ({ project, productId, onClose, currentTheme, currentMood }) => {
  const dispatch = useDispatch();
  const { product, wishlist = [], cart = [] } = useSelector((state) => state.products || {});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const displayProduct = project || product;

  // Fetch full product details if only ID is provided
  useEffect(() => {
    if (productId && !project) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId, project]);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsZoomed(false);
  }, [displayProduct]);

  
  if (!displayProduct) return null;

  const isInWishlist = wishlist.includes(displayProduct._id);
  const isInCart = cart.includes(displayProduct._id);

  // Get images
  const getImages = () => {
    if (displayProduct.images && displayProduct.images.length > 0) {
      return displayProduct.images.map(img => 
        typeof img === 'string' ? img : img?.url
      ).filter(Boolean);
    }
    if (displayProduct.thumbnail?.url) {
      return [displayProduct.thumbnail.url];
    }
    return ['https://via.placeholder.com/800x400?text=No+Image'];
  };

  // Get tags
  const getTags = () => {
    if (!displayProduct.tags) return [];
    if (Array.isArray(displayProduct.tags)) return displayProduct.tags;
    if (typeof displayProduct.tags === 'string') {
      try {
        return JSON.parse(displayProduct.tags);
      } catch {
        return displayProduct.tags.split(',').map(t => t.trim());
      }
    }
    return [];
  };

  const tags = getTags();
  const images = getImages();

  // Get social links
  const getSocialLinks = () => {
    if (!displayProduct.socialLinks) return [];
    return Array.isArray(displayProduct.socialLinks) ? displayProduct.socialLinks : [];
  };

  const socialLinks = getSocialLinks();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Image navigation
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleWishlistToggle = async () => {
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(displayProduct._id)).unwrap();
        toast.success('Removed from wishlist');
      } else {
        await dispatch(addToWishlist(displayProduct._id)).unwrap();
        toast.success('Added to wishlist ❤️');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    }
  };

  const handleCartToggle = async () => {
    try {
      if (isInCart) {
        await dispatch(removeFromCart(displayProduct._id)).unwrap();
        toast.success('Removed from cart');
      } else {
        await dispatch(addToCart(displayProduct._id)).unwrap();
        toast.success('Added to cart 🛒');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update cart');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: displayProduct.title,
        text: displayProduct.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'github': return <FaGithub size={16} />;
      case 'live-demo': return <ExternalLink size={16} />;
      case 'youtube': return <FaYoutube size={16} className="text-red-500" />;
      case 'instagram': return <FaInstagram size={16} className="text-pink-500" />;
      case 'twitter': return <FaTwitter size={16} className="text-sky-500" />;
      case 'facebook': return <FaFacebook size={16} className="text-blue-600" />;
      case 'linkedin': return <FaLinkedin size={16} className="text-blue-500" />;
      default: return <ExternalLink size={16} />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`${currentTheme.card} ${currentMood} rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit z-10">
          <h2 className="text-2xl font-bold line-clamp-1">{displayProduct.title}</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-700 transition"
            >
              <Share2 size={20} />
            </button>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg hover:bg-gray-700 transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Image Gallery - Main Display */}
          <div className="mb-6">
            <div className="relative bg-gray-900 rounded-xl overflow-hidden">
              <div 
                className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={toggleZoom}
              >
                <img
                  src={images[currentImageIndex]}
                  alt={`${displayProduct.title} - ${currentImageIndex + 1}`}
                  className={`w-full h-96 object-contain transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                  }}
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition"
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/70 rounded-full text-xs text-white">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}

                {/* Zoom Hint */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded text-xs text-white opacity-60">
                  {isZoomed ? '🔍 Zoom Out' : '🔍 Zoom In'}
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-purple-500 scale-105' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20">
                    {displayProduct.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    displayProduct.inStock 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {displayProduct.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {displayProduct.featured && (
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-500 flex items-center gap-1">
                      <Star size={14} /> Featured
                    </span>
                  )}
                  {displayProduct.type && (
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20">
                      {displayProduct.type}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed">{displayProduct.description}</p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  {/* <p className="text-3xl font-bold text-purple-400">${displayProduct.price}</p> */}
                  {displayProduct.mrp > displayProduct.price && (
                    <p className="text-sm line-through opacity-60">${displayProduct.mrp}</p>
                  )}
                </div>
                {/* Price and discount - commented out as requested */}
                {/* {displayProduct.discount > 0 && (
                  <div className="px-3 py-1 rounded-lg bg-green-500/20 text-green-500">
                    {displayProduct.discount}% OFF
                  </div>
                )} */}
              </div>

              {tags.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Tag size={16} /> Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 rounded-md text-xs bg-gray-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Layers size={16} /> Links
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                      >
                        {getPlatformIcon(link.platform)}
                        {link.label || link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons - commented out as requested */}
              {/* <div className="flex gap-3 pt-2">
                <button
                  onClick={handleWishlistToggle}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                    isInWishlist 
                      ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Heart size={18} className={isInWishlist ? 'fill-red-500' : ''} />
                  {isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                <button
                  onClick={handleCartToggle}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${
                    isInCart 
                      ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
                  }`}
                >
                  {isInCart ? (
                    <>
                      <Check size={18} /> In Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} /> Add to Cart
                    </>
                  )}
                </button>
              </div> */}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className={`${currentTheme.secondary} p-4 rounded-xl space-y-3`}>
                <h4 className="font-semibold mb-2">Product Information</h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">Created By</span>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{displayProduct.createdBy?.name || 'Unknown'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">Email</span>
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{displayProduct.createdBy?.email || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">Created</span>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(displayProduct.createdAt)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">Last Updated</span>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{formatDate(displayProduct.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Stats - commented out as requested */}
              {/* <div className="grid grid-cols-2 gap-3">
                <div className={`${currentTheme.secondary} p-3 rounded-xl text-center`}>
                  <Eye size={20} className="mx-auto mb-1 opacity-60" />
                  <p className="text-2xl font-bold">{displayProduct.views || 0}</p>
                  <p className="text-xs opacity-60">Views</p>
                </div>
                <div className={`${currentTheme.secondary} p-3 rounded-xl text-center`}>
                  <Heart size={20} className="mx-auto mb-1 opacity-60" />
                  <p className="text-2xl font-bold">{displayProduct.likes || 0}</p>
                  <p className="text-xs opacity-60">Likes</p>
                </div>
                <div className={`${currentTheme.secondary} p-3 rounded-xl text-center col-span-2`}>
                  <ShoppingCart size={20} className="mx-auto mb-1 opacity-60" />
                  <p className="text-2xl font-bold">{displayProduct.sales || 0}</p>
                  <p className="text-xs opacity-60">Total Sales</p>
                </div>
              </div> */}

              {/* Download/Info */}
              {displayProduct.zipFile && (
                <div className={`${currentTheme.secondary} p-3 rounded-xl flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <Download size={18} className="text-purple-500" />
                    <span className="text-sm">Project Files Available</span>
                  </div>
                  <span className="text-xs opacity-60">ZIP</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;