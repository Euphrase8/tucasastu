import axios from 'axios';
import { getToken } from './index'; // Update this path if needed

const API_BASE = import.meta.env.VITE_BASE_URL;

/**
 * Fetch settings from the API
 * @returns {Promise<Object>} Settings data including missionText, subtitleText, and heroBackgroundImage
 * @throws {Error} If the request fails or no data is received
 */
export const fetchSettings = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token found. Please login.');

    const response = await axios.get(`${API_BASE}/api/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data) throw new Error('No settings data received');

    const { missionText, subtitleText, heroBackgroundImage } = response.data;
    return {
      missionText: missionText || 'Living the Mission, Reaching the Nations',
      subtitleText: subtitleText || 'TUCASA STU – The Adventist Mission to Campuses',
      heroBackgroundImage: heroBackgroundImage ? `http://192.168.1.164:8080/${heroBackgroundImage}` : '',
    };
  } catch (error) {
    throw new Error(`Failed to fetch settings: ${error.message}`);
  }
};

/**
 * Update settings on the API
 * @param {Object} settings - Settings object with missionText, subtitleText, and heroBackgroundImage (File or string)
 * @returns {Promise<Object>} Response data including updated settings
 * @throws {Error} If the update fails or authentication is missing
 */
export const updateSettings = async (settings) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token found. Please login.');

    const formData = new FormData();
    formData.append('missionText', settings.missionText || '');
    formData.append('subtitleText', settings.subtitleText || '');
    if (settings.heroBackgroundImage instanceof File) {
      formData.append('heroBackgroundImage', settings.heroBackgroundImage);
    } else if (settings.heroBackgroundImage) {
      formData.append('heroBackgroundImage', settings.heroBackgroundImage);
    }

    const response = await axios.put(`${API_BASE}/api/settings/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data) throw new Error('No response data received');

    const { message, settings: updatedSettings } = response.data;
    return {
      message,
      settings: {
        missionText: updatedSettings.missionText,
        subtitleText: updatedSettings.subtitleText,
        heroBackgroundImage: updatedSettings.heroBackgroundImage
          ? `http://192.168.1.164:8080/${updatedSettings.heroBackgroundImage}`
          : '',
      },
    };
  } catch (error) {
    throw new Error(`Failed to update settings: ${error.message}`);
  }
};