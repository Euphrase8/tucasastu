import axios from 'axios';
import { getToken } from './login';

const API_BASE = 'https://api.tucasastu.com/api';

// GET /api/annual-calendars
export const getAnnualCalendars = async (token) => {
  try {
    const res = await axios.get(`${API_BASE}/annual-calendars`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = Array.isArray(res.data) ? res.data : [];
    return data.map(item => ({
      ...item,
      date: item.date && !isNaN(new Date(item.date).getTime()) ? item.date : null,
    }));
  } catch (error) {
    console.error('getAnnualCalendars Error:', error.response || error);
    throw new Error(error.response?.data?.error || 'Failed to fetch annual calendars');
  }
};

// POST /api/annual-calendars/create
export const createAnnualCalendar = async (formData, token) => {
  if (!token) throw new Error('No token found. Please login.');
  if (!formData || !formData.date || !formData.event || !formData.participants) {
    throw new Error('Missing required fields: date, event, and participants are required.');
  }
  const date = new Date(formData.date);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format. Please provide a valid ISO date string.');
  }
  try {
    const res = await axios.post(`${API_BASE}/annual-calendars/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('createAnnualCalendar Error:', error.response || error);
    throw new Error(error.response?.data?.error || 'Failed to create annual calendar');
  }
};

// PUT /api/annual-calendars/:id/update
export const updateAnnualCalendar = async (id, formData, token) => {
  if (!token) throw new Error('No token found. Please login.');
  if (!id || isNaN(parseInt(id))) throw new Error('Invalid ID provided.');
  if (!formData || !formData.date || !formData.event || !formData.participants) {
    throw new Error('Missing required fields: date, event, and participants are required.');
  }
  const date = new Date(formData.date);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format. Please provide a valid ISO date string.');
  }
  try {
    const res = await axios.put(`${API_BASE}/annual-calendars/${id}/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    console.error('updateAnnualCalendar Error:', error.response || error);
    throw new Error(error.response?.data?.error || 'Failed to update annual calendar');
  }
};

// DELETE /api/annual-calendars/:id/delete
export const deleteAnnualCalendar = async (id, token) => {
  if (!token) throw new Error('No token found. Please login.');
  if (!id || isNaN(parseInt(id))) {
    console.error('Invalid ID in deleteAnnualCalendar:', id);
    throw new Error('Invalid ID provided.');
  }
  try {
    console.log(`Deleting event with ID: ${id}`);
    const res = await axios.delete(`${API_BASE}/annual-calendars/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('deleteAnnualCalendar Error:', error.response || error);
    throw new Error(error.response?.data?.error || 'Failed to delete annual calendar');
  }
};

export const countEvent = async () => {
  const token  = getToken();
  if (!token) throw new Error('No token found. Please login.');
  try {
    const res = await axios.get(`${API_BASE}/annual-calendars/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      throw new Error('Failed to fetch event count');
    }
    return res.data;  
  }
    catch (error) {
      if(error.res && error.res.data) {
        throw new Error(error.res.data.error || 'Failed to fetch event count');
      }
      else {
        throw new Error('An unexpected error occurred');
      }     
    }
  };