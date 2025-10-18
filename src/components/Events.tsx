import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAnnualCalendars } from "@/services/calendar";
import { motion } from "framer-motion";

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const result = await getAnnualCalendars();

        // Normalize & sort by date
        const sorted = result
          .map((e: any) => ({
            id: e.ID || e.id,
            title: e.Event || "Untitled Event",
            date: e.Date ? new Date(e.Date) : null,
            participants: e.Participants || "",
            description: e.Description || "",
            location: e.Location || "TBD",
          }))
          .filter((e) => e.date && e.date > new Date())
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, 3); // only 3 upcoming

        setUpcomingEvents(sorted);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Calendar className="w-4 h-4 mr-2" /> Events & Programs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover inspiring activities and connect with the TUCASA family through faith, leadership, and service.
          </p>
        </div>

        {/* Events Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading upcoming events...</p>
        ) : upcomingEvents.length === 0 ? (
          <p className="text-center text-muted-foreground">No upcoming events found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 bg-white/90 backdrop-blur-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date?.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {event.location}
                      </div>
                      {event.participants && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          {event.participants}
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {event.description}
                      </p>
                    )}

                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity"
                    >
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => navigate("/calendar")}
          >
            View All Events
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
