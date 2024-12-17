import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchPengajuanByUserId = createAsyncThunk(
  'pengajuan/fetchPengajuanByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(
        `http://localhost:3001/api/v1/pengajuan/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'An error occurred while fetching pengajuan'
      );
    }
  }
);


export const deletePengajuan = createAsyncThunk(
  "pengajuan/deletePengajuan",
  async ({ idPengajuan, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/pengajuan/${idPengajuan}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Gagal menghapus pengajuan.");

      const data = await response.json();
      return { idPengajuan, message: data.message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const pengajuanSlice = createSlice({
  name: 'pengajuan',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPengajuanByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPengajuanByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPengajuanByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export default pengajuanSlice.reducer;
