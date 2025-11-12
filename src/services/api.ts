// src/lib/api.ts
import axios from "axios";
import { getToken, getRefreshToken, setToken, clearAuth } from "@/services/login";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

// Queue for requests waiting on token refresh
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

// --- REQUEST INTERCEPTOR: Add Token ---
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR: Handle 401, Refresh Token, Session Expiry ---
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        // No refresh token → force logout
        handleSessionExpired();
        return Promise.reject(error);
      }

      try {
        // Call refresh endpoint
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          { refresh_token: refreshToken }
        );

        const { access_token, refresh_token } = refreshResponse.data;

        // Update tokens
        setToken(access_token);
        if (refresh_token) localStorage.setItem("refresh_token", refresh_token);

        // Update default header
        API.defaults.headers.common.Authorization = `Bearer ${access_token}`;

        // Resolve queued requests
        processQueue(null, access_token);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return API(originalRequest);
      } catch (refreshError: any) {
        // Refresh failed → session truly expired
        processQueue(refreshError, null);
        handleSessionExpired();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// --- Helper: Trigger Session Expired Modal ---
const handleSessionExpired = () => {
  clearAuth(); // Clear all tokens
  window.dispatchEvent(new Event("sessionExpired"));
};

export default API;