import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    id: localStorage.getItem("id") || null,  // Menambahkan id pengguna
    isLoggedIn: !!localStorage.getItem("token"),
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.id = action.payload.id;  // Menyimpan id pengguna
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("id", action.payload.id);  // Menyimpan id ke localStorage
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.id = null;  // Menghapus id saat logout
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("id");  // Menghapus id dari localStorage
    },
  },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
