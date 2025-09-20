import axios from "axios";

const instance = axios.create({
  // Use the environment variable for the api base URL
  // This allows for easy configuration in different environments
  baseURL: import.meta.env.VITE_API_V1_URL || "http://localhost:5000/api",
});

// Attach JWT token from localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;