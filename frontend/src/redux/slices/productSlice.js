// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const API_URL = 'products';

// Create Product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async ({ data, onUploadProgress }, { rejectWithValue }) => {
    try {
     // console.log(data, onUploadProgress);
      const response = await api.post(`${API_URL}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress
      });
     // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get Products
// redux/slices/productSlice.js
// Update the getProducts thunk to handle advanced search
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Build query string for better search
      const queryParams = new URLSearchParams();
      
      if (params.search) queryParams.append('search', params.search);
      if (params.category) queryParams.append('category', params.category);
      if (params.type) queryParams.append('type', params.type);
      if (params.featured) queryParams.append('featured', params.featured);
      if (params.inStock) queryParams.append('inStock', params.inStock);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      
      const url = `${API_URL}?${queryParams.toString()}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Get Single Product
export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data, onUploadProgress }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Purchase Product
export const purchaseProduct = createAsyncThunk(
  'products/purchaseProduct',
  async ({ productId, paymentData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/purchase`, {
        productId,
        paymentData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add to Wishlist
export const addToWishlist = createAsyncThunk(
  'products/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/wishlist`, { productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk(
  'products/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add to Cart
export const addToCart = createAsyncThunk(
  'products/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/cart`, { productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  'products/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/cart/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get User Purchases
export const getUserPurchases = createAsyncThunk(
  'products/getUserPurchases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/my-purchases`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  products: [],
  product: null,
  pagination: {
    total: 0,
    page: 1,
    pages: 1
  },
  loading: false,
  error: null,
  success: false,
  wishlist: [],
  cart: [],
  purchases: [],
  isPurchased: false
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.success = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      const index = state.wishlist.indexOf(productId);
      if (index > -1) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(productId);
      }
    },
    toggleCart: (state, action) => {
      const productId = action.payload;
      const index = state.cart.indexOf(productId);
      if (index > -1) {
        state.cart.splice(index, 1);
      } else {
        state.cart.push(productId);
      }
    },
    resetPurchase: (state) => {
      state.isPurchased = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.unshift(action.payload.product);
        state.product = action.payload.product;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Single Product
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload.product;
        const index = state.products.findIndex(p => p._id === action.payload.product._id);
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Purchase Product
      .addCase(purchaseProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isPurchased = true;
        state.purchases.push(action.payload.purchase);
        // Remove from cart
        state.cart = state.cart.filter(id => id !== action.payload.productId);
      })
      .addCase(purchaseProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User Purchases
      .addCase(getUserPurchases.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload.purchases;
      })
      .addCase(getUserPurchases.rejected, (state) => {
        state.loading = false;
      })

      // Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (!state.wishlist.includes(action.payload.productId)) {
          state.wishlist.push(action.payload.productId);
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(id => id !== action.payload.productId);
      })

      // Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        if (!state.cart.includes(action.payload.productId)) {
          state.cart.push(action.payload.productId);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(id => id !== action.payload.productId);
      });
  }
});

export const { clearProduct, clearError, toggleWishlist, toggleCart, resetPurchase } = productSlice.actions;
export default productSlice.reducer;