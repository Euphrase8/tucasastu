import axios from 'axios';
import { getToken } from './login';

const API_BASE = import.meta.env.VITE_BASE_URL;

// Helper function to make authenticated requests to our backend analytics API
const makeAnalyticsRequest = async (endpoint, params = {}) => {
  try {
    const token = getToken();
    if (!token) throw new Error('No token found. Please login.');

    const response = await axios.get(`${API_BASE}/api/analytics/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
      params
    });

    return { data: response.data, success: true };
  } catch (error) {
    console.error(`Analytics API error (${endpoint}):`, error);
    return { error: error.response?.data?.message || error.message };
  }
};

// Helper function to format date for API
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Get page views for a specific date range
export const getPageViews = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    const client = analyticsDataClient || initializeAnalyticsClient();
    if (!client) return { error: 'Analytics not configured' };

    const [response] = await client.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'activeUsers' },
      ],
      dimensions: [
        { name: 'date' },
      ],
    });

    const data = response.rows?.map(row => ({
      date: row.dimensionValues[0].value,
      pageViews: parseInt(row.metricValues[0].value),
      sessions: parseInt(row.metricValues[1].value),
      users: parseInt(row.metricValues[2].value),
    })) || [];

    return { data, success: true };
  } catch (error) {
    console.error('Error fetching page views:', error);
    return { error: error.message };
  }
};

// Get top pages
export const getTopPages = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    const client = analyticsDataClient || initializeAnalyticsClient();
    if (!client) return { error: 'Analytics not configured' };

    const [response] = await client.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
      ],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' },
      ],
      orderBys: [
        {
          metric: { metricName: 'screenPageViews' },
          desc: true,
        },
      ],
      limit: 10,
    });

    const data = response.rows?.map(row => ({
      path: row.dimensionValues[0].value,
      title: row.dimensionValues[1].value,
      pageViews: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value),
    })) || [];

    return { data, success: true };
  } catch (error) {
    console.error('Error fetching top pages:', error);
    return { error: error.message };
  }
};

// Get user demographics
export const getUserDemographics = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    const client = analyticsDataClient || initializeAnalyticsClient();
    if (!client) return { error: 'Analytics not configured' };

    const [response] = await client.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      ],
      metrics: [
        { name: 'activeUsers' },
      ],
      dimensions: [
        { name: 'country' },
        { name: 'city' },
      ],
      orderBys: [
        {
          metric: { metricName: 'activeUsers' },
          desc: true,
        },
      ],
      limit: 20,
    });

    const data = response.rows?.map(row => ({
      country: row.dimensionValues[0].value,
      city: row.dimensionValues[1].value,
      users: parseInt(row.metricValues[0].value),
    })) || [];

    return { data, success: true };
  } catch (error) {
    console.error('Error fetching user demographics:', error);
    return { error: error.message };
  }
};

// Get device information
export const getDeviceInfo = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    const client = analyticsDataClient || initializeAnalyticsClient();
    if (!client) return { error: 'Analytics not configured' };

    const [response] = await client.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
      ],
      dimensions: [
        { name: 'deviceCategory' },
        { name: 'operatingSystem' },
        { name: 'browser' },
      ],
      orderBys: [
        {
          metric: { metricName: 'activeUsers' },
          desc: true,
        },
      ],
    });

    const data = response.rows?.map(row => ({
      deviceCategory: row.dimensionValues[0].value,
      operatingSystem: row.dimensionValues[1].value,
      browser: row.dimensionValues[2].value,
      users: parseInt(row.metricValues[0].value),
      sessions: parseInt(row.metricValues[1].value),
    })) || [];

    return { data, success: true };
  } catch (error) {
    console.error('Error fetching device info:', error);
    return { error: error.message };
  }
};

// Get real-time data
export const getRealTimeData = async () => {
  try {
    const client = analyticsDataClient || initializeAnalyticsClient();
    if (!client) return { error: 'Analytics not configured' };

    const [response] = await client.runRealtimeReport({
      property: `properties/${GA_PROPERTY_ID}`,
      metrics: [
        { name: 'activeUsers' },
      ],
      dimensions: [
        { name: 'country' },
        { name: 'deviceCategory' },
      ],
    });

    const data = response.rows?.map(row => ({
      country: row.dimensionValues[0].value,
      deviceCategory: row.dimensionValues[1].value,
      activeUsers: parseInt(row.metricValues[0].value),
    })) || [];

    const totalActiveUsers = data.reduce((sum, item) => sum + item.activeUsers, 0);

    return { 
      data, 
      totalActiveUsers,
      success: true 
    };
  } catch (error) {
    console.error('Error fetching real-time data:', error);
    return { error: error.message };
  }
};

// Get traffic sources
export const getTrafficSources = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    const client = analyticsDataClient || initializeAnalyticsClient();
    if (!client) return { error: 'Analytics not configured' };

    const [response] = await client.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      ],
      metrics: [
        { name: 'sessions' },
        { name: 'activeUsers' },
      ],
      dimensions: [
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
      ],
      orderBys: [
        {
          metric: { metricName: 'sessions' },
          desc: true,
        },
      ],
      limit: 10,
    });

    const data = response.rows?.map(row => ({
      source: row.dimensionValues[0].value,
      medium: row.dimensionValues[1].value,
      sessions: parseInt(row.metricValues[0].value),
      users: parseInt(row.metricValues[1].value),
    })) || [];

    return { data, success: true };
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return { error: error.message };
  }
};

// Get summary statistics
export const getAnalyticsSummary = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    const client = analyticsDataClient || initializeAnalyticsClient();
    if (!client) return { error: 'Analytics not configured' };

    const [response] = await client.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'activeUsers' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    });

    if (response.rows && response.rows.length > 0) {
      const row = response.rows[0];
      return {
        data: {
          pageViews: parseInt(row.metricValues[0].value),
          sessions: parseInt(row.metricValues[1].value),
          users: parseInt(row.metricValues[2].value),
          avgSessionDuration: parseFloat(row.metricValues[3].value),
          bounceRate: parseFloat(row.metricValues[4].value),
        },
        success: true
      };
    }

    return { data: null, success: false };
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return { error: error.message };
  }
};

// Check if analytics is configured
export const isAnalyticsConfigured = () => {
  return !!(GA_PROPERTY_ID && GA_CLIENT_EMAIL && GA_PRIVATE_KEY && GA_PROJECT_ID);
};
