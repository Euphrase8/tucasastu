import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Plus, Edit, Trash2, Calendar, MapPin, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAnnualCalendars, createAnnualCalendar, updateAnnualCalendar, deleteAnnualCalendar } from "@/services/calendar";
import { format, isSameDay, isAfter, compareAsc } from "date-fns";

const ManageEvents = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [nextEvent, setNextEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    event: "",
    date: "",
    location: "",
    description: "",
    participants: ""
  });

  // Fetch events
  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  // Filter events based on selected date
  useEffect(() => {
    if (!date || events.length === 0) {
      setFilteredEvents([]);
      setNextEvent(getNextEvent(events));
      return;
    }
    const selectedDayEvents = events.filter(ev => ev.date && isSameDay(new Date(ev.date), date));
    setFilteredEvents(selectedDayEvents);

    // If no event on selected date, pick next upcoming
    setNextEvent(getNextEvent(events, date));
  }, [events, date]);

  const normalizeEvent = (ev: any) => {
    const eventDate = ev.date || ev.Date || ev.EventDate;
    let quarter = "N/A";
    if (eventDate) {
      const month = new Date(eventDate).getMonth() + 1;
      quarter = `Q${Math.ceil(month / 3)}`;
    }

    return {
      id: ev.id || ev.ID || ev._id || null,
      event: ev.event || ev.Title || ev.Event || "Untitled Event",
      date: eventDate || null,
      description: ev.description || ev.Description || "",
      participants: ev.participants || ev.Participants || "",
      location: ev.location || ev.Location || "",
      quarter
    };
  };

  const fetchEvents = async () => {
    try {
      const data = await getAnnualCalendars();
      if (!Array.isArray(data)) throw new Error("Invalid API response");
      const normalized = data.map(normalizeEvent);
      setEvents(normalized);
    } catch (error: any) {
      console.error("Error fetching events:", error);
      toast({ title: "Error", description: error.message || "Failed to fetch events", variant: "destructive" });
      setEvents([]);
    }
  };

  const getNextEvent = (allEvents: any[], fromDate?: Date) => {
    const now = fromDate || new Date();
    const upcoming = allEvents
      .filter(ev => ev.date && isAfter(new Date(ev.date), now))
      .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));
    return upcoming.length > 0 ? upcoming[0] : null;
  };

  const renderDate = (dateString: string | undefined) => {
    if (!dateString) return "No Date";
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? "Invalid Date" : d.toLocaleDateString();
  };

  const handleAdd = async () => {
    if (!formData.event || !formData.date || !formData.participants) {
      toast({ title: "Error", description: "Event, Date, and Participants are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await createAnnualCalendar(formData);
      await fetchEvents();
      setIsAddDialogOpen(false);
      setFormData({ event: "", date: "", location: "", description: "", participants: "" });
      toast({ title: "Success", description: "Event added successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to add event", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedItem) return;
    setLoading(true);
    try {
      await updateAnnualCalendar(selectedItem.id, formData);
      await fetchEvents();
      setIsEditDialogOpen(false);
      toast({ title: "Success", description: "Event updated successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to update event", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setLoading(true);
    try {
      await deleteAnnualCalendar(selectedItem.id);
      await fetchEvents();
      setDeleteDialogOpen(false);
      toast({ title: "Success", description: "Event deleted successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to delete event", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (item: any) => {
    setSelectedItem(item);
    setFormData({
      event: item.event,
      date: item.date ? item.date.split("T")[0] : "",
      location: item.location,
      description: item.description,
      participants: item.participants
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: any) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const renderEventCard = (item: any) => (
    <Card key={item.id} className="bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-2xl mb-2">{item.event}</h3>
            <p className="text-muted-foreground mb-4">{item.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-[#3e8391]" /> {renderDate(item.date)}
              </div>
              {item.location && <div className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#3e8391]" /> {item.location}</div>}
              {item.participants && <div className="flex items-center gap-1"><Users className="h-4 w-4 text-[#3e8391]" /> {item.participants}</div>}
              {item.quarter && <div className="flex items-center gap-1"><Award className="h-4 w-4 text-[#3e8391]" /> {item.quarter}</div>}
            </div>
          </div>
          <div className="flex gap-2 lg:flex-col items-start">
            <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
              <Edit className="h-4 w-4" /> Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => openDeleteDialog(item)} className="text-destructive">
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md flex items-center justify-between p-4 mb-8 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3e8391] to-[#2f557f] bg-clip-text text-transparent">
              Events & Calendar Management
            </h1>
            <p className="text-muted-foreground">Schedule and manage events</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label>Event Title</Label>
                <Input value={formData.event} onChange={(e) => setFormData({ ...formData, event: e.target.value })} required />
                <Label>Date</Label>
                <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                <Label>Location</Label>
                <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                <Label>Participants</Label>
                <Input value={formData.participants} onChange={(e) => setFormData({ ...formData, participants: e.target.value })} required />
                <Button onClick={handleAdd} className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sticky Calendar */}
          <Card className="lg:col-span-1 sticky top-24 h-fit">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Calendar</h3>
              <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredEvents.length > 0
              ? filteredEvents.map(item => renderEventCard(item))
              : nextEvent
                ? (
                  <Card className="bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Next Event</h3>
                      {renderEventCard(nextEvent)}
                    </CardContent>
                  </Card>
                )
                : <p className="text-gray-500">No events scheduled.</p>
            }
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Event Title</Label>
              <Input value={formData.event} onChange={(e) => setFormData({ ...formData, event: e.target.value })} />
              <Label>Date</Label>
              <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              <Label>Location</Label>
              <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <Label>Participants</Label>
              <Input value={formData.participants} onChange={(e) => setFormData({ ...formData, participants: e.target.value })} />
              <Button onClick={handleEdit} className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Event"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          title="Delete Event"
          description="Are you sure you want to delete this event?"
          confirmText="Delete"
        />
      </div>
    </AdminLayout>
  );
};

export default ManageEvents;
