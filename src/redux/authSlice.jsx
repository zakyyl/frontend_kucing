import { createSlice } from '@reduxjs/toolkit';


const localStorageUtil = {
  getItem: (key, defaultValue = null) => {
    try {
      
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
      if (!action.payload || typeof action.payload !== 'object') {
        console.warn('Invalid login payload');
        return state;
      }

      const { token, role, id, nama } = action.payload;

      state.token = token || null;
      state.role = role || null;
      state.id = id || null;
      state.nama = nama || '';
      state.isLoggedIn = !!token;

      
      localStorageUtil.setItem('token', token || '');
      localStorageUtil.setItem('role', role || '');
      localStorageUtil.setItem('id', id || '');
      localStorageUtil.setItem('nama', nama || '');
    },

    logout: (state) => {
      
      state.token = null;
      state.role = null;
      state.id = null;
      state.nama = '';
      state.isLoggedIn = false;

      
      ['token', 'role', 'id', 'nama'].forEach(key =>
        localStorageUtil.removeItem(key)
      );
    },

    updateUser: (state, action) => {
      if (!action.payload || typeof action.payload !== 'object') {
        console.warn('Invalid update payload');
        return state;
      }

      const updates = action.payload;
      const allowedKeys = ['token', 'role', 'id', 'nama', 'isLoggedIn'];
      allowedKeys.forEach(key => {
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
          state[key] = updates[key];
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