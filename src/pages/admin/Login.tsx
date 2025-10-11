import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Shield, X } from "lucide-react";
import { login } from "@/services/login.js";

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
        // Save token & user info
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        console.log("Stored token:", localStorage.getItem("token"));

        // Delay ensures token is set before redirect
        setTimeout(() => {
          navigate("/admin/dashboard", { replace: true });
        }, 100);
      } else {
        setError("Login Failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-primary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl bg-card/95 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          {loading && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900/70 z-50">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-[6px] border-t-[#3e8391] border-gray-200 rounded-full animate-spin"></div>
                <p className="mt-6 text-lg text-white font-inter">Logging in...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 animate-scale-in bg-red-600 text-white font-inter flex items-center max-w-[90%]">
              <X className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TUCASA STU Admin
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Access the content management system
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tucasastu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
