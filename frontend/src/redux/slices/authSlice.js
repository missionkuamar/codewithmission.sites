import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
     // console.log('📤 Sending Google credential to backend...');
      //console.log('Credential length:', credential?.length);

      const response = await api.post('/auth/google', { credential });

     // console.log('📥 Backend response:', response.data);

      const data = response.data;

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
       // console.log('✅ User authenticated:', data.user.email);
        return data;
      } else {
//console.error('❌ Login failed:', data.message);
        return rejectWithValue(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Google login API error:', error);

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        return rejectWithValue(error.response.data?.message || 'Server error');
      } else if (error.request) {
        console.error('No response from server');
        return rejectWithValue('Server is not responding. Please check if backend is running.');
      } else {
        console.error('Error:', error.message);
        return rejectWithValue(error.message || 'Login failed');
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      ////console.log('📤 Getting current user...');
      const { data } = await api.get('/auth/me');

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
       // console.log('✅ User data received:', data.user.email);
        return data;
      }
      return rejectWithValue('Failed to get user');
    } catch (error) {
      console.error('❌ Get current user error:', error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
     // console.log('✅ User logged out');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: (() => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })(),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
  getCurrentUserData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
       // console.log('⏳ Google login pending...');
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
       // console.log('✅ Google login fulfilled');
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.error('❌ Google login rejected:', state.error);
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log(action)
        state.isLoading = false;
        state.getCurrentUserData = action.payload.user;
        state.isAuthenticated = true;
       // console.log('✅ Current user loaded');
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
       // console.error('❌ Failed to load current user');
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
       // console.log('✅ Logout successful');
      });
  },
});

export const { clearError, setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;