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
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Members", value: "2,847", icon: Users, change: "+12%" },
    { title: "Active Events", value: "23", icon: CalendarIcon, change: "+5%" },
    { title: "Gallery Images", value: "1,234", icon: Image, change: "+18%" },
    { title: "Announcements", value: "45", icon: Bell, change: "+8%" }
  ];

  const quickActions = [
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
