import axios from "axios";
import { getToken } from "@/services/login";

// Create a base axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Add request token
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor for session expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Trigger session expired
      window.dispatchEvent(new Event("sessionExpired"));
    }
    return Promise.reject(error);
  }
);

export default API;
