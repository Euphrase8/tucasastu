import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Plus, Edit, Trash2, Phone, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getLeaders, addLeader, updateLeader, deleteLeader } from "@/services/leaders";
import { getToken } from "@/services/login";

const ManageLeaders = ({ leaderType = "" }: { leaderType?: string }) => {
  const token = getToken();
  const { toast } = useToast();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const safeLeaderType = leaderType.toLowerCase();

  // Titles: chaplain-specific or general
  const titleOptions = safeLeaderType === "chaplain"
    ? [
        "Senior Chaplain",
        "Assistant Chaplain",
        "Youth Chaplain",
        "Women Chaplain",
        "Chaplain Coordinator"
      ]
    : [
        "Union Chair Person",
        "Secretary",
        "Treasurer",
        "Coordinator"
      ];

  const [formData, setFormData] = useState({
    Name: "",
    Title: titleOptions[0],
    contact: ""
  });

  useEffect(() => {
    fetchLeaders();
  }, [leaderType]);

  const fetchLeaders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getLeaders(token);
      if (!Array.isArray(data)) throw new Error("Invalid data from API");
      setLeaders(data);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to fetch leaders", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name.trim() || !formData.Title.trim() || !formData.contact.trim()) {
      toast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("name", formData.Name);
      fd.append("contact", formData.contact);
      fd.append("title", formData.Title); // single sentence, no - 

      if (imageFile) fd.append("image", imageFile);

      if (selectedLeader) {
        await updateLeader(selectedLeader.ID, fd, token);
        toast({ title: "Success", description: "Leader updated successfully" });
      } else {
        await addLeader(fd, token);
        toast({ title: "Success", description: "Leader added successfully" });
      }

      setFormData({ Name: "", Title: titleOptions[0], contact: "" });
      setImageFile(null);
      setSelectedLeader(null);
      setIsDialogOpen(false);
      fetchLeaders();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Action failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (leader: any) => {
    setSelectedLeader(leader);
    setFormData({
      Name: leader.Name || "",
      Title: titleOptions.includes(leader.Title) ? leader.Title : titleOptions[0],
      contact: leader.Contact || ""
    });
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedLeader) return;
    try {
      setLoading(true);
      await deleteLeader(selectedLeader.ID, token);
      toast({ title: "Success", description: "Leader deleted successfully" });
      setDeleteDialogOpen(false);
      setSelectedLeader(null);
      fetchLeaders();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Delete failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filtered = leaders.filter(leader => {
    return (leader.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leader.Title?.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{leaderType || "Leader"} Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> {selectedLeader ? "Edit Leader" : "Add New Leader"}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{selectedLeader ? "Edit Leader" : "Add New Leader"}</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Select value={formData.Title} onValueChange={(value) => setFormData({ ...formData, Title: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a title" />
                    </SelectTrigger>
                    <SelectContent>
                      {titleOptions.map((title) => (
                        <SelectItem key={title} value={title}>{title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Contact</Label>
                  <Input value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Photo</Label>
                  <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                  {imageFile && <p className="text-sm text-muted-foreground">{imageFile.name}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : selectedLeader ? "Update Leader" : "Add Leader"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Leaders Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((leader) => (
            <Card key={leader.ID} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img
                    src={leader.Image ? `https://api.tucasastu.com/${leader.Image}` : "/placeholder-image.jpg"}
                    alt={leader.Name || "Leader"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle>{leader.Name || "Unnamed Leader"}</CardTitle>
                    <Badge>{leader.Title || "No Title"}</Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(leader)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => { setSelectedLeader(leader); setDeleteDialogOpen(true); }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardHeader>
              <CardContent>
                {leader.Contact && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-primary" />{leader.Contact}</div>}
                {leader.Institution && <div className="flex items-center gap-2 text-sm"><Award className="h-4 w-4 text-primary" />{leader.Institution}</div>}
              </CardContent>
            </Card>
          ))}
        </div>

        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          title="Delete Leader"
          description="Are you sure you want to delete this leader? This action cannot be undone."
          confirmText="Delete"
        />
      </div>
    </AdminLayout>
  );
};

export default ManageLeaders;
