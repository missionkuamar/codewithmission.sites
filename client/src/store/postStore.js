import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const usePostStore = create((set, get) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    limit: 10
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Fetch all posts with pagination
  fetchPosts: async (page = 1, category = 'All', search = '') => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/posts', {
        params: { page, category, search }
      });
      
      if (response.data.success) {
        set({
          posts: response.data.data.posts,
          pagination: response.data.data.pagination,
          loading: false,
          error: null
        });
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || 'Failed to fetch posts');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to fetch posts';
      set({ 
        loading: false, 
        error: errorMessage,
        posts: []
      });
      console.error('Fetch posts error:', error);
      return { success: false, error: errorMessage };
    }
  },

  // Fetch single post
  fetchPost: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/posts/${id}`);
      
      if (response.data) {
        set({ currentPost: response.data, loading: false, error: null });
        return { success: true, data: response.data };
      } else {
        throw new Error('Post not found');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to fetch post';
      set({ 
        loading: false, 
        error: errorMessage,
        currentPost: null
      });
      console.error('Fetch post error:', error);
      return { success: false, error: errorMessage };
    }
  },

  // Create new post
  createPost: async (formData) => {
    set({ loading: true, error: null });
    
    // Validate form data
    const title = formData.get('title');
    const content = formData.get('content');
    
    if (!title || !title.trim()) {
      const errorMsg = 'Title is required';
      set({ loading: false, error: errorMsg });
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
    
    if (!content || !content.trim()) {
      const errorMsg = 'Content is required';
      set({ loading: false, error: errorMsg });
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
    
    try {
      const response = await axiosInstance.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        set(state => ({
          posts: [response.data.data, ...state.posts],
          loading: false,
          error: null
        }));
        toast.success(response.data.message || 'Post created successfully!');
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || 'Failed to create post');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to create post';
      set({ 
        loading: false, 
        error: errorMessage
      });
      console.error('Create post error:', error);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Update post
  updatePost: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        set(state => ({
          posts: state.posts.map(post => 
            post._id === id ? response.data.data : post
          ),
          currentPost: response.data.data,
          loading: false,
          error: null
        }));
        toast.success(response.data.message || 'Post updated successfully!');
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || 'Failed to update post');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to update post';
      set({ loading: false, error: errorMessage });
      console.error('Update post error:', error);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Delete post
  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/posts/${id}`);
      
      if (response.data) {
        set(state => ({
          posts: state.posts.filter(post => post._id !== id),
          currentPost: state.currentPost?._id === id ? null : state.currentPost,
          loading: false,
          error: null
        }));
        toast.success(response.data.message || 'Post deleted successfully!');
        return { success: true };
      } else {
        throw new Error(response.data?.message || 'Failed to delete post');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to delete post';
      set({ loading: false, error: errorMessage });
      console.error('Delete post error:', error);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Toggle like on post
  toggleLike: async (postId) => {
    try {
      const response = await axiosInstance.post(`/posts/${postId}/like`);
      
      if (response.data) {
        // Update posts array
        set(state => ({
          posts: state.posts.map(post =>
            post._id === postId ? response.data : post
          ),
          currentPost: state.currentPost?._id === postId ? response.data : state.currentPost
        }));
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to toggle like');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to like/unlike post';
      console.error('Toggle like error:', error);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Add comment to post
  addComment: async (postId, text) => {
    if (!text || !text.trim()) {
      const errorMsg = 'Comment text is required';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
    
    try {
      const response = await axiosInstance.post(`/posts/${postId}/comment`, { text });
      
      if (response.data) {
        set(state => ({
          posts: state.posts.map(post =>
            post._id === postId ? response.data : post
          ),
          currentPost: state.currentPost?._id === postId ? response.data : state.currentPost
        }));
        toast.success('Comment added successfully!');
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to add comment';
      console.error('Add comment error:', error);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Delete comment
  deleteComment: async (postId, commentId) => {
    try {
      const response = await axiosInstance.delete(`/posts/${postId}/comment/${commentId}`);
      
      if (response.data) {
        set(state => ({
          posts: state.posts.map(post =>
            post._id === postId ? response.data : post
          ),
          currentPost: state.currentPost?._id === postId ? response.data : state.currentPost
        }));
        toast.success('Comment deleted successfully!');
        return { success: true };
      } else {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to delete comment';
      console.error('Delete comment error:', error);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  // Get posts by category
  fetchPostsByCategory: async (category, page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/posts/category/${category}`, {
        params: { page }
      });
      
      if (response.data) {
        set({
          posts: response.data.posts,
          pagination: {
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages
          },
          loading: false,
          error: null
        });
        return { success: true };
      } else {
        throw new Error('Failed to fetch posts by category');
      }
    } catch (error) {
      const errorMessage = error.userMessage || error.response?.data?.message || 'Failed to fetch posts';
      set({ loading: false, error: errorMessage });
      console.error('Fetch posts by category error:', error);
      return { success: false, error: errorMessage };
    }
  }
}));

export default usePostStore;