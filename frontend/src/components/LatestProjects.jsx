// components/LatestProjects.jsx (with Modal)
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { Eye, ExternalLink, ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';
import { IoLogoYoutube } from "react-icons/io";
import { getProducts, addToWishlist, removeFromWishlist, addToCart, removeFromCart, getProduct } from '../redux/slices/productSlice';
import toast from 'react-hot-toast';
import ProjectModal from '../components/public/projects/ProjectModal'; // Import the public modal

const LatestProjects = () => {
  const dispatch = useDispatch();
  const { currentTheme, currentMood } = useTheme();
  const { products, loading } = useSelector((state) => state.products || {});
  const { wishlist = [], cart = [] } = useSelector((state) => state.products || {});
  
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch latest products on mount
  useEffect(() => {
    dispatch(getProducts({ 
      limit: 12, 
      sortBy: 'createdAt', 
      sortOrder: 'desc' 
    }));
  }, [dispatch]);

  const latestProducts = products || [];
  const displayedProducts = showAll 
    ? latestProducts 
    : latestProducts.slice(0, visibleCount);

  const handleViewAll = () => {
    setShowAll(!showAll);
    if (!showAll && latestProducts.length < 12) {
      dispatch(getProducts({ 
        limit: 12, 
        sortBy: 'createdAt', 
        sortOrder: 'desc' 
      }));
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProject(product);
    setShowModal(true);
    // Optionally fetch full product details
    if (product._id) {
      dispatch(getProduct(product._id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const getImageUrl = (product) => {
    if (product.thumbnail?.url) return product.thumbnail.url;
    if (product.images && product.images.length > 0) {
      return typeof product.images[0] === 'string' 
        ? product.images[0] 
        : product.images[0]?.url;
    }
    return 'https://via.placeholder.com/600x400?text=No+Image';
  };

  const getTags = (product) => {
    if (!product.tags) return [];
    if (Array.isArray(product.tags)) return product.tags;
    if (typeof product.tags === 'string') {
      try {
        return JSON.parse(product.tags);
      } catch {
        return product.tags.split(',').map(t => t.trim());
      }
    }
    return [];
  };

  const getSocialLink = (product, platform) => {
    if (!product.socialLinks) return null;
    const links = Array.isArray(product.socialLinks) ? product.socialLinks : [];
    return links.find(link => link.platform === platform)?.url;
  };

  const handleWishlistToggle = async (e, productId) => {
    e.stopPropagation();
    const isInWishlist = wishlist.includes(productId);
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(productId)).unwrap();
        toast.success('Removed from wishlist');
      } else {
        await dispatch(addToWishlist(productId)).unwrap();
        toast.success('Added to wishlist ❤️');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    }
  };

  const handleCartToggle = async (e, productId) => {
    e.stopPropagation();
    const isInCart = cart.includes(productId);
    try {
      if (isInCart) {
        await dispatch(removeFromCart(productId)).unwrap();
        toast.success('Removed from cart');
      } else {
        await dispatch(addToCart(productId)).unwrap();
        toast.success('Added to cart 🛒');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update cart');
    }
  };

  if (loading && latestProducts.length === 0) {
    return (
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl opacity-75 max-w-2xl mx-auto">
              Explore my recent work and creative solutions
            </p>
            {latestProducts.length > 0 && (
              <p className="text-sm opacity-60 mt-2">
                Showing {showAll ? 'all' : Math.min(visibleCount, latestProducts.length)} of {latestProducts.length} projects
              </p>
            )}
          </div>

          {latestProducts.length === 0 && !loading ? (
            <div className="text-center py-12">
              <p className="text-xl opacity-75">No projects available yet</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProducts.map((project, index) => {
                  const isInWishlist = wishlist.includes(project._id);
                  const isInCart = cart.includes(project._id);
                  const tags = getTags(project);
                  const liveUrl = getSocialLink(project, 'live-demo');
                  
                  return (
                    <div
                      key={project._id}
                      className={`${currentTheme.card} ${currentMood} overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group cursor-pointer`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => handleViewDetails(project)}
                    >
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={getImageUrl(project)}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                          }}
                        />
                        
                        {project.featured && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full flex items-center gap-1">
                            <Star size={12} /> Featured
                          </div>
                        )}

                        {project.discount > 0 && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                            {project.discount}% OFF
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(project);
                            }}
                            className="p-2 bg-white rounded-full hover:scale-110 transition-transform"
                          >
                            <Eye size={20} className="text-gray-900" />
                          </button>
                          
                          <button
                            onClick={(e) => handleWishlistToggle(e, project._id)}
                            className={`p-2 rounded-full hover:scale-110 transition ${
                              isInWishlist ? 'bg-red-500' : 'bg-gray-700'
                            }`}
                          >
                            <Heart size={20} className={isInWishlist ? 'fill-white text-white' : 'text-white'} />
                          </button>
                          
                          <button
                            onClick={(e) => handleCartToggle(e, project._id)}
                            className={`p-2 rounded-full hover:scale-110 transition ${
                              isInCart ? 'bg-green-500' : 'bg-purple-500'
                            }`}
                          >
                            <ShoppingCart size={20} className="text-white" />
                          </button>

                          {liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 bg-green-600 rounded-full hover:scale-110 transition"
                            >
                              <ExternalLink size={20} className="text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                        <p className="opacity-75 mb-4 line-clamp-2 text-sm">{project.description}</p>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-purple-500">${project.price}</span>
                          {project.mrp > project.price && (
                            <span className="text-sm text-gray-400 line-through">${project.mrp}</span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                            >
                              #{tag}
                            </span>
                          ))}
                          {tags.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20">
                              +{tags.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1">
                              <Heart size={14} className="text-red-500" /> {project.likes || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye size={14} /> {project.views || 0}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(project);
                            }}
                            className="text-purple-500 hover:text-purple-400 flex items-center gap-1 group"
                          >
                            View Details 
                            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {latestProducts.length > visibleCount && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleViewAll}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto group"
                  >
                    {showAll ? (
                      <>Show Less <ChevronRight className="rotate-90 group-hover:translate-y-1 transition-transform" /></>
                    ) : (
                      <>View All Projects <ChevronRight className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {showModal && selectedProject && (
        <ProjectModal
          project={selectedProject}
          productId={selectedProject._id}
          onClose={handleCloseModal}
          currentTheme={currentTheme}
          currentMood={currentMood}
        />
      )}
    </>
  );
};

export default LatestProjects;