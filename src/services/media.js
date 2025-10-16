// src/services/media.js
import axios from "axios";
import { getToken } from "./login";

const API_BASE = import.meta.env.VITE_BASE_URL;

// Create new media
export const createMedia = async (formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  try {
    const response = await axios.post(`${API_BASE}/api/media/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    throw error;
  }
};

// Get all media
export const getAllMedia = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/media`);
    return response.data;
  } catch (error) {
    console.error("Fetch media error:", error.response?.data || error.message);
    throw error;
  }
};

// Get media by ID
export const getMediaById = async (ID) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  try {
    const response = await axios.get(`${API_BASE}/api/media/${ID}`);
    return response.data;
  } catch (error) {
    console.error("Fetch media by ID error:", error.response?.data || error.message);
    throw error;
  }
};

// Update media
export const updateMedia = async (ID, formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  try {
    const response = await axios.put(`${API_BASE}/api/media/${ID}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update media error:", error.response?.data || error.message);
    throw error;
  }
};

// Delete media
export const deleteMedia = async (ID) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  try {
    const response = await axios.delete(`${API_BASE}/api/media/${ID}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Delete media error:", error.response?.data || error.message);
    throw error;
  }
};

// Count media
export const countMedia = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/media/count`);
    return response.data; // { total_media: number }
  } catch (error) {
    console.error("Fetch media count error:", error.response?.data || error.message);
    throw new Error("Failed to fetch media count");
  }
};
