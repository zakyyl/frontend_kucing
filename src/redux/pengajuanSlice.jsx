import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk fetch pengajuan berdasarkan ID pengguna
export const fetchPengajuanByUserId = createAsyncThunk(
  "pengajuan/fetchPengajuanByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      // Ambil token dari localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(
        `http://localhost:3001/api/v1/pengajuan/user/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}` // Pastikan format Bearer
          }
        }
      );
      return response.data.data; // Pastikan ini sesuai dengan struktur data respons
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'An error occurred while fetching pengajuan'
      );
    }
  }
);

const pengajuanSlice = createSlice({
  name: "pengajuan",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPengajuanByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPengajuanByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPengajuanByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default pengajuanSlice.reducer;