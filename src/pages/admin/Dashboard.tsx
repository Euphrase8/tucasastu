import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Globe,
} from "lucide-react";

import { getAnalyticsSummary, getRealTimeData, isAnalyticsConfigured } from "@/services/analytics";
import { countMedia, countEvent } from "@/services/media.js"; 
import { getLeaders } from "@/services/leaders.js";

interface LeaderCounts {
  total_chaplains: number;
  total_conference_leaders: number;
  total_union_leaders: number;
  total_zone_leaders: number;
}

const AdminDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [leaderCounts, setLeaderCounts] = useState<LeaderCounts>({
    total_chaplains: 0,
    total_conference_leaders: 0,
    total_union_leaders: 0,
    total_zone_leaders: 0,
  });
  const [eventCount, setEventCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [announcementCount, setAnnouncementCount] = useState(0);

  const isConfigured = isAnalyticsConfigured();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        if (isConfigured) {
          const [summaryResult, realTimeResult] = await Promise.all([
            getAnalyticsSummary(startDate, endDate),
            getRealTimeData(),
          ]);

          if (summaryResult.success) setAnalyticsData(summaryResult.data);
          if (realTimeResult.success) setRealTimeData(realTimeResult);
        }

        const leaders = await getLeaders();
        const counts: LeaderCounts = {
          total_chaplains: 0,
          total_conference_leaders: 0,
          total_union_leaders: 0,
          total_zone_leaders: 0,
        };

        leaders.forEach((leader: any) => {
          const title = leader.Title?.toLowerCase() || "";
          if (title.includes("union")) counts.total_union_leaders += 1;
          else if (title.includes("conference") && !title.includes("union")) counts.total_conference_leaders += 1;
          else if (title.includes("zone") && !title.includes("union")) counts.total_zone_leaders += 1;
          else counts.total_chaplains += 1;
        });
        setLeaderCounts(counts);

        const eventData = await countEvent();
        setEventCount(eventData.total_events || 0);

        const mediaData = await countMedia();
        setMediaCount(mediaData.total_media || 0);

        setAnnouncementCount(45); // Placeholder for announcements
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isConfigured]);

  const formatNumber = (num: number | undefined) => {
    if (!num) return "0";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  const stats = [
    {
      title: "Total Leaders",
      value: formatNumber(Object.values(leaderCounts).reduce((sum, count) => sum + (count || 0), 0)),
      icon: Users,
      change: "+12%",
    },
    { title: "Active Events", value: formatNumber(eventCount), icon: CalendarIcon, change: "+5%" },
    { title: "Gallery Images", value: formatNumber(mediaCount), icon: Image, change: "+18%" },
    { title: "Announcements", value: formatNumber(announcementCount), icon: Bell, change: "+8%" },
  ];

  const quickActions = [
    { title: "Analytics Dashboard", href: "/admin/analytics", icon: BarChart3 },
    { title: "Manage Leaders", href: "/admin/leaders", icon: Award },
    { title: "Events & Calendar", href: "/admin/events", icon: CalendarIcon },
    { title: "Gallery", href: "/admin/gallery", icon: Image },
    { title: "Announcements", href: "/admin/announcements", icon: Bell },
    { title: "Book of Year", href: "/admin/book", icon: BookOpen },
  ];

  const recentActivity = [
    { action: "New member registered", time: "2 minutes ago" },
    { action: "Event 'Prayer Week' updated", time: "1 hour ago" },
    { action: "Gallery updated with 12 new photos", time: "3 hours ago" },
    { action: "Announcement published", time: "5 hours ago" },
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
              <Card key={stat.title} className="bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-2xl transition-shadow duration-300">
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

        {/* Analytics Cards */}
        {isConfigured && analyticsData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="flex items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Page Views (30d)</CardTitle>
                <Eye className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{formatNumber(analyticsData.pageViews)}</div>
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
                <div className="text-2xl font-bold text-green-900">{formatNumber(analyticsData.users)}</div>
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
                <div className="text-2xl font-bold text-purple-900">{formatNumber(analyticsData.sessions)}</div>
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
                  <div className="text-2xl font-bold text-orange-900">{realTimeData.totalActiveUsers || 0}</div>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 mt-2">
                    <Activity className="h-3 w-3 mr-1" />
                    Right now
                  </Badge>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Quick Actions + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.title} to={action.href}>
                    <Button variant="outline" className="w-full justify-start p-4 hover:bg-accent hover:border-primary transition-colors duration-200">
                      <Icon className="h-5 w-5 mr-3 text-primary" />
                      {action.title}
                    </Button>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

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
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
