import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LogOut,
  Settings,
  Users,
  Calendar,
  Image,
  Bell,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionExpiredModal } from "@/components/SessionExpiredModal";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: Home },
  { name: "Leaders", path: "/admin/leaders", icon: Users },
  { name: "Events", path: "/admin/events", icon: Calendar },
  { name: "Gallery", path: "/admin/gallery", icon: Image },
  { name: "Announcements", path: "/admin/announcements", icon: Bell },
  { name: "Book of the Year", path: "/admin/book", icon: BookOpen },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionExpired, setSessionExpired] = React.useState(false);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  // Session expired handler
  React.useEffect(() => {
    const handleSessionExpired = () => setSessionExpired(true);
    window.addEventListener("sessionExpired", handleSessionExpired);
    return () => window.removeEventListener("sessionExpired", handleSessionExpired);
  }, []);

  const handleLoginAgain = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSessionExpired(false);
    navigate("/admin/login");
  };

  return (
    <>
      <SessionExpiredModal
        open={sessionExpired}
        onClose={() => setSessionExpired(false)}
        onLogin={handleLoginAgain}
      />

      <div className="flex min-h-screen bg-gray-50 text-gray-800">
        {/* Sidebar */}
        <aside
          className={`fixed md:static z-30 bg-white shadow-md border-r flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } w-64`}
        >
          <div className="p-6 border-b flex items-center justify-between md:justify-center">
            <h1 className="text-2xl font-bold text-blue-600">TUCASA Admin</h1>
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition hover:bg-blue-100 ${
                    isActive ? "bg-blue-100 font-semibold" : ""
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-blue-700" : "text-blue-600"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full flex items-center gap-2"
            >
              <LogOut className="h-5 w-5" /> Logout
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
          {/* Top Navbar */}
          <header className="flex items-center justify-between bg-white border-b p-4 shadow-sm">
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <span className="font-semibold">Admin Panel</span>
            </div>

            <div className="hidden md:flex items-center justify-between w-full">
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
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
