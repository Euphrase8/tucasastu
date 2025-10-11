import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, Settings, Users, Calendar, Image, Bell, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">TUCASA Admin</h1>
          <p className="text-xs text-gray-500 mt-1">Dashboard Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <Home className="h-5 w-5 text-blue-600" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/leaders"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <Users className="h-5 w-5 text-blue-600" />
            <span>Leaders</span>
          </Link>

          <Link
            to="/admin/events"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Events</span>
          </Link>

          <Link
            to="/admin/gallery"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <Image className="h-5 w-5 text-blue-600" />
            <span>Gallery</span>
          </Link>

          <Link
            to="/admin/announcements"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <Bell className="h-5 w-5 text-blue-600" />
            <span>Announcements</span>
          </Link>

          <Link
            to="/admin/book"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span>Book of the Year</span>
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <Settings className="h-5 w-5 text-blue-600" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full flex items-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white border-b p-4 shadow-sm">
          <h2 className="font-semibold text-lg">Admin Panel</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/settings")}
            >
              <Settings className="h-4 w-4 mr-1" /> Settings
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
