import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all projects with filters
export const fetchProjectsAction = createAsyncThunk(
  'projects/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/projects', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch single project
export const fetchProjectByIdAction = createAsyncThunk(
  'projects/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create project
export const createProjectAction = createAsyncThunk(
  'projects/create',
  async (projectData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await api.post('/projects', projectData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update project
export const updateProjectAction = createAsyncThunk(
  'projects/update',
  async ({ id, projectData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await api.put(`/projects/${id}`, projectData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete project
export const deleteProjectAction = createAsyncThunk(
  'projects/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);