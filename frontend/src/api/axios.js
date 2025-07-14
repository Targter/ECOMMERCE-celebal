import axios from "axios";

// Set base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add Authorization header with JWT token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    // console.log("tokenn:::", token);
    // If token exists, set it in the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Enable withCredentials only if using cookies (optional)
    config.withCredentials =
      import.meta.env.VITE_ENV === "production" ? false : true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token"); // Clear token on 401
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export default axios;
