import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Phone, Search, Filter } from "lucide-react";

const Leaders = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTitle, setFilterTitle] = useState("all");

const API_BASE = "https://api.tucasastu.com";

  // Fetch leaders (no token required)
  const fetchLeaders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE}/api/chaplaincy-leaders`);
      if (!response.ok) throw new Error("Failed to fetch leaders");
      const data = await response.json();
      setLeaders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load leaders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  // Filtering & searching
  const filteredLeaders = leaders.filter((leader) => {
    const matchesSearch =
      leader.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.Title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterTitle === "all" || leader.Title?.toLowerCase() === filterTitle;
    return matchesSearch && matchesFilter;
  });

  // Extract title categories dynamically
  const uniqueTitles = Array.from(
    new Set(leaders.map((l) => l.Title).filter(Boolean))
  );

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-divine-light via-white to-divine-light py-20">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-3">
              <Users className="w-4 h-4 mr-2" />
              Leadership Directory
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient-divine">Leaders</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the visionaries guiding TUCASA STU’s mission with passion and faith.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-12 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter className="h-4 w-4 text-gray-500" />
                <Button
                  variant={filterTitle === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterTitle("all")}
                >
                  All
                </Button>
                {uniqueTitles.map((title) => (
                  <Button
                    key={title}
                    variant={
                      filterTitle === title.toLowerCase() ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setFilterTitle(title.toLowerCase())}
                  >
                    {title}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Leaders Grid */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-72 bg-gray-200/60 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : filteredLeaders.length === 0 ? (
            <p className="text-center text-gray-500">No leaders found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredLeaders.map((leader, idx) => (
                <Card
                  key={leader.ID || idx}
                  className="overflow-hidden border-0 rounded-2xl shadow-lg hover:shadow-divine transition-all duration-300 bg-white/90 backdrop-blur-sm"
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <img
                      src={
                        leader.Image
                          ? `${API_BASE}/${leader.Image.replace(/\\/g, "/")}`
                          : "/placeholder-image.jpg"
                      }
                      alt={leader.Name}
                      onError={(e) =>
                        (e.currentTarget.src = "/placeholder-image.jpg")
                      }
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-blue-700 font-semibold"
                      >
                        {leader.Title || "Leader"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-1 text-gray-800">
                      {leader.Name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {leader.Title}
                    </p>
                    {leader.Contact && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2 text-blue-600" />
                        {leader.Contact}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaders;
