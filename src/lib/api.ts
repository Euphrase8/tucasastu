// src/lib/api.ts
import axios from "axios";
import { getToken, getRefreshToken, setToken, clearAuth } from "@/services/login";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: any) => void; reject: (r?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

API.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  err => Promise.reject(err)
);

API.interceptors.response.use(
  res => res,
  async err => {
    const orig = err.config;

    // ---- 401 → try refresh once ----
    if (err.response?.status === 401 && !orig._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(t => {
            orig.headers.Authorization = `Bearer ${t}`;
            return API(orig);
          })
          .catch(e => Promise.reject(e));
      }

      orig._retry = true;
      isRefreshing = true;

      const refresh = getRefreshToken();
      if (!refresh) {
        handleSessionExpired();
        return Promise.reject(err);
      }

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
          refresh_token: refresh,
        });

        const { access_token, refresh_token } = data;
        setToken(access_token);
        if (refresh_token) localStorage.setItem("refresh_token", refresh_token);

        API.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        processQueue(null, access_token);

        orig.headers.Authorization = `Bearer ${access_token}`;
        return API(orig);
      } catch (e) {
        processQueue(e, null);
        handleSessionExpired();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    // ---- ALL OTHER ERRORS → just re-throw (UI will handle) ----
    return Promise.reject(err);
  }
);

// ---- GLOBAL SESSION EXPIRED EVENT ----
const handleSessionExpired = () => {
  clearAuth();
  window.dispatchEvent(new Event("sessionExpired"));
};

export default API;