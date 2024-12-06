import axios from 'axios';

// Base URL
axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Tambahkan token jika tersedia
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
await axios.post('http://localhost:3001/api/v1/kucing', formDataToSend, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

export default axios;
