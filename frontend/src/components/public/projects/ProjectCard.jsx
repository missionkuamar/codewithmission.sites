// components/projects/ProjectCard.jsx
import React, { useState } from 'react';
import { Eye, ExternalLink, Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, addToCart, removeFromCart } from '../../../redux/slices/productSlice';
import toast from 'react-hot-toast';

const ProjectCard = ({ project, onViewDetails, currentTheme, currentMood }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { wishlist = [], cart = [] } = useSelector((state) => state.products || {});
  
  const isInWishlist = wishlist.includes(project._id);
  const isInCart = cart.includes(project._id);

  // Get the first image or thumbnail
  const getImageUrl = () => {
    if (project.thumbnail?.url) return project.thumbnail.url;
    if (project.images && project.images.length > 0) {
      return typeof project.images[0] === 'string' 
        ? project.images[0] 
        : project.images[0]?.url;
    }
    return 'https://via.placeholder.com/400x300?text=No+Image';
  };

  // Get tags
  const getTags = () => {
    if (!project.tags) return [];
    if (Array.isArray(project.tags)) return project.tags;
    if (typeof project.tags === 'string') {
      try {
        return JSON.parse(project.tags);
      } catch {
        return project.tags.split(',').map(t => t.trim());
      }
    }
    return [];
  };

  const tags = getTags();

  // Calculate discount percentage
  const getDiscount = () => {
    if (project.mrp && project.price) {
      return Math.round(((project.mrp - project.price) / project.mrp) * 100);
    }
    return 0;
  };

  // Get social link
  const getSocialLink = (platform) => {
    if (!project.socialLinks) return null;
    const links = Array.isArray(project.socialLinks) ? project.socialLinks : [];
    return links.find(link => link.platform === platform)?.url;
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(project._id)).unwrap();
        toast.success('Removed from wishlist');
      } else {
        await dispatch(addToWishlist(project._id)).unwrap();
        toast.success('Added to wishlist ❤️');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    }
  };

  const handleCartToggle = async (e) => {
    e.stopPropagation();
    try {
      if (isInCart) {
        await dispatch(removeFromCart(project._id)).unwrap();
        toast.success('Removed from cart');
      } else {
        await dispatch(addToCart(project._id)).unwrap();
        toast.success('Added to cart 🛒');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update cart');
    }
  };

  return (
    <div
      className={`${currentTheme.card} ${currentMood} overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group cursor-pointer rounded-xl`}
      //onMouseEnter={() => setIsHovered(true)}
     // onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={getImageUrl()} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Discount Badge */}
        {getDiscount() > 0 && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
            {getDiscount()}% OFF
          </div>
        )}
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full flex items-center gap-1">
            <Star size={12} /> Featured
          </div>
        )}

        {/* Stock Status */}
        {!project.inStock && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
            Out of Stock
          </div>
        )}

        {/* Hover Actions */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4">
            {/* <button 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }} 
              className="p-2 bg-white rounded-full hover:scale-110 transition"
            >
              <Eye size={20} className="text-gray-900" />
            </button> */}
            
            {/* Wishlist Button */}
            {/* <button 
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full hover:scale-110 transition ${
                isInWishlist ? 'bg-red-500' : 'bg-gray-700'
              }`}
            >
              <Heart size={20} className={isInWishlist ? 'fill-white text-white' : 'text-white'} />
            </button> */}
            
            {/* Cart Button */}
            {/* <button 
              onClick={handleCartToggle}
              className={`p-2 rounded-full hover:scale-110 transition ${
                isInCart ? 'bg-green-500' : 'bg-purple-500'
              }`}
            >
              <ShoppingCart size={20} className="text-white" />
            </button> */}

            {getSocialLink('live-demo') && (
              <a 
                href={getSocialLink('live-demo')} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-green-600 rounded-full hover:scale-110 transition"
              >
                <ExternalLink size={20} className="text-white" />
              </a>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
        <p className="opacity-75 mb-3 line-clamp-2 text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-full bg-purple-500/20">
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20">
              +{tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            {/* <span className="text-2xl font-bold text-purple-500">${project.price}</span> */}
            {/* {project.mrp && project.mrp > project.price && (
              <span className="ml-2 text-sm text-gray-400 line-through">${project.mrp}</span>
            )} */}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              {/* <Heart size={14} className="text-red-500" /> {project.likes || 0} */}
            </span>
            <span className="flex items-center gap-1">
              {/* <Eye size={14} /> {project.views || 0} */}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }} 
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform"
          >
            View Details
          </button>
          {/* <button 
            onClick={handleCartToggle}
            className={`px-3 py-2 rounded-lg transition ${
              isInCart ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <ShoppingCart size={18} className="text-white" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;