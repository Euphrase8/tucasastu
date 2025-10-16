import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Bell, Megaphone } from "lucide-react";
import { fetchAnnouncements } from "@/services/announcements";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Announcement {
  ID: number;
  Title: string;
  Description: string;
  Image?: string;
  CreatedAt?: string;
}

const AnnouncementsPage = () => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
    const interval = setInterval(loadAnnouncements, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await fetchAnnouncements();
      const mapped = (data || []).map((item: any) => ({
        ID: item.ID,
        Title: item.Title || "No Title",
        Description: item.Description || "No description available",
        Image: item.Image || "",
        CreatedAt: item.CreatedAt,
      }));
      setAnnouncements(mapped);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast({
        title: "Error",
        description: "Failed to load announcements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 inline-flex items-center">
                <Megaphone className="w-4 h-4 mr-2" /> All Announcements
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Stay <span className="text-gradient-divine">Informed</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Important updates, events, and news from TUCASA STU leadership and activities across Tanzania.
              </p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid lg:grid-cols-3 gap-6 mb-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[300px] rounded-xl bg-white/60 animate-pulse shadow-sm"></div>
                ))}
              </div>
            )}

            {/* Announcements Grid */}
            {!loading && announcements.length > 0 && (
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {announcements.map((a, i) => (
                  <motion.div
                    key={a.ID}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <Card className="group overflow-hidden shadow-card hover:shadow-divine transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-1">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={
                            a.Image
                              ? `${import.meta.env.VITE_BASE_URL}/${a.Image}`
                              : "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop"
                          }
                          alt={a.Title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center text-white text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(a.CreatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {a.Title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {a.Description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {Math.floor(Math.random() * 5) + 1} min read
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary p-2">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && announcements.length === 0 && (
              <div className="text-center py-12">
                <Megaphone className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">No Announcements Yet</h3>
                <p className="text-muted-foreground">Check back later for updates.</p>
              </div>
            )}

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
      </main>
      <Footer />
    </>
  );
};

export default AnnouncementsPage;
