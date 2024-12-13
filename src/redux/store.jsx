import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authSlice';
import pengajuanReducer from './pengajuanSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'pengajuan'] // reducer yang ingin di-persist
};

const persistedReducer = persistReducer(persistConfig, 
  combineReducers({
    auth: authReducer,
    pengajuan: pengajuanReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ]
      }
    })
});
export const setEditSuccess = (success) => {
  return {
    type: 'SET_EDIT_SUCCESS',
    payload: success,
  };
};
export const persistor = persistStore(store);