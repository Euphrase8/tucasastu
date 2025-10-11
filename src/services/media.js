import axios from 'axios';
import { getToken } from './login';

const API_BASE = 'https://api.tucasastu.com';

export const createMedia = async (formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const response = await axios.post(`${baseURL}/api/media/create`, formData, {
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

// ------------------- Get All Media -------------------
export const getAllMedia = async () => {

  try {
    const response = await axios.get(`${baseURL}/api/media`);
    return response.data;
  } catch (error) {
    console.error("Fetch media error:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Get Media by ID -------------------
export const getMediaById = async (ID) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  try {
    const response = await axios.get(`${baseURL}/api/media/${ID}`);
    return response.data;
  } catch (error) {
    console.error("Fetch media by ID error:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Update Media -------------------
export const updateMedia = async (ID, formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const response = await axios.put(`${baseURL}/api/media/${ID}`, formData, {
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

// ------------------- Delete Media -------------------
export const deleteMedia = async (ID) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const response = await axios.delete(`${baseURL}/api/media/${ID}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Delete media error:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------- Count Media -------------------
export const countMedia = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/media/count`);
    return response.data; // Expected: { total_media: 123 }
  } catch (error) {
    console.error("Fetch media count error:", error.response?.data || error.message);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Failed to fetch media count");
    } else {
      throw new Error("An unexpected error occurred while fetching media count");
    }
  }
};