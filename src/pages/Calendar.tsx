import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Users, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAnnualCalendars } from "@/services/calendar"; // your API service

const Calendar = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token"); // adjust if your auth method is different
        const result = await getAnnualCalendars(token);

        const normalizedEvents = result.map((event: any) => ({
          id: event.ID || event.id || null,
          Event: event.Event || "Untitled Event",
          Date: event.Date || null,
          Participants: event.Participants || "",
        }));

        normalizedEvents.sort((a, b) => {
          const dateA = new Date(a.Date);
          const dateB = new Date(b.Date);
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          return dateA.getTime() - dateB.getTime();
        });

        setEvents(normalizedEvents);
      } catch (err: any) {
        setError(err.message || "Failed to load events. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    if (selectedMonth === "all") return true;
    const eventMonth = new Date(event.Date).getMonth();
    return eventMonth.toString() === selectedMonth;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
              <CalendarIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              TUCASA STU{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Calendar
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay updated with all our events, meetings, and programs throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card/50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filter by Month:</span>
            </div>
            <div className="flex gap-4">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="0">January</SelectItem>
                  <SelectItem value="1">February</SelectItem>
                  <SelectItem value="2">March</SelectItem>
                  <SelectItem value="3">April</SelectItem>
                  <SelectItem value="4">May</SelectItem>
                  <SelectItem value="5">June</SelectItem>
                  <SelectItem value="6">July</SelectItem>
                  <SelectItem value="7">August</SelectItem>
                  <SelectItem value="8">September</SelectItem>
                  <SelectItem value="9">October</SelectItem>
                  <SelectItem value="10">November</SelectItem>
                  <SelectItem value="11">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more events.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-all duration-300 group"
                >
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {event.Event}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span>
                        {new Date(event.Date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{event.Participants}</span>
                    </div>
                    <div className="pt-4">
                      <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
