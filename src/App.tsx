import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
// import Summit from "./pages/Summit";
import Leaders from "./pages/Leaders";
import Calendar from "./pages/Calendar";
import BookOfYear from "./pages/BookOfYear";
import Join from "./pages/Join";
import Register from "./pages/Register";
import Announcements from "./pages/Announcements";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Analytics from "./pages/admin/Analytics";
import ManageLeaders from "./pages/admin/ManageLeaders";
import ManageGallery from "./pages/admin/ManageGallery";
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageBook from "./pages/admin/ManageBook";
import ManageEvents from "./pages/admin/ManageEvents";

import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/summit" element={<Summit />} /> */}
          <Route path="/leaders" element={<Leaders />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/book-of-year" element={<BookOfYear />} />
          <Route path="/join" element={<Join />} />
          <Route path="/register" element={<Register />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leaders"
            element={
              <ProtectedRoute>
                <ManageLeaders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <ManageGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <ProtectedRoute>
                <ManageAnnouncements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/book"
            element={
              <ProtectedRoute>
                <ManageBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <ManageEvents />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
