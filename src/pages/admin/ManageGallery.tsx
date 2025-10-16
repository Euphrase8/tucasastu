// src/pages/admin/ManageGallery.tsx
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllMedia, createMedia, updateMedia, deleteMedia } from "@/services/media";
import { GalleryForm } from "@/components/admin/GalleryForm";

const BASE_URL = "https://api.tucasastu.com";

const ManageGallery = () => {
  const { toast } = useToast();

  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState({ title: "", category: "", date: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const data = await getAllMedia();
      setGalleryItems(Array.isArray(data) ? data : data?.media || []);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch gallery items.", variant: "destructive" });
    }
  };

  const handleAdd = async () => {
    if (!formData.title || !imageFiles?.length) {
      toast({ title: "Missing Info", description: "Title and at least one image are required.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      fd.append("date", formData.date);
      Array.from(imageFiles).forEach((file) => fd.append("images", file));

      await createMedia(fd);
      toast({ title: "Success", description: "Media added successfully!" });
      setFormData({ title: "", category: "", date: "" });
      setImageFiles(null);
      setIsAddDialogOpen(false);
      fetchGallery();
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to add media.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (item: any) => {
    setSelectedItem(item);
    setFormData({ title: item.title || "", category: item.category || "", date: item.date || "" });
    setIsEditDialogOpen(true);
  };

  const handleEdit = async () => {
    if (!selectedItem) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      fd.append("date", formData.date);
      if (imageFiles) Array.from(imageFiles).forEach((file) => fd.append("images", file));

      await updateMedia(selectedItem.ID, fd);
      toast({ title: "Updated", description: "Media updated successfully!" });
      setIsEditDialogOpen(false);
      fetchGallery();
    } catch (err: any) {
      toast({ title: "Error", description: err.response?.data?.message || "Failed to update.", variant: "destructive" });
    } finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await deleteMedia(selectedItem.ID);
      toast({ title: "Deleted", description: "Media deleted successfully." });
      fetchGallery();
    } catch {
      toast({ title: "Error", description: "Failed to delete media.", variant: "destructive" });
    } finally { setDeleteDialogOpen(false); }
  };

  const getImageUrls = (item: any) => {
    const img = item.Image || item.images || item.MediaFiles;
    if (!img) return [];
    if (typeof img === "string") {
      try { const parsed = JSON.parse(img); return parsed.map((p: string) => `${BASE_URL}${p.startsWith("/") ? p : `/${p}`}`); } 
      catch { return [`${BASE_URL}${img.startsWith("/") ? img : `/${img}`}`]; }
    }
    if (Array.isArray(img)) return img.map((p) => `${BASE_URL}${p.startsWith("/") ? p : `/${p}`}`);
    return [];
  };

  const filteredItems = Array.isArray(galleryItems) ? galleryItems.filter((item) => {
    const matchesSearch = (item?.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3e8391] to-[#2f557f] bg-clip-text text-transparent">
            Manage Gallery
          </h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Media
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Media</DialogTitle></DialogHeader>
              <GalleryForm
                formData={formData}
                setFormData={setFormData}
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
                loading={loading}
                onSubmit={handleAdd}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Input type="text" value={filterCategory} placeholder="Filter category" onChange={(e) => setFilterCategory(e.target.value)} />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const images = getImageUrls(item);
            return (
              <Card key={item.ID} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {images.length > 0 ? (
                  <div className="w-full h-56 overflow-hidden">
                    <img src={images[0]} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                )}
                <CardContent className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{item.category || "Uncategorized"}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={() => { openEdit(item); }}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => { setSelectedItem(item); setDeleteDialogOpen(true); }}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Media</DialogTitle></DialogHeader>
          <GalleryForm
            formData={formData}
            setFormData={setFormData}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            loading={loading}
            onSubmit={handleEdit}
            isEdit
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Media"
        description="Are you sure you want to delete this media?"
      />
    </AdminLayout>
  );
};

export default ManageGallery;
