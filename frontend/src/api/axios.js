// // // import axios from "axios";

// // // // Configure base URL from environment variables
// // // axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// // // // This is crucial for sending cookies with cross-origin requests
// // // axios.defaults.withCredentials = true;

// // // // Set default headers
// // // axios.defaults.headers.common["Content-Type"] = "application/json";

// // // // Add request interceptor to include token if available
// // // axios.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem("token");
// // //     console.log("token:", token);
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => {
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // // Add response interceptor to handle errors globally
// // // axios.interceptors.response.use(
// // //   (response) => response,
// // //   (error) => {
// // //     // Handle unauthorized errors
// // //     if (error.response?.status === 401) {
// // //       // Redirect to login or refresh token
// // //       localStorage.removeItem("token");
// // //       window.location.href = "/login";
// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default axios;

// // // Helper function to get cookie by name
// // export function getCookie(name) {
// //   const value = `; ${document.cookie}`;
// //   const parts = value.split(`; ${name}=`);
// //   if (parts.length === 2) return parts.pop().split(";").shift();
// // }

// // // Helper function to set cookie
// // export function setCookie(name, value, days = 7) {
// //   const date = new Date();
// //   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
// //   const expires = `expires=${date.toUTCString()}`;
// //   document.cookie = `${name}=${value}; ${expires}; path=/; secure; sameSite=lax`;
// // }

// // // Helper function to delete cookie
// // export function deleteCookie(name) {
// //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// // }

// //

// import axios from "axios";

// // Simple pure configuration
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// axios.defaults.withCredentials = true; // Keep for other cookie-based needs (if any)
// axios.defaults.headers.common["Content-Type"] = "application/json";

// // Add Authorization header with JWT token
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Retrieve token from localStorage
//     console.log("tokenn:::", token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle responses
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // if (error.response?.status === 401) {
//     //   localStorage.removeItem("token"); // Clear token on 401
//     //   window.location.href = "/login";
//     // }
//     return Promise.reject(error);
//   }
// );

// export default axios;

//

import axios from "axios";

// Set base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add Authorization header with JWT token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    console.log("tokenn:::", token);
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
