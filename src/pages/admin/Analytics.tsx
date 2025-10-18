import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  AlertCircle
} from 'lucide-react';
import {
  getPageViews,
  getTopPages,
  getUserDemographics,
  getDeviceInfo,
  getRealTimeData,
  getTrafficSources,
  getAnalyticsSummary,
  isAnalyticsConfigured
} from '@/services/analytics';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');
  const [analyticsData, setAnalyticsData] = useState({
    summary: null,
    pageViews: [],
    topPages: [],
    demographics: [],
    devices: [],
    realTime: null,
    trafficSources: []
  });
  const [error, setError] = useState(null);

  const isConfigured = isAnalyticsConfigured();

  const fetchAnalyticsData = async () => {
    if (!isConfigured) {
      setError('Google Analytics is not configured. Please add your credentials to the .env file.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endDate = new Date();
      const startDate = new Date(Date.now() - parseInt(dateRange) * 24 * 60 * 60 * 1000);

      const [
        summaryResult,
        pageViewsResult,
        topPagesResult,
        demographicsResult,
        devicesResult,
        realTimeResult,
        trafficResult
      ] = await Promise.all([
        getAnalyticsSummary(startDate, endDate),
        getPageViews(startDate, endDate),
        getTopPages(startDate, endDate),
        getUserDemographics(startDate, endDate),
        getDeviceInfo(startDate, endDate),
        getRealTimeData(),
        getTrafficSources(startDate, endDate)
      ]);

      setAnalyticsData({
        summary: summaryResult.data,
        pageViews: pageViewsResult.data || [],
        topPages: topPagesResult.data || [],
        demographics: demographicsResult.data || [],
        devices: devicesResult.data || [],
        realTime: realTimeResult,
        trafficSources: trafficResult.data || []
      });
    } catch (err) {
      setError(`Failed to fetch analytics data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0'];

  if (!isConfigured) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Google Analytics Not Configured</h1>
            <p className="text-muted-foreground mb-6">
              To enable analytics features, please configure your Google Analytics credentials in the .env file.
            </p>
            <div className="bg-muted p-4 rounded-lg text-left">
              <h3 className="font-semibold mb-2">Setup Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Create a Google Cloud Project</li>
                <li>Enable the Google Analytics Reporting API</li>
                <li>Create a Service Account and download the JSON key</li>
                <li>Share your GA4 property with the service account email</li>
                <li>Add the credentials to your .env file</li>
              </ol>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive insights into your website performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchAnalyticsData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Cards */}
        {analyticsData.summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Total Page Views</CardTitle>
                <Eye className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">
                  {formatNumber(analyticsData.summary.pageViews)}
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Last {dateRange} days
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Active Users</CardTitle>
                <Users className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">
                  {formatNumber(analyticsData.summary.users)}
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200 mt-2">
                  <Activity className="h-3 w-3 mr-1" />
                  Unique visitors
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Sessions</CardTitle>
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  {formatNumber(analyticsData.summary.sessions)}
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 mt-2">
                  <Globe className="h-3 w-3 mr-1" />
                  Total sessions
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-orange-700">Avg. Session Duration</CardTitle>
                <Clock className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">
                  {formatDuration(analyticsData.summary.avgSessionDuration)}
                </div>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  Time on site
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Real-time Data */}
        {analyticsData.realTime && (
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Real-time Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-700 mb-2">
                {analyticsData.realTime.totalActiveUsers || 0}
              </div>
              <p className="text-sm text-muted-foreground">
                Users currently browsing your site
              </p>
            </CardContent>
          </Card>
        )}

        {/* Charts and Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pages">Top Pages</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Views Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={analyticsData.pageViews}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="pageViews" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium truncate">{page.title || page.path}</p>
                        <p className="text-sm text-muted-foreground">{page.path}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatNumber(page.pageViews)}</p>
                        <p className="text-sm text-muted-foreground">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.demographics.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="country" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.demographics.slice(0, 8).map((location, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{location.country}</p>
                          <p className="text-sm text-muted-foreground">{location.city}</p>
                        </div>
                        <Badge variant="secondary">{formatNumber(location.users)} users</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.devices.reduce((acc, device) => {
                          const existing = acc.find(item => item.name === device.deviceCategory);
                          if (existing) {
                            existing.value += device.users;
                          } else {
                            acc.push({ name: device.deviceCategory, value: device.users });
                          }
                          return acc;
                        }, [])}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analyticsData.devices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.devices.slice(0, 8).map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          {device.deviceCategory === 'mobile' && <Smartphone className="h-5 w-5" />}
                          {device.deviceCategory === 'desktop' && <Monitor className="h-5 w-5" />}
                          {device.deviceCategory === 'tablet' && <Tablet className="h-5 w-5" />}
                          <div>
                            <p className="font-medium">{device.deviceCategory}</p>
                            <p className="text-sm text-muted-foreground">
                              {device.operatingSystem} • {device.browser}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{formatNumber(device.users)} users</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analyticsData.trafficSources}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Source Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{source.source}</p>
                        <p className="text-sm text-muted-foreground">{source.medium}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatNumber(source.sessions)}</p>
                        <p className="text-sm text-muted-foreground">sessions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
