import { createSlice } from '@reduxjs/toolkit';

// Fungsi utility untuk localStorage yang lebih robust
const localStorageUtil = {
  getItem: (key, defaultValue = null) => {
    try {
      // Pastikan window dan localStorage tersedia
      if (typeof window !== 'undefined' && window.localStorage) {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
      }
      return defaultValue;
    } catch (error) {
      console.warn(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        // Konversi value ke string
        localStorage.setItem(key, String(value));
      }
    } catch (error) {
      console.warn(`Error setting ${key} to localStorage:`, error);
    }
  },

  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing ${key} from localStorage:`, error);
    }
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorageUtil.getItem('token'),
    role: localStorageUtil.getItem('role'),
    id: localStorageUtil.getItem('id'),
    nama: localStorageUtil.getItem('nama', ''),
    isLoggedIn: !!localStorageUtil.getItem('token')
    
  },
  reducers: {
    login: (state, action) => {
      // Validasi payload
      if (!action.payload || typeof action.payload !== 'object') {
        console.warn('Invalid login payload');
        return state;
      }

      const { token, role, id, nama } = action.payload;

      // Update state
      state.token = token || null;
      state.role = role || null;
      state.id = id || null;
      state.nama = nama || '';
      state.isLoggedIn = !!token;

      // Simpan ke localStorage
      localStorageUtil.setItem('token', token || '');
      localStorageUtil.setItem('role', role || '');
      localStorageUtil.setItem('id', id || '');
      localStorageUtil.setItem('nama', nama || '');
    },

    logout: (state) => {
      // Reset state
      state.token = null;
      state.role = null;
      state.id = null;
      state.nama = '';
      state.isLoggedIn = false;

      // Hapus dari localStorage
      ['token', 'role', 'id', 'nama'].forEach(key =>
        localStorageUtil.removeItem(key)
      );
    },

    updateUser: (state, action) => {
      // Validasi payload
      if (!action.payload || typeof action.payload !== 'object') {
        console.warn('Invalid update payload');
        return state;
      }

      const updates = action.payload;
      const allowedKeys = ['token', 'role', 'id', 'nama', 'isLoggedIn'];

      // Update state dengan keys yang diizinkan
      allowedKeys.forEach(key => {
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
          state[key] = updates[key];

          // Update localStorage untuk key yang sesuai
          if (key !== 'isLoggedIn') {
            localStorageUtil.setItem(key, updates[key] || '');
          }
        }
      });
    }
  }
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;