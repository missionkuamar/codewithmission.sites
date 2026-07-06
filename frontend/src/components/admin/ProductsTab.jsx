// components/admin/ProductsTab.jsx - Updated with Pagination
import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Eye, Plus, X, Check, Loader, CloudUpload, Cloud, ChevronLeft, ChevronRight } from 'lucide-react';

import ProductModal from './dashboard/create-product/index.jsx';

const ProductsTab = ({ currentTheme }) => {
  const [products, setProducts] = useState([
    // ... existing products (keeping the same data)
    { id: 1, title: "AI Analytics Dashboard", description: "Real-time analytics platform with AI insights", price: 49, category: "AI/ML", images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200"], inStock: true, sales: 89, featured: true, discount: 10, createdAt: "2024-01-15" },
    { id: 2, title: "E-Commerce Platform", description: "Complete e-commerce solution", price: 79, category: "E-commerce", images: ["https://images.unsplash.com/photo-1557821552-17105176677c?w=200"], inStock: true, sales: 45, featured: true, discount: 20, createdAt: "2024-01-20" },
    { id: 3, title: "Social Media Mobile App", description: "Cross-platform social media app", price: 99, category: "Mobile App", images: ["https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200"], inStock: true, sales: 67, featured: false, discount: 0, createdAt: "2024-01-25" },
    { id: 4, title: "Healthcare Management System", description: "HIPAA-compliant healthcare platform", price: 149, category: "Web Development", images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200"], inStock: false, sales: 23, featured: false, discount: 15, createdAt: "2024-02-01" },
    { id: 5, title: "Blockchain Wallet", description: "Secure cryptocurrency wallet", price: 199, category: "Blockchain", images: ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200"], inStock: true, sales: 34, featured: true, discount: 25, createdAt: "2024-02-05" },
    { id: 6, title: "Smart Home IoT Hub", description: "Centralized IoT control system", price: 129, category: "IoT", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?w=200"], inStock: true, sales: 56, featured: false, discount: 10, createdAt: "2024-02-10" },
    { id: 7, title: "Portfolio Generator", description: "AI-powered portfolio builder", price: 59, category: "AI/ML", images: ["https://images.unsplash.com/photo-1547658719-da2b51169166?w=200"], inStock: true, sales: 78, featured: true, discount: 20, createdAt: "2024-02-12" },
    { id: 8, title: "Task Management System", description: "Collaborative task manager", price: 69, category: "Web Development", images: ["https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200"], inStock: true, sales: 92, featured: false, discount: 15, createdAt: "2024-02-15" },
    { id: 9, title: "Video Streaming Platform", description: "OTT platform solution", price: 299, category: "Mobile App", images: ["https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=200"], inStock: true, sales: 23, featured: true, discount: 30, createdAt: "2024-02-18" },
    { id: 10, title: "CRM Software", description: "Customer relationship management", price: 199, category: "E-commerce", images: ["https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200"], inStock: true, sales: 45, featured: false, discount: 25, createdAt: "2024-02-20" },
    { id: 11, title: "Learning Management System", description: "Online education platform", price: 249, category: "Web Development", images: ["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=200"], inStock: true, sales: 34, featured: true, discount: 20, createdAt: "2024-02-22" },
    { id: 12, title: "Chat Application", description: "Real-time messaging app", price: 89, category: "Mobile App", images: ["https://images.unsplash.com/photo-1611746873065-1e8d9f6e9b8f?w=200"], inStock: true, sales: 67, featured: false, discount: 10, createdAt: "2024-02-25" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const categories = ['all', 'AI/ML', 'E-commerce', 'Mobile App', 'Web Development', 'Blockchain', 'IoT'];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const toggleStock = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-75">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className={`px-2 py-1 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} text-sm focus:outline-none`}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm opacity-75">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : `${currentTheme.card} hover:scale-105`
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className={`px-3 py-1 rounded-lg transition-all ${currentTheme.card} hover:scale-105`}
              >
                1
              </button>
              {startPage > 2 && <span className="px-1">...</span>}
            </>
          )}
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-lg transition-all ${
                currentPage === number
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : `${currentTheme.card} hover:scale-105`
              }`}
            >
              {number}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-1">...</span>}
              <button
                onClick={() => paginate(totalPages)}
                className={`px-3 py-1 rounded-lg transition-all ${currentTheme.card} hover:scale-105`}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-all ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : `${currentTheme.card} hover:scale-105`
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Products Management ({filteredProducts.length} total)</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`px-4 py-2 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} focus:outline-none`}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-700">
            <tr className="text-left">
              <th className="pb-3">Product</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Stock</th>
              <th className="pb-3">Sales</th>
              <th className="pb-3">Actions</th>
             </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {product.images[0] && (
                      <img src={product.images[0]} alt={product.title} className="w-12 h-12 rounded-lg object-cover" />
                    )}
                    <div>
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-xs opacity-75">{product.description?.substring(0, 50)}...</p>
                    </div>
                  </div>
                 </td>
                <td className="py-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20">{product.category}</span>
                 </td>
                <td className="py-4">
                  <div className="font-semibold">${product.price}</div>
                  {product.discount > 0 && <div className="text-xs text-green-500">-{product.discount}%</div>}
                 </td>
                <td className="py-4">
                  <button
                    onClick={() => toggleStock(product.id)}
                    className={`px-2 py-1 rounded-full text-xs ${product.inStock ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                 </td>
                <td className="py-4">{product.sales}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingProduct(product); setShowModal(true); }} className="p-1 hover:text-blue-500">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="p-1 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-1 hover:text-green-500">
                      <Eye size={18} />
                    </button>
                  </div>
                 </td>
               </tr>
            ))}
          </tbody>
         </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && <Pagination />}

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSave={(product) => {
            if (editingProduct) {
              setProducts(products.map(p => p.id === product.id ? product : p));
            } else {
              setProducts([{ ...product, id: Date.now(), sales: 0 }, ...products]);
            }
            setShowModal(false);
          }}
          currentTheme={currentTheme}
        />
      )}
    </div>
  );
};

export default ProductsTab;