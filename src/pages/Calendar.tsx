import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Users, Filter, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAnnualCalendars } from "@/services/calendar";
import { motion } from "framer-motion";

const Calendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredMonth, setFilteredMonth] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getAnnualCalendars();
        const formatted = result
          .map((e: any) => ({
            id: e.ID || e.id,
            title: e.Event || "Untitled Event",
            date: e.Date ? new Date(e.Date) : null,
            participants: e.Participants || "",
            location: e.Location || "TBD",
          }))
          .sort((a, b) => (a.date && b.date ? a.date.getTime() - b.date.getTime() : 0));
        setEvents(formatted);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = events.filter((event) => {
    if (filteredMonth === "all") return true;
    return new Date(event.date).getMonth().toString() === filteredMonth;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-primary/10">
      <Navigation />

      {/* Header */}
      <section className="py-20 text-center bg-gradient-to-br from-primary/20 via-accent/10 to-primary/30">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-6">
            <CalendarIcon className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            TUCASA STU <span className="text-primary">Calendar</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with every event, meeting, and gathering throughout the year.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-white/60 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-sm">Filter by Month</span>
          </div>
          <Select value={filteredMonth} onValueChange={setFilteredMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December",
              ].map((month, i) => (
                <SelectItem key={i} value={i.toString()}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading events...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground">No events available for this month.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="bg-white/90 shadow-md hover:shadow-xl border-0 transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-primary line-clamp-2">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        {event.date?.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" /> {event.location}
                      </div>
                      {event.participants && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" /> {event.participants}
                        </div>
                      )}
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity mt-4"
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calendar;
