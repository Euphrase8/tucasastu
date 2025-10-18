import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar as CalendarIcon,
  Image,
  BookOpen,
  Bell,
  Award,
  TrendingUp,
  BarChart3,
  Eye,
  Activity,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAnalyticsSummary, getRealTimeData, isAnalyticsConfigured } from "@/services/analytics";

const AdminDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [realTimeData, setRealTimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isConfigured = isAnalyticsConfigured();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!isConfigured) {
        setLoading(false);
        return;
      }

      try {
        const endDate = new Date();
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const [summaryResult, realTimeResult] = await Promise.all([
          getAnalyticsSummary(startDate, endDate),
          getRealTimeData()
        ]);

        if (summaryResult.success) {
          setAnalyticsData(summaryResult.data);
        }
        if (realTimeResult.success) {
          setRealTimeData(realTimeResult);
        }
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [isConfigured]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const stats = [
    { title: "Total Members", value: "2,847", icon: Users, change: "+12%" },
    { title: "Active Events", value: "23", icon: CalendarIcon, change: "+5%" },
    { title: "Gallery Images", value: "1,234", icon: Image, change: "+18%" },
    { title: "Announcements", value: "45", icon: Bell, change: "+8%" }
  ];

  const quickActions = [
    { title: "Analytics Dashboard", href: "/admin/analytics", icon: BarChart3 },
    { title: "Manage Leaders", href: "/admin/leaders", icon: Award },
    { title: "Events & Calendar", href: "/admin/events", icon: CalendarIcon },
    { title: "Gallery", href: "/admin/gallery", icon: Image },
    { title: "Announcements", href: "/admin/announcements", icon: Bell },
    { title: "Book of Year", href: "/admin/book", icon: BookOpen }
  ];

  const recentActivity = [
    { action: "New member registered", time: "2 minutes ago" },
    { action: "Event 'Prayer Week' updated", time: "1 hour ago" },
    { action: "Gallery updated with 12 new photos", time: "3 hours ago" },
    { action: "Announcement published", time: "5 hours ago" }
  ];

  return (
    <AdminLayout>
      <div className="p-8 space-y-10">
        {/* Dashboard Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">Monitor and manage TUCASA STU platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.title} 
                className="bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs mt-1">
                    <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                    <span className="ml-2 text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analytics Summary Cards */}
        {isConfigured && analyticsData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Page Views (30d)</CardTitle>
                <Eye className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">
                  {formatNumber(analyticsData.pageViews)}
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Website traffic
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Active Users (30d)</CardTitle>
                <Users className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">
                  {formatNumber(analyticsData.users)}
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200 mt-2">
                  <Activity className="h-3 w-3 mr-1" />
                  Unique visitors
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Sessions (30d)</CardTitle>
                <Globe className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  {formatNumber(analyticsData.sessions)}
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 mt-2">
                  <Globe className="h-3 w-3 mr-1" />
                  Total sessions
                </Badge>
              </CardContent>
            </Card>

            {realTimeData && (
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700">Live Users</CardTitle>
                  <Activity className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">
                    {realTimeData.totalActiveUsers || 0}
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 mt-2">
                    <Activity className="h-3 w-3 mr-1" />
                    Right now
                  </Badge>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Analytics Not Configured Message */}
        {!isConfigured && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <BarChart3 className="h-5 w-5" />
                Google Analytics Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700 mb-4">
                Configure Google Analytics to see detailed website insights and visitor statistics.
              </p>
              <Link to="/admin/analytics">
                <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                  Setup Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.title} to={action.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-start p-4 hover:bg-accent hover:border-primary transition-colors duration-200"
                    >
                      <Icon className="h-5 w-5 mr-3 text-primary" />
                      <span>{action.title}</span>
                    </Button>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Leadership Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add, edit, and organize leadership structure and member roles.
              </p>
              <Link to="/admin/leaders">
                <Button variant="outline" className="w-full">Manage Leaders</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Book of the Year
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Update the featured book, description, and downloadable PDF.
              </p>
              <Link to="/admin/book">
                <Button variant="outline" className="w-full">Manage Book</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                Events & Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create and manage events, schedules, and calendar entries.
              </p>
              <Link to="/admin/events">
                <Button variant="outline" className="w-full">Manage Events</Button> 
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
