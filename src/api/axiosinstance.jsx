import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const PENGGUNA_URL = process.env.REACT_APP_PENGGUNA_URL;
export const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;
export const KUCING_URL = process.env.REACT_APP_KUCING_URL;
export const ADOPSI_URL = process.env.REACT_APP_ADOPSI_URL;
export const PENGAJUAN_URL = process.env.REACT_APP_PENGAJUAN_URL;

export default axiosInstance;