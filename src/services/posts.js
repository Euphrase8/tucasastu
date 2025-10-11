import axios from "axios";
import { getToken } from "./login";

const API_BASE = "https://api.tucasastu.com/api/posts";

// Fetch all announcements
export const fetchAnnouncements = async () => {
  const res = await axios.get(`${API_BASE}`);
  // Ensure each post has a valid date
  return res.data.map(post => ({
    ...post,
    date: post.date || post.createdAt || new Date().toISOString()
  }));
};

// Fetch a single announcement by ID
export const fetchAnnouncementById = async (ID) => {
  if (!ID) throw new Error("ID is required");
  const res = await axios.get(`${API_BASE}/${ID}`);
  return res.data;
};

// Create a new announcement
export const createAnnouncement = async (formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  const res = await axios.post(`${API_BASE}/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Update an announcement
export const updateAnnouncement = async (ID, formData) => {
  if (!ID) throw new Error("ID is required");
  const token = getToken();
  const res = await axios.put(`${API_BASE}/${ID}/update`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete an announcement
export const deleteAnnouncement = async (ID) => {
  if (!ID) throw new Error("ID is required");
  const token = getToken();
  const res = await axios.delete(`${API_BASE}/${ID}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
