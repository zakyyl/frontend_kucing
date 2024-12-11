// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import pengajuanReducer from "./pengajuanSlice";
// import reducer from './reducers';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    pengajuan: pengajuanReducer,
  },
});

export const setEditSuccess = (success) => {
  return {
    type: 'SET_EDIT_SUCCESS',
    payload: success,
  };
};