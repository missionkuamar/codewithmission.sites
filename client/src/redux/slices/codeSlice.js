import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCodes = createAsyncThunk('code/fetchCodes', async () => {
  const { data } = await api.get('/codes');
  return data.codes;
});

export const downloadCode = createAsyncThunk('code/downloadCode', async (id) => {
  const { data } = await api.get(`/codes/${id}/download`);
  return data;
});

const codeSlice = createSlice({
  name: 'code',
  initialState: {
    codes: [],
    selectedCode: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.codes = action.payload;
      })
      .addCase(fetchCodes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default codeSlice.reducer;