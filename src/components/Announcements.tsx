import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, Calendar, Clock, ArrowRight, Bell } from "lucide-react";
import { fetchAnnouncements as getAnnouncements } from "@/services/announcements";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await getAnnouncements();
      const mapped = (data || []).map((item: any) => ({
        ID: item.ID,
        title: item.Title || item.heading || "No Title",
        description:
          item.Description || item.body || "No description available",
        image: item.Image
          ? `${import.meta.env.VITE_BASE_URL}/${item.Image}`
          : "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop",
        date: item.date || item.createdAt || new Date().toISOString(),
        attachment: item.attachment || null,
      }));
      setAnnouncements(mapped.slice(0, 3));
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10">
          <Badge
            variant="outline"
            className="mb-3 inline-flex items-center border-primary/20 px-3 py-1"
          >
            <Megaphone className="w-4 h-4 mr-2 text-primary" />
            Latest Announcements
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay <span className="text-gradient-divine">Informed</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Key updates, events, and news from TUCASA STU across Tanzania.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-3 text-muted-foreground text-sm">
              Loading announcements...
            </p>
          </div>
        ) : announcements.length > 0 ? (
          <div
            className={
              announcements.length === 1
                ? "flex justify-center mb-8"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
            }
          >
            {announcements.map((a, i) => (
              <Card
                key={a.ID}
                className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl max-w-2xl mx-auto"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-0">
                  {/* Poster */}
                  <div className="flex items-center justify-center bg-gray-100 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none p-4">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-auto max-h-[600px] object-contain"
                    />
                  </div>

                  {/* Description */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-2xl mb-3 text-gray-900 group-hover:text-primary transition-colors">
                        {a.title}
                      </h3>

                      <p className="text-base text-gray-700 leading-relaxed">
                        {a.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2 text-xs bg-primary text-white px-3 py-1 rounded-md">
                        <Calendar className="w-3 h-3" />
                        {new Date(a.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>

                      {a.attachment && (
                        <Link to={a.attachment} target="_blank">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10 px-3 py-1"
                          >
                            View <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-bold mb-2">No Announcements Yet</h3>
            <p className="text-muted-foreground text-sm">
              Check back later for updates.
            </p>
          </div>
        )}

        {/* View All Announcements */}
        <div className="text-center">
          <Link to="/announcements">
            <Button variant="outline" size="sm" className="hover-scale text-sm">
              View All Announcements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Notification Signup */}
        <div className="mt-10 bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center shadow-sm">
          <Bell className="h-10 w-10 mx-auto text-primary mb-3" />
          <h3 className="text-lg font-bold mb-3">Never Miss an Update</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Subscribe for instant notifications on TUCASA announcements and
            events.
          </p>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-sm">
            Enable Notifications
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
