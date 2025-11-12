// src/layouts/AdminLayout.tsx
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Image,
  Bell,
  BookOpen,
  Eye,
  Menu,
  X,
  LogOut,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // -----------------------------------------------------------------
  // 1. Listen for global session-expired event (dispatched by api.ts)
  // -----------------------------------------------------------------
  useEffect(() => {
    const handler = () => {
      // Clear everything and go to login (modal will also appear)
      localStorage.clear();
      navigate("/admin/login", { replace: true });
    };
    window.addEventListener("sessionExpired", handler);
    return () => window.removeEventListener("sessionExpired", handler);
  }, [navigate]);

  // -----------------------------------------------------------------
  // 2. Logout button (manual logout – same as before but clears all)
  // -----------------------------------------------------------------
  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login", { replace: true });
  };

  // -----------------------------------------------------------------
  // 3. Menu items – unchanged
  // -----------------------------------------------------------------
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Users, label: "Leaders", path: "/admin/leaders" },
    { icon: Bell, label: "Announcements", path: "/admin/announcements" },
    { icon: Image, label: "Gallery", path: "/admin/gallery" },
    { icon: Calendar, label: "Events & Calendar", path: "/admin/events" },
    { icon: BookOpen, label: "Book of Year", path: "/admin/book" },
  ];

  // -----------------------------------------------------------------
  // 4. Render – **design 100% identical**
  // -----------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            {sidebarOpen && (
              <Link to="/admin/dashboard" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">TUCASA Admin</span>
                  <span className="text-xs text-muted-foreground">STU Portal</span>
                </div>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      !sidebarOpen && "justify-center px-0"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Link to="/" target="_blank">
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start",
                  !sidebarOpen && "justify-center px-0"
                )}
              >
                <Eye className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
                {sidebarOpen && <span>View Site</span>}
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={cn(
                "w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10",
                !sidebarOpen && "justify-center px-0"
              )}
            >
              <LogOut className={cn("h-4 w-4", sidebarOpen && "mr-2")} />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;