import axios from "axios";
import { getToken } from "./login";

const API_BASE = import.meta.env.VITE_BASE_URL;

// GET /api/annual-calendars
export const getAnnualCalendars = async () => {
  const token = getToken();
  // if (token) throw new Error("No token found. Please login.");
  try {
    const res = await axios.get(`${API_BASE}/api/annual-calendars`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = Array.isArray(res.data) ? res.data : [];
    return data.map((item) => ({
      ...item,
      date: item.date || item.Date || item.EventDate || null,
    }));
  } catch (error) {
    console.error("getAnnualCalendars Error:", error.response || error);
    throw new Error(error.response?.data?.error || "Failed to fetch annual calendars");
  }
};

// POST /api/annual-calendars/create
export const createAnnualCalendar = async (formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  const body = {
    title: formData.event,
    EventDate: formData.date,
    location: formData.location || "",
    description: formData.description || "",
    participants: formData.participants,
  };

  try {
    const res = await axios.post(`${API_BASE}/api/annual-calendars/create`, body, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("createAnnualCalendar Error:", error.response || error);
    throw new Error(error.response?.data?.error || "Failed to create annual calendar");
  }
};

// PUT /api/annual-calendars/:id/update
export const updateAnnualCalendar = async (id, formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  if (!id) throw new Error("Invalid ID provided.");

  const body = {
    title: formData.event,
    EventDate: formData.date,
    location: formData.location || "",
    description: formData.description || "",
    participants: formData.participants,
  };

  try {
    const res = await axios.put(`${API_BASE}/api/annual-calendars/${id}/update`, body, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("updateAnnualCalendar Error:", error.response || error);
    throw new Error(error.response?.data?.error || "Failed to update annual calendar");
  }
};

// DELETE /api/annual-calendars/:id/delete
export const deleteAnnualCalendar = async (id) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  if (!id) throw new Error("Invalid ID provided.");

  try {
    const res = await axios.delete(`${API_BASE}/api/annual-calendars/${id}/delete`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("deleteAnnualCalendar Error:", error.response || error);
    throw new Error(error.response?.data?.error || "Failed to delete annual calendar");
  }
};

// GET /api/annual-calendars/count
export const countEvent = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  try {
    const res = await axios.get(`${API_BASE}/api/annual-calendars/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("countEvent Error:", error.response || error);
    throw new Error(error.response?.data?.error || "Failed to fetch event count");
  }
};
