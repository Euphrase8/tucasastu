// src/services/media.js
import API from "@/lib/api";
import { getToken } from "@/services/login";

const API_BASE = import.meta.env.VITE_BASE_URL;

// Helper: add auth header only if token exists
const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create media
export const createMedia = async (formData) => {
  return (await API.post(`${API_BASE}/api/media/create`, formData, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  })).data;
};

// Get all media
export const getAllMedia = async () => {
  return (await API.get(`${API_BASE}/api/media`)).data;
};

// Get media by ID
export const getMediaById = async (id) => {
  return (await API.get(`${API_BASE}/api/media/${id}`, { headers: authHeaders() })).data;
};

// Update media
export const updateMedia = async (id, formData) => {
  return (await API.put(`${API_BASE}/api/media/${id}`, formData, {
    headers: {
      ...authHeaders(),
      "Content-Type": "multipart/form-data",
    },
  })).data;
};

// Delete media – FIXED: removed `/delete`
export const deleteMedia = async (id) => {
  return (await API.delete(`${API_BASE}/api/media/${id}`, { headers: authHeaders() })).data;
};

// Count media
export const countMedia = async () => {
  return (await API.get(`${API_BASE}/api/media/count`)).data;
};

// Count events
export const countEvent = async () => {
  return (await API.get(`${API_BASE}/api/annual-calendars/count`, { headers: authHeaders() })).data;
};