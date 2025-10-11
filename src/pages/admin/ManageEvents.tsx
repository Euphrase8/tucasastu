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
import { Plus, Edit, Trash2, Calendar, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAnnualCalendars, createAnnualCalendar, updateAnnualCalendar, deleteAnnualCalendar } from "@/services/calendar";

const ManageEvents = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    event: "",
    date: "",
    location: "",
    description: "",
    participants: ""
  });

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAnnualCalendars();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      await createAnnualCalendar({
        event: formData.event,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        participants: formData.participants
      });
      await fetchEvents();
      setIsAddDialogOpen(false);
      setFormData({ event: "", date: "", location: "", description: "", participants: "" });
      toast({ title: "Success", description: "Event added successfully" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to add event",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await updateAnnualCalendar(selectedItem.id, {
        event: formData.event,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        participants: formData.participants
      });
      await fetchEvents();
      setIsEditDialogOpen(false);
      toast({ title: "Success", description: "Event updated successfully" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to update event",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAnnualCalendar(selectedItem.id);
      await fetchEvents();
      setDeleteDialogOpen(false);
      toast({ title: "Success", description: "Event deleted successfully" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to delete event",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (item: any) => {
    setSelectedItem(item);
    setFormData({
      event: item.event,
      date: item.date ? item.date.split('T')[0] : "",
      location: item.location || "",
      description: item.description || "",
      participants: item.participants || ""
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: any) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
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
                <div className="space-y-2">
                  <Label>Event Title</Label>
                  <Input value={formData.event} onChange={(e) => setFormData({...formData, event: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Participants</Label>
                  <Input value={formData.participants} onChange={(e) => setFormData({...formData, participants: e.target.value})} required />
                </div>
                <Button onClick={handleAdd} className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Calendar</h3>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-4">
            {events.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{item.event}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{item.location}</span>
                          </div>
                        )}
                        {item.participants && (
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{item.participants} participants</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openDeleteDialog(item)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input value={formData.event} onChange={(e) => setFormData({...formData, event: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Participants</Label>
                <Input value={formData.participants} onChange={(e) => setFormData({...formData, participants: e.target.value})} />
              </div>
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
