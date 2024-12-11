import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    id: localStorage.getItem("id") || null,
    nama: localStorage.getItem("nama") || "", // Menambahkan nama pengguna
    isLoggedIn: !!localStorage.getItem("token"),
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.nama = action.payload.nama; // Menyimpan nama pengguna
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("nama", action.payload.nama); // Menyimpan nama ke localStorage
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.id = null;
      state.nama = ""; // Reset nama saat logout
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("nama"); // Hapus nama dari localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
