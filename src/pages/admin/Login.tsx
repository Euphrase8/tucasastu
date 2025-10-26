import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, X, Home } from "lucide-react";
import { login } from "@/services/login.js";
import logo from "@/assets/logo1.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login({ email, password });
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setTimeout(() => navigate("/admin/dashboard", { replace: true }), 100);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 relative overflow-hidden p-4">

      {/* Polygon Background Patterns */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexPattern" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <polygon points="40,0 80,20 80,60 40,80 0,60 0,20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
          <pattern id="trianglePattern" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon points="30,0 60,52 0,52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
        <rect width="100%" height="100%" fill="url(#trianglePattern)" />
      </svg>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-gray-200">
        <CardHeader className="text-center space-y-4 py-6">
          <div className="mx-auto w-20 h-20 rounded-full overflow-hidden shadow-md">
            <img src={logo} alt="TUCASA Logo" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#3e8391] to-[#2f557f] bg-clip-text text-transparent">
            TUCASA STU Admin
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Access the content management system
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tucasastu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-200 focus:ring-[#3e8391]"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:ring-[#3e8391] pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3e8391] to-[#2f557f] hover:from-[#2e6a7a] hover:to-[#1f3a5c] text-white transition-colors"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <Link to="/">
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-200 text-muted-foreground hover:bg-gray-50 hover:text-[#3e8391] transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-[#3e8391] border-gray-300 rounded-full animate-spin"></div>
            <span className="mt-4 text-white font-medium">Logging in...</span>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 bg-red-600 text-white flex items-center space-x-2 animate-scale-in">
          <X className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
