import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Plus, Edit, Trash2, Search, Image as ImageIcon, Calendar, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllMedia, createMedia, updateMedia, deleteMedia } from "@/services/media";

const ManageGallery = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: ""
  });

  useEffect(() => {
    fetchGallery();
    const interval = setInterval(fetchGallery, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchGallery = async () => {
    try {
      const data = await getAllMedia();
      setGalleryItems(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("date", formData.date);
      
      if (imageFiles) {
        Array.from(imageFiles).forEach((file) => {
          formDataToSend.append("images", file);
        });
      }

      await createMedia(formDataToSend);
      await fetchGallery();
      setIsAddDialogOpen(false);
      setFormData({ title: "", category: "", date: "" });
      setImageFiles(null);
      toast({ title: "Success", description: "Photo added successfully" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to add photo",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("date", formData.date);
      
      if (imageFiles) {
        Array.from(imageFiles).forEach((file) => {
          formDataToSend.append("images", file);
        });
      }

      await updateMedia(selectedItem._id, formDataToSend);
      await fetchGallery();
      setIsEditDialogOpen(false);
      setImageFiles(null);
      toast({ title: "Success", description: "Photo updated successfully" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to update photo",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMedia(selectedItem._id);
      await fetchGallery();
      setDeleteDialogOpen(false);
      toast({ title: "Success", description: "Photo deleted successfully" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.response?.data?.message || "Failed to delete photo",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (item: any) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      date: item.date ? item.date.split('T')[0] : ""
    });
    setImageFiles(null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: any) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const filteredItems = galleryItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gallery Management
            </h1>
            <p className="text-muted-foreground">Upload and manage photo gallery</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Photo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Photo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="spiritual">Spiritual</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Images (can select multiple)</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={(e) => setImageFiles(e.target.files)}
                    />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button onClick={handleAdd} className="w-full" disabled={loading}>
                  {loading ? "Adding..." : "Add Photo"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item._id}>
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.images?.[0] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622"} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.date || item.createdAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openDeleteDialog(item)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="spiritual">Spiritual</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Images (leave empty to keep current)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={(e) => setImageFiles(e.target.files)}
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Button onClick={handleEdit} className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Photo"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          title="Delete Photo"
          description="Are you sure you want to delete this photo? This action cannot be undone."
          confirmText="Delete"
        />
      </div>
    </AdminLayout>
  );
};

export default ManageGallery;
