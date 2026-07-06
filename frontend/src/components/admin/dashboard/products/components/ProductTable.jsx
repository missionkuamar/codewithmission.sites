// admin/dashboard/products/components/ProductTable.jsx
import React, { useState } from 'react';
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight, Loader } from 'lucide-react';

export const ProductTable = ({ 
  products, 
  loading, 
  pagination, 
  currentPage, 
  itemsPerPage,
  onPageChange,
  onLimitChange,
  onEdit,
  onDelete,
  onView,
  onToggleStock,
  theme 
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const totalPages = pagination?.pages || 1;
  const totalItems = pagination?.total || 0;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(products.map(p => p._id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size={40} className="animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="pb-3 w-8">
                <input
                  type="checkbox"
                  checked={selectedItems.length === products.length && products.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-600"
                />
              </th>
              <th className="pb-3">Product</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Stock</th>
              <th className="pb-3">Sales</th>
              <th className="pb-3">Views</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-8 text-center opacity-60">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product._id)}
                      onChange={() => handleSelectItem(product._id)}
                      className="rounded border-gray-600"
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && (
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{product.title}</p>
                        <p className="text-xs opacity-75 truncate max-w-xs">
                          {product.description?.substring(0, 60)}...
                        </p>
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {product.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-xs px-1 py-0.5 bg-purple-500/20 rounded">
                                #{tag}
                              </span>
                            ))}
                            {product.tags.length > 2 && (
                              <span className="text-xs opacity-50">+{product.tags.length - 2}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="font-semibold">${product.price}</div>
                    {product.discount > 0 && (
                      <div className="text-xs text-green-500">-{product.discount}%</div>
                    )}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => onToggleStock(product._id, !product.inStock)}
                      className={`px-2 py-1 rounded-full text-xs transition ${
                        product.inStock 
                          ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
                          : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="py-4">{product.sales || 0}</td>
                  <td className="py-4">{product.views || 0}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onView(product._id)} 
                        className="p-1 hover:text-blue-500 transition"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => onEdit(product)} 
                        className="p-1 hover:text-yellow-500 transition"
                        title="Edit Product"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => onDelete(product._id)} 
                        className="p-1 hover:text-red-500 transition"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {products.length > 0 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-75">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className={`px-2 py-1 rounded-lg ${theme.secondary} border ${theme.border} text-sm focus:outline-none`}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm opacity-75">
              Showing {startIndex} to {endIndex} of {totalItems} products
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all ${
                currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : `${theme.card} hover:scale-105`
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : `${theme.card} hover:scale-105`
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : `${theme.card} hover:scale-105`
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};