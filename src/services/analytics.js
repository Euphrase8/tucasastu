// Mock analytics service for frontend
// In a real implementation, these would call your backend API endpoints

// Helper function to format date for API
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Mock data generator for demonstration
const generateMockData = (startDate, endDate, type = 'pageviews') => {
  const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const data = [];

  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const baseValue = type === 'pageviews' ? 1000 : type === 'users' ? 500 : 300;
    const randomVariation = Math.random() * 0.4 + 0.8; // 80% to 120% of base

    data.push({
      date: formatDate(date),
      [type]: Math.floor(baseValue * randomVariation),
      pageViews: Math.floor((baseValue + 200) * randomVariation),
      sessions: Math.floor((baseValue - 100) * randomVariation),
      users: Math.floor((baseValue - 200) * randomVariation),
    });
  }

  return data;
};

const mockCountries = [
  { country: 'United States', users: 1250, sessions: 1890 },
  { country: 'Canada', users: 890, sessions: 1340 },
  { country: 'United Kingdom', users: 670, sessions: 980 },
  { country: 'Germany', users: 540, sessions: 780 },
  { country: 'France', users: 430, sessions: 650 },
];

const mockPages = [
  { page: '/', title: 'Home', views: 5420, uniqueViews: 4230 },
  { page: '/about', title: 'About Us', views: 2340, uniqueViews: 1890 },
  { page: '/events', title: 'Events', views: 1890, uniqueViews: 1560 },
  { page: '/gallery', title: 'Gallery', views: 1560, uniqueViews: 1230 },
  { page: '/contact', title: 'Contact', views: 980, uniqueViews: 780 },
];

const mockTrafficSources = [
  { source: 'google', medium: 'organic', users: 2340, sessions: 3450 },
  { source: 'direct', medium: '(none)', users: 1890, sessions: 2780 },
  { source: 'facebook', medium: 'social', users: 890, sessions: 1340 },
  { source: 'twitter', medium: 'social', users: 560, sessions: 890 },
  { source: 'linkedin', medium: 'social', users: 340, sessions: 560 },
];

const mockDevices = [
  { category: 'desktop', users: 3240, sessions: 4890 },
  { category: 'mobile', users: 2890, sessions: 4230 },
  { category: 'tablet', users: 670, sessions: 980 },
];

// Check if analytics is configured
export const isAnalyticsConfigured = () => {
  // For demo purposes, always return true
  // In production, this would check if Google Analytics credentials are configured
  return true;
};

// Get page views for a specific date range
export const getPageViews = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const data = generateMockData(startDate, endDate, 'pageviews');
    return { data, success: true };
  } catch (error) {
    console.error('Error fetching page views:', error);
    return { error: error.message };
  }
};

// Get top pages
export const getTopPages = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: mockPages, success: true };
  } catch (error) {
    console.error('Error fetching top pages:', error);
    return { error: error.message };
  }
};

// Get user demographics
export const getUserDemographics = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    return { data: mockCountries, success: true };
  } catch (error) {
    console.error('Error fetching user demographics:', error);
    return { error: error.message };
  }
};

// Get device information
export const getDeviceInfo = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 350));
    return { data: mockDevices, success: true };
  } catch (error) {
    console.error('Error fetching device info:', error);
    return { error: error.message };
  }
};

// Get real-time data
export const getRealTimeData = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    const totalActiveUsers = Math.floor(Math.random() * 50) + 10; // 10-60 active users
    return {
      data: [],
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
    await new Promise(resolve => setTimeout(resolve, 450));
    return { data: mockTrafficSources, success: true };
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    return { error: error.message };
  }
};

// Get summary statistics
export const getAnalyticsSummary = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));

    // Generate realistic mock summary data
    const basePageViews = 15420;
    const baseSessions = 8930;
    const baseUsers = 6780;

    return {
      data: {
        pageViews: Math.floor(basePageViews * (Math.random() * 0.3 + 0.85)),
        sessions: Math.floor(baseSessions * (Math.random() * 0.3 + 0.85)),
        users: Math.floor(baseUsers * (Math.random() * 0.3 + 0.85)),
        avgSessionDuration: Math.floor(Math.random() * 180 + 120), // 2-5 minutes
        bounceRate: Math.random() * 0.3 + 0.4, // 40-70%
      },
      success: true
    };
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return { error: error.message };
  }
};
