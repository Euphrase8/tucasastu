import axios from "axios";
import { getToken } from "./login";

const API_BASE = import.meta.env.VITE_BASE_URL;

// Helper for unified error handling
const handleAxiosError = (error, message) => {
  if (error.response?.data) {
    throw new Error(error.response.data.error || error.response.data.message || message);
  }
  throw new Error(message);
};

// ✅ Create a new leader (with image upload)
export const addLeader = async (formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const response = await axios.post(`${API_BASE}/api/chaplaincy-leaders/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Let axios automatically set multipart boundary
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Failed to add leader");
  }
};

// ✅ Fetch all leaders
export const getLeaders = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  try {
    const response = await axios.get(`${API_BASE}/api/chaplaincy-leaders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Failed to fetch leaders");
  }
};

// ✅ Update leader
export const updateLeader = async (ID, formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const response = await axios.put(`${API_BASE}/api/chaplaincy-leaders/${ID}/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Failed to update leader");
  }
};

// ✅ Delete leader
export const deleteLeader = async (ID) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const response = await axios.delete(`${API_BASE}/api/chaplaincy-leaders/${ID}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Failed to delete leader");
  }
};

// ✅ Count leaders
export const countLeader = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const response = await axios.get(`${API_BASE}/api/chaplaincy-leaders/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, "Failed to fetch leader count");
  }
};
