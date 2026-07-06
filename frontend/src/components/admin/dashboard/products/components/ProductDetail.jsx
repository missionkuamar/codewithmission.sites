// admin/dashboard/products/components/ProductDetail.jsx
import React from 'react';
import { 
  X, ExternalLink,  Calendar, Eye, Heart, 
  ShoppingBag, Tag, Layers, Clock, User, Mail 
} from 'lucide-react';
import { FaGithub as GitHubIcon } from 'react-icons/fa';

// import { FaGithub } from "react-icons/fa";
export const ProductDetail = ({ product, onClose, theme }) => {
  if (!product) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className={`${theme.card} rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-inherit z-10">
          <h2 className="text-2xl font-bold">Product Details</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Product Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url || img}
                  alt={`${product.title} - ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg hover:scale-105 transition"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 opacity-60">
                No images available
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{product.title}</h3>
                <p className="mt-2 text-gray-300">{product.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20">
                  {product.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  product.inStock ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.featured && (
                  <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-500">
                    Featured
                  </span>
                )}
                {product.type && (
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20">
                    {product.type}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-3xl font-bold text-purple-400">${product.price}</p>
                  {product.mrp > product.price && (
                    <p className="text-sm line-through opacity-60">${product.mrp}</p>
                  )}
                </div>
                {product.discount > 0 && (
                  <div className="px-3 py-1 rounded-lg bg-green-500/20 text-green-500">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {product.tags && product.tags.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 rounded-md text-xs bg-gray-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {product.socialLinks && product.socialLinks.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2">Social Links</p>
                  <div className="flex flex-wrap gap-3">
                    {product.socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                      >
                        {link.platform === 'github' ? (
                          <GitHubIcon size={16} />
                        ) : link.platform === 'live-demo' ? (
                          <ExternalLink size={16} />
                        ) : (
                          <span>{link.platform}</span>
                        )}
                        {link.label || link.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className={`${theme.secondary} p-4 rounded-xl space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">Created By</span>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{product.createdBy?.name || 'Unknown'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">Email</span>
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{product.createdBy?.email || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">Created</span>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(product.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-75">Last Updated</span>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{formatDate(product.updatedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`${theme.secondary} p-3 rounded-xl text-center`}>
                  <Eye size={20} className="mx-auto mb-1 opacity-60" />
                  <p className="text-2xl font-bold">{product.views || 0}</p>
                  <p className="text-xs opacity-60">Views</p>
                </div>
                <div className={`${theme.secondary} p-3 rounded-xl text-center`}>
                  <Heart size={20} className="mx-auto mb-1 opacity-60" />
                  <p className="text-2xl font-bold">{product.likes || 0}</p>
                  <p className="text-xs opacity-60">Likes</p>
                </div>
                <div className={`${theme.secondary} p-3 rounded-xl text-center col-span-2`}>
                  <ShoppingBag size={20} className="mx-auto mb-1 opacity-60" />
                  <p className="text-2xl font-bold">{product.sales || 0}</p>
                  <p className="text-xs opacity-60">Total Sales</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {product.liveDemoUrl && (
                  <a
                    href={product.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
                {product.githubUrl && (
                  <a
                    href={product.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                  >
                    <GitHubIcon size={18} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};