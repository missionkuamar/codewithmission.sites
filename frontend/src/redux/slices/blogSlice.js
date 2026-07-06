// redux/slices/blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const API_URL = 'blogs';

// Get all blogs
export const getBlogs = createAsyncThunk(
  'blogs/getBlogs',
  async (params = {}, { rejectWithValue }) => {
    try {
      //  console.log('Fetching blogs with params:', params);
      const response = await api.get(API_URL, { params });
    //  console.log('Fetched blogs:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get single blog
export const getBlog = createAsyncThunk(
  'blogs/getBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create blog
export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async ({ data, onUploadProgress }, { rejectWithValue }) => {
    try {
       // console.log('Creating blog with data:', data);
      const response = await api.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress
      });
     // console.log('Created blog:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
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

// Delete blog
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Toggle featured
export const toggleFeatured = createAsyncThunk(
  'blogs/toggleFeatured',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/${id}/featured`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Toggle publish
export const togglePublish = createAsyncThunk(
  'blogs/togglePublish',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/${id}/publish`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get blog stats
export const getBlogStats = createAsyncThunk(
  'blogs/getBlogStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Like blog
export const likeBlog = createAsyncThunk(
  'blogs/likeBlog',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/${id}/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  blogs: [],
  blog: null,
  stats: null,
  pagination: {
    total: 0,
    page: 1,
    pages: 1,
    limit: 10
  },
  loading: false,
  error: null,
  success: false
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearBlog: (state) => {
      state.blog = null;
      state.success = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Blogs
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.pagination = action.payload.pagination;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Single Blog
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.blog;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blogs.unshift(action.payload.blog);
        state.blog = action.payload.blog;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.blog = action.payload.blog;
        const index = state.blogs.findIndex(b => b._id === action.payload.blog._id);
        if (index !== -1) {
          state.blogs[index] = action.payload.blog;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(b => b._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle Featured
      .addCase(toggleFeatured.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(b => b._id === action.meta.arg);
        if (index !== -1) {
          state.blogs[index].featured = action.payload.featured;
        }
        if (state.blog && state.blog._id === action.meta.arg) {
          state.blog.featured = action.payload.featured;
        }
      })
      
      // Toggle Publish
      .addCase(togglePublish.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(b => b._id === action.meta.arg);
        if (index !== -1) {
          state.blogs[index].published = action.payload.published;
        }
        if (state.blog && state.blog._id === action.meta.arg) {
          state.blog.published = action.payload.published;
        }
      })
      
      // Get Stats
      .addCase(getBlogStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
      })
      
      // Like Blog
      .addCase(likeBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(b => b._id === action.meta.arg);
        if (index !== -1) {
          state.blogs[index].likes = action.payload.likes;
        }
        if (state.blog && state.blog._id === action.meta.arg) {
          state.blog.likes = action.payload.likes;
        }
      });
  }
});

export const { clearBlog, clearError } = blogSlice.actions;
export default blogSlice.reducer;