import axios from "axios";
import { getToken } from '../service/index';

// Ensure no trailing slash to avoid double slashes in URLs
const API_BASE_URL = "https://api.tucasastu.com";

// Create an Axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data", // Default for file uploads
  },
});

// Add a request interceptor to include the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found. Request will be sent without Authorization header.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 📤 Create Summit
export const createSummit = async ({ Title, OutfitImage, Timetable, Posters = [] }) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. Please login.");
  }

  // Validate inputs
  if (!Title || typeof Title !== 'string') {
    throw new Error("Title is required and must be a string.");
  }
  if (!OutfitImage || !(OutfitImage instanceof File)) {
    throw new Error("Outfit image is required and must be a valid file.");
  }
  if (!Timetable || !(Timetable instanceof File)) {
    throw new Error("Timetable is required and must be a valid file.");
  }
  if (!Array.isArray(Posters)) {
    throw new Error("Posters must be an array.");
  }
  if (Posters.some(poster => !(poster instanceof File))) {
    throw new Error("All posters must be valid files.");
  }

  try {
    const formData = new FormData();
    formData.append("title", Title);
    formData.append("outfit_image", OutfitImage);
    formData.append("timetable", Timetable);

    // Append multiple poster files
    Posters.forEach((poster) => {
      formData.append("posters", poster);
    });    

    const response = await apiClient.post("/api/summits/create", formData);
    console.log("Create Summit Response:", response.data);
    return response.data;
  } catch (error) {
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    };
    console.error("Create Summit Error:", errorDetails);
    throw error.response?.data?.message 
      ? new Error(error.response.data.message) 
      : new Error("Failed to create summit. Please check your network and try again.");
  }
};

export const getAllSummits = async () => {
  
  try {
    const response = await apiClient.get("/api/summits");
    return response.data;
  } catch (error) {
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    console.error("Get All Summits Error:", errorDetails);
    throw error.response?.data?.message 
      ? new Error(error.response.data.message) 
      : new Error("Failed to retrieve summits. Please check your network and try again.");
  }
};

export const getSummitById = async (ID) => {

  try {
    const response = await apiClient.get(`/api/summits/${ID}`);
    console.log("Get Summit By ID Response:", response.data);
    return response.data;
  } catch (error) {
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    console.error("Get Summit By ID Error:", errorDetails);
    throw error.response?.data?.message 
      ? new Error(error.response.data.message) 
      : new Error("Failed to retrieve summit. Please check your network and try again.");
  }
};

// 📤 Update Summit
export const updateSummit = async ({ ID, Title, OutfitImage, Timetable, Posters = [] }) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. Please login.");
  }

  try {
    const formData = new FormData();
    if (Title) formData.append("title", Title);
    if (OutfitImage) formData.append("outfit_image", OutfitImage);
    if (Timetable) formData.append("timetable", Timetable);

    // Append multiple poster files
    Posters.forEach((poster, index) => {
      formData.append(`posters[${index}]`, poster);
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await apiClient.put(`/api/summits/${ID}/update`, formData);
    console.log("Update Summit Response:", response.data);
    return response.data;
  } catch (error) {
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    console.error("Update Summit Error:", errorDetails);
    throw error.response?.data?.message 
      ? new Error(error.response.data.message) 
      : new Error("Failed to update summit. Please check your network and try again.");
  }
};

export const deleteSummit = async (ID) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. Please login.");
  }

  try {
    const response = await apiClient.delete(`/api/summits/${ID}/delete`);
    console.log("Delete Summit Response:", response.data);
    return response.data;
  } catch (error) {
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
    console.error("Delete Summit Error:", errorDetails);
    throw error.response?.data?.message 
      ? new Error(error.response.data.message) 
      : new Error("Failed to delete summit. Please check your network and try again.");
  }
};