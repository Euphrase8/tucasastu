import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, Calendar, Clock, ArrowRight, Bell } from "lucide-react";
import { fetchAnnouncements as getAnnouncements } from "@/services/posts";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data.slice(0, 3)); // first 3 announcements for homepage
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Megaphone className="w-4 h-4 mr-2" />
            Latest Announcements
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay <span className="text-gradient-divine">Informed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Important updates, events, and news from TUCASA STU leadership and activities across Tanzania.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading announcements...</p>
          </div>
        ) : announcements.length > 0 ? (
          // Cards container
          <div
            className={
              announcements.length === 1
                ? "flex justify-center mb-8" // center single announcement
                : "grid lg:grid-cols-3 gap-6 mb-8" // normal grid for multiple
            }
          >
            {announcements.map((a, i) => (
              <Card
                key={a._id}
                className="group overflow-hidden shadow-card hover:shadow-divine transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm animate-fade-in w-full max-w-sm"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={
                      a.image ||
                      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop"
                    }
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center text-white text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(a.date || a.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{a.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {Math.floor(Math.random() * 5) + 1} min read
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary-foreground hover:bg-primary p-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12">
            <Megaphone className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">No Announcements Yet</h3>
            <p className="text-muted-foreground">Check back later for updates.</p>
          </div>
        )}

        {/* View All Announcements */}
        <div className="text-center">
          <Link to="/announcements">
            <Button variant="outline" size="lg" className="hover-scale">
              View All Announcements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Notification Signup */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-card">
          <Bell className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-4">Never Miss an Update</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to receive instant notifications about important TUCASA announcements and events.
          </p>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            Enable Notifications
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
