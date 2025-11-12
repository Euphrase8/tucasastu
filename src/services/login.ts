// src/services/login.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;

// --- Token Helpers ---
export const getToken = (): string | null => localStorage.getItem("token");
export const getRefreshToken = (): string | null => localStorage.getItem("refresh_token");

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const clearAuth = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

// --- Login Function ---
export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE}/api/user/login`, {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error: any) {
    console.error("login error: ", error.response?.data || error.message);
    throw error;
  }
};