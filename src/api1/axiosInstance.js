// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.20.100.24:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});




// // Optional: Add request/response interceptors if needed (for authentication, etc.)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Example: Add a token from localStorage if available
//     const token = 'your-auth-token'; // Get this from AsyncStorage in React Native
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Optional: Add response interceptor to handle responses globally
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log('Unauthorized - Redirect to login');
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
