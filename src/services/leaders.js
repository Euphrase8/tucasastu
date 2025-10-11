import axios from 'axios';
import { getToken } from './login';

const API_BASE_URL = 'https://api.tucasastu.com/api/chaplaincy-leaders';

// Add a new leader
export const addLeader = async (formData, token) => {
  if (!token) throw new Error('No token found. Please login.');
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Failed to add leader');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// Fetch all leaders
export const getLeaders = async () => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Added token to the request
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Failed to fetch leaders');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// Update a leader
export const updateLeader = async (ID, formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");
  try {
    const response = await axios.put(`${API_BASE_URL}/${ID}/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Failed to update leader');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// Delete a leader
export const deleteLeader = async (ID) => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');
  try {
    const response = await axios.delete(`${API_BASE_URL}/${ID}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Failed to delete leader');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// Fetch chaplaincy leader counts
export const countLeader = async () => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');
  try {
    const response = await axios.get(`${API_BASE_URL}/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch leader count');
    }
    return response.data; // Expected: { total_chaplains, total_conference_leaders, total_union_leaders, total_zone_leaders }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Failed to fetch leader count');
    } else {
      throw new Error('An unexpected error occurred while fetching leader count');
    }
  }
};