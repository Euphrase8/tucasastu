import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Users, Filter, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { getAnnualCalendars } from "@/services/calendar";

interface Event {
  id: number;
  title: string;
  date: Date;
  participants?: string;
  location?: string;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await getAnnualCalendars();
        const formatted = result.map((e: any) => ({
          id: e.ID || e.id,
          title: e.Event || "Untitled Event",
          date: e.Date ? new Date(e.Date) : new Date(),
          participants: e.Participants || "",
          location: e.Location || "TBD",
        }));
        setEvents(formatted.sort((a, b) => a.date.getTime() - b.date.getTime()));
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Helpers for Month & Week views
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay(); // Sunday = 0
  const totalDays = endOfMonth.getDate();

  const generateMonthDays = () => {
    const days: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) days.push(null); // leading empty cells
    for (let d = 1; d <= totalDays; d++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), d));
    return days;
  };

  const generateWeekDays = () => {
    const start = new Date(currentDate);
    const dayOfWeek = start.getDay();
    start.setDate(start.getDate() - dayOfWeek); // start of week (Sunday)
    return Array.from({ length: 7 }).map((_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  };

  const days = viewMode === "month" ? generateMonthDays() : generateWeekDays();

  const eventsForDate = (date: Date) => events.filter(e => e.date.toDateString() === date.toDateString());

  // Navigation
  const handlePrev = () => {
    if (viewMode === "month") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    else setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNext = () => {
    if (viewMode === "month") setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    else setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

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

      {/* View & Navigation */}
      <section className="py-8 border-b bg-white/60 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-sm">View:</span>
            <Button variant={viewMode === "month" ? "default" : "outline"} size="sm" onClick={() => setViewMode("month")}>Month</Button>
            <Button variant={viewMode === "week" ? "default" : "outline"} size="sm" onClick={() => setViewMode("week")}>Week</Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handlePrev}><ArrowLeft className="w-4 h-4" /></Button>
            <span className="font-medium text-lg">
              {viewMode === "month"
                ? currentDate.toLocaleString("default", { month: "long", year: "numeric" })
                : `Week of ${currentDate.toLocaleDateString("default", { month: "short", day: "numeric" })}`}
            </span>
            <Button variant="outline" size="sm" onClick={handleNext}><ArrowRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading events...</p>
          ) : (
            <div className={`grid ${viewMode === "month" ? "grid-cols-7" : "grid-cols-1 md:grid-cols-7"} gap-2 text-center text-sm`}>
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day, idx) => (
                <div key={idx} className="font-semibold">{viewMode === "month" ? day : day}</div>
              ))}
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`min-h-[80px] p-1 border rounded-lg flex flex-col items-start overflow-hidden ${day ? "bg-white/90" : ""}`}
                >
                  {day && (
                    <>
                      <div className="text-xs font-semibold mb-1">{day.getDate()}</div>
                      {eventsForDate(day).map(event => (
                        <div
                          key={event.id}
                          className="bg-primary/20 text-primary rounded px-1 py-0.5 text-xs truncate cursor-pointer w-full mb-1"
                          title={event.title}
                          onClick={() => setSelectedEvent(event)}
                        >
                          {event.title}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
            <p className="text-sm text-muted-foreground mb-1">
              <CalendarIcon className="inline w-4 h-4 mr-1 text-primary" />
              {selectedEvent.date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {selectedEvent.location && (
              <p className="text-sm text-muted-foreground mb-1">
                <MapPin className="inline w-4 h-4 mr-1 text-primary" /> {selectedEvent.location}
              </p>
            )}
            {selectedEvent.participants && (
              <p className="text-sm text-muted-foreground mb-2">
                <Users className="inline w-4 h-4 mr-1 text-primary" /> {selectedEvent.participants}
              </p>
            )}
            <Button onClick={() => setSelectedEvent(null)} className="mt-2 w-full">Close</Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CalendarPage;
