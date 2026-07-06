// admin/dashboard/products/index.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { ProductStats } from './components/ProductStats';
import { ProductFilters } from './components/ProductFilters';
import { ProductTable } from './components/ProductTable';
import { ProductDetail } from './components/ProductDetail';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import ProductModal from '../create-product/index.jsx';

const ProductsTab = ({ currentTheme }) => {
  const {
    products,
    product,
    pagination,
    loading,
    filters,
    paginationState,
    fetchProduct,
    deleteProductById,
    updateProductStock,
    updateFilters,
    changePage,
    changeLimit,
    clearProductDetail,
    fetchProducts,
  } = useProducts();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowCreateModal(true);
  };

  const handleView = async (id) => {
    const success = await fetchProduct(id);
    if (success) {
      setShowDetail(true);
    }
  };

  const handleDelete = (id) => {
    const productToDelete = products.find(p => p._id === id);
    setProductToDelete(productToDelete);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProductById(productToDelete._id);
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleToggleStock = async (id, newStatus) => {
    await updateProductStock(id, newStatus);
  };

  const handleSaveProduct = async () => {
    setShowCreateModal(false);
    setEditingProduct(null);
    await fetchProducts(); // ✅ Refresh the list
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Products Management</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowCreateModal(true);
          }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Stats */}
      <ProductStats products={products} theme={currentTheme} />

      {/* Filters */}
      <ProductFilters
        filters={filters}
        onFilterChange={updateFilters}
        theme={currentTheme}
        loading={loading}
      />

      {/* Table */}
      <ProductTable
        products={products}
        loading={loading}
        pagination={pagination}
        currentPage={paginationState.page}
        itemsPerPage={paginationState.limit}
        onPageChange={changePage}
        onLimitChange={changeLimit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onToggleStock={handleToggleStock}
        theme={currentTheme}
      />

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setShowCreateModal(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
          currentTheme={currentTheme}
        />
      )}

      {/* Product Detail Modal */}
      {showDetail && (
        <ProductDetail
          product={product}
          onClose={() => {
            setShowDetail(false);
            clearProductDetail();
          }}
          theme={currentTheme}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          product={productToDelete}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setProductToDelete(null);
          }}
          theme={currentTheme}
        />
      )}
    </div>
  );
};

export default ProductsTab;