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
import { Plus, Edit, Trash2, Phone, Award, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getLeaders, addLeader, updateLeader, deleteLeader } from "@/services/leaders";
import { getToken } from "@/services/login";

const ManageLeaders = ({ leaderType = "" }: { leaderType?: string }) => {
  const token = getToken();
  const { toast } = useToast();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTitle, setFilterTitle] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const API_BASE = import.meta.env.VITE_BASE_URL;

  const titleOptions = [
    "Chaplain", "Union Chairperson", "Zonal Chairperson", "Deputy Union Chairperson",
    "Deputy Zonal Chairperson", "Treasurer", "Secretary", "Assistant Chaplain",
    "Youth Chaplain", "Women Chaplain",
  ];

  const [formData, setFormData] = useState({ Name: "", Title: titleOptions[0], contact: "" });

  useEffect(() => { fetchLeaders(); }, [leaderType]);

  const fetchLeaders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getLeaders(token);
      setLeaders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch leaders", variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.Name || !formData.Title || !formData.contact) {
      toast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }
    if (!selectedLeader && !imageFile) {
      toast({ title: "Error", description: "Please select an image", variant: "destructive" });
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("name", formData.Name);
      fd.append("contact", formData.contact);
      fd.append("title", formData.Title);
      if (imageFile) {
        const newFile = new File(
          [imageFile],
          `${formData.Title.replace(/\s+/g, "_")}.${imageFile.name.split(".").pop()}`,
          { type: imageFile.type }
        );
        fd.append("image", newFile);
      }

      if (selectedLeader) {
        await updateLeader(selectedLeader.ID, fd);
        toast({ title: "Success", description: "Leader updated successfully" });
      } else {
        await addLeader(fd);
        toast({ title: "Success", description: "Leader added successfully" });
      }

      setFormData({ Name: "", Title: titleOptions[0], contact: "" });
      setImageFile(null);
      setSelectedLeader(null);
      setIsDialogOpen(false);
      fetchLeaders();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleEdit = (leader: any) => {
    setSelectedLeader(leader);
    setFormData({
      Name: leader.Name || "",
      Title: titleOptions.includes(leader.Title) ? leader.Title : titleOptions[0],
      contact: leader.Contact || "",
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
    } finally { setLoading(false); }
  };

  const filtered = leaders.filter((leader) => {
    const matchesSearch =
      (leader.Name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (leader.Title?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesFilter = filterTitle === "all" || leader.Title === filterTitle;
    return matchesSearch && matchesFilter;
  });

  return (
    <AdminLayout>
      <div className="px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {leaderType || "Leader"} Management
          </h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                {selectedLeader ? "Edit Leader" : "Add New Leader"}
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl">
              <DialogHeader>
                <DialogTitle>{selectedLeader ? "Edit Leader" : "Add New Leader"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} required />
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Select value={formData.Title} onValueChange={(value) => setFormData({ ...formData, Title: value })}>
                    <SelectTrigger><SelectValue placeholder="Select a title" /></SelectTrigger>
                    <SelectContent>
                      {titleOptions.map((title) => <SelectItem key={title} value={title}>{title}</SelectItem>)}
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

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterTitle} onValueChange={setFilterTitle}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Filter by title" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Titles</SelectItem>
                {titleOptions.map((title) => <SelectItem key={title} value={title}>{title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Leaders Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((leader) => (
            <Card key={leader.ID} className="hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden">
              <CardHeader className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img
                    src={leader.Image ? `${API_BASE}/${leader.Image.replace(/\\/g, "/")}` : "/placeholder-image.jpg"}
                    alt={leader.Name || "Leader"}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border"
                    onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
                  />
                  <div>
                    <CardTitle className="text-base sm:text-lg">{leader.Name || "Unnamed Leader"}</CardTitle>
                    <Badge className="text-xs sm:text-sm">{leader.Title || "No Title"}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(leader)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => { setSelectedLeader(leader); setDeleteDialogOpen(true); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
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
