// src/services/analytics.js
// Frontend-only GA4 service using Measurement Protocol
// Note: Reading GA4 data directly requires a backend. This service simulates analytics for Vite/React.

const GA_MEASUREMENT_ID = "G-JDRYLQ1Y13";

// Helper: format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

// Track pageview using gtag
export const trackPageView = (path) => {
  if (!window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
};

// Generate mock analytics data
const generateMockData = (startDate, endDate, type) => {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const data = [];

  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const base = type === "pageviews" ? 1000 : type === "users" ? 500 : 300;
    const variation = Math.random() * 0.4 + 0.8; // 80%-120%

    data.push({
      date: formatDate(date),
      [type]: Math.floor(base * variation),
      pageViews: Math.floor((base + 200) * variation),
      sessions: Math.floor((base - 100) * variation),
      users: Math.floor((base - 200) * variation),
    });
  }

  return data;
};

// Mock data: top pages
const mockPages = [
  { page: "/", title: "Home", views: 5420, uniqueViews: 4230 },
  { page: "/about", title: "About Us", views: 2340, uniqueViews: 1890 },
  { page: "/events", title: "Events", views: 1890, uniqueViews: 1560 },
  { page: "/gallery", title: "Gallery", views: 1560, uniqueViews: 1230 },
  { page: "/contact", title: "Contact", views: 980, uniqueViews: 780 },
];

// Mock data: traffic sources
const mockTrafficSources = [
  { source: "google", medium: "organic", users: 2340, sessions: 3450 },
  { source: "direct", medium: "(none)", users: 1890, sessions: 2780 },
  { source: "facebook", medium: "social", users: 890, sessions: 1340 },
  { source: "twitter", medium: "social", users: 560, sessions: 890 },
  { source: "linkedin", medium: "social", users: 340, sessions: 560 },
];

// Mock data: devices
const mockDevices = [
  { category: "desktop", users: 3240, sessions: 4890 },
  { category: "mobile", users: 2890, sessions: 4230 },
  { category: "tablet", users: 670, sessions: 980 },
];

// Mock data: countries for demographics
const mockCountries = [
  { country: "United States", users: 1250, sessions: 1890 },
  { country: "Canada", users: 890, sessions: 1340 },
  { country: "United Kingdom", users: 670, sessions: 980 },
  { country: "Germany", users: 540, sessions: 780 },
  { country: "France", users: 430, sessions: 650 },
];

// Fetch pageviews (mock)
export const getPageViews = async (startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), endDate = new Date()) => {
  await new Promise((r) => setTimeout(r, 300));
  return { data: generateMockData(startDate, endDate, "pageviews"), success: true };
};

// Fetch top pages (mock)
export const getTopPages = async () => {
  await new Promise((r) => setTimeout(r, 200));
  return { data: mockPages, success: true };
};

// Fetch traffic sources (mock)
export const getTrafficSources = async () => {
  await new Promise((r) => setTimeout(r, 200));
  return { data: mockTrafficSources, success: true };
};

// Fetch device information (mock)
export const getDeviceInfo = async () => {
  await new Promise((r) => setTimeout(r, 200));
  return { data: mockDevices, success: true };
};

// Fetch user demographics (mock)
export const getUserDemographics = async () => {
  await new Promise((r) => setTimeout(r, 200));
  return { data: mockCountries, success: true };
};

// Fetch real-time users (mock)
export const getRealTimeData = async () => {
  await new Promise((r) => setTimeout(r, 100));
  return { totalActiveUsers: Math.floor(Math.random() * 50) + 10, success: true };
};

// Fetch analytics summary (mock)
export const getAnalyticsSummary = async () => {
  await new Promise((r) => setTimeout(r, 300));

  const basePV = 15420;
  const baseSessions = 8930;
  const baseUsers = 6780;

  return {
    data: {
      pageViews: Math.floor(basePV * (Math.random() * 0.3 + 0.85)),
      sessions: Math.floor(baseSessions * (Math.random() * 0.3 + 0.85)),
      users: Math.floor(baseUsers * (Math.random() * 0.3 + 0.85)),
      avgSessionDuration: Math.floor(Math.random() * 180 + 120), // 2-5 minutes
      bounceRate: Math.random() * 0.3 + 0.4, // 40-70%
    },
    success: true,
  };
};

// Check if analytics is configured (always true for mock)
export const isAnalyticsConfigured = () => true;
