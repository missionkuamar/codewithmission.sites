// admin/dashboard/products/hooks/useProducts.js
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { 
  getProducts, 
  getProduct, 
  deleteProduct, 
  updateProduct,
  clearProduct 
} from '../../../../../redux/slices/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, product, pagination, loading, error } = useSelector(
    (state) => state.products
  );
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    featured: '',
    inStock: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: 10,
  });

  // Fetch products with filters and pagination
  const fetchProducts = useCallback(async () => {
    try {
      const params = {
        ...filters,
        ...paginationState,
        // Remove empty filters
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '' && v !== null)
        ),
      };
      
      await dispatch(getProducts(params)).unwrap();
    } catch (error) {
      toast.error(error.message || 'Failed to fetch products');
    }
  }, [dispatch, filters, paginationState]);

  // Fetch single product
  const fetchProduct = useCallback(async (id) => {
    try {
      await dispatch(getProduct(id)).unwrap();
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to fetch product');
      return false;
    }
  }, [dispatch]);

  // Delete product
  const deleteProductById = useCallback(async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success('Product deleted successfully');
      await fetchProducts(); // Refresh list
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to delete product');
      return false;
    }
  }, [dispatch, fetchProducts]);

  // Update product stock
  const updateProductStock = useCallback(async (id, inStock) => {
    try {
      const formData = new FormData();
      formData.append('inStock', String(inStock));
      
      await dispatch(updateProduct({ 
        id, 
        data: formData 
      })).unwrap();
      
      toast.success(`Product ${inStock ? 'restocked' : 'out of stock'}`);
      await fetchProducts(); // Refresh list
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to update stock');
      return false;
    }
  }, [dispatch, fetchProducts]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPaginationState(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  // Change page
  const changePage = useCallback((page) => {
    setPaginationState(prev => ({ ...prev, page }));
  }, []);

  // Change items per page
  const changeLimit = useCallback((limit) => {
    setPaginationState({ page: 1, limit });
  }, []);

  // Clear product detail
  const clearProductDetail = useCallback(() => {
    dispatch(clearProduct());
  }, [dispatch]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    product,
    pagination,
    loading,
    error,
    filters,
    paginationState,
    fetchProducts,
    fetchProduct,
    deleteProductById,
    updateProductStock,
    updateFilters,
    changePage,
    changeLimit,
    clearProductDetail,
  };
};