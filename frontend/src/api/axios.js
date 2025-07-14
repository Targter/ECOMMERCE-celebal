import axios from "axios";

// Configure base URL from environment variables
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// This is crucial for sending cookies with cross-origin requests
axios.defaults.withCredentials = true;

// Set default headers
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add request interceptor to include token if available
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
