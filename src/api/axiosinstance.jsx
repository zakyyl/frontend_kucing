import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',  // Set base URL untuk semua request ke backend
});

export default axiosInstance;
