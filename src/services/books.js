import axios from 'axios';
import { getToken } from './login'; // Update this path if needed

const API_BASE = 'https://api.tucasastu.com/api';

/**
 * Upload a new Book of the Year
 * @param {FormData} formData - Form data containing title, image, description, reading_plan
 */
export const uploadBooks = async (formData) => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');

  const response = await axios.post(`${API_BASE}/annual-books/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Fetch all books
 */
export const getAllBooks = async () => {
  const response = await axios.get(`${API_BASE}/annual-books`, {
    
  });
  return response.data;
};

/**
 * Update a specific book
 * @param {string} id - Book ID
 * @param {FormData} formData - Updated data (title, image, reading_plan, etc.)
 */
export const updateBooks = async (id, formData) => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');

  const response = await axios.put(`${API_BASE}/annual-books/${id}/update`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Delete a specific book
 * @param {string} id - Book ID
 */
export const deleteBooks = async (id) => {
  const token = getToken();
  if (!token) throw new Error('No token found. Please login.');

  const response = await axios.delete(`${API_BASE}/annual-books/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
