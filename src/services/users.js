import axios from 'axios';
import { getToken } from './login';

const API_BASE = 'https://api.tucasastu.com';

/**
 * Get all users
 */
export const getAllUsers = async () => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');

  const response = await axios.get(`${API_BASE}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Get user by ID
 */
export const getUserById = async (id) => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');

  const response = await axios.get(`${API_BASE}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Create a new user
 */
export const createUser = async (userData) => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');

  const response = await axios.post(`${API_BASE}/api/users/create`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

/**
 * Update user by ID
 */
export const updateUser = async (id, userData) => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');

  const response = await axios.put(`${API_BASE}/api/users/${id}/update`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

/**
 * Delete user by ID
 */
export const deleteUser = async (id) => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');

  const response = await axios.delete(`${API_BASE}/api/users/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
