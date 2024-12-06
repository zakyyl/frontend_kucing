// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// import reducer from './reducers';



export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const setEditSuccess = (success) => {
  return {
    type: 'SET_EDIT_SUCCESS',
    payload: success,
  };
};