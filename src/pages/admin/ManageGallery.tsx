// src/pages/admin/ManageGallery.tsx
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Plus, Edit, Trash2, Search, Filter, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllMedia, updateMedia } from "@/services/media";
import { GalleryForm } from "@/components/admin/GalleryForm";

const BASE_URL = "https://api.tucasastu.com";

const ManageGallery = () => {
  const { toast } = useToast();

  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState({ event_title: "", Description: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Modal & Delete Image State
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [imageToDelete, setImageToDelete] = useState<{ id: number; path: string } | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const data = await getAllMedia();
      setGalleryItems(Array.isArray(data) ? data : data?.media || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch gallery items.",
        variant: "destructive",
      });
    }
  };

  // --- ADD MEDIA ---
  const handleAdd = async () => {
    if (!formData.event_title || !imageFiles?.length) {
      toast({
        title: "Missing Info",
        description: "Event title and at least one media file are required.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("event_title", formData.event_title);
      if (formData.Description) fd.append("description", formData.Description);
      Array.from(imageFiles).forEach((f) => fd.append("media_files", f));

      const token = localStorage.getItem("token");
      const res = await fetch("/api/media/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error((await res.json()).message || "Failed");
      await res.json();

      toast({ title: "Success", description: "Media added!" });
      setFormData({ event_title: "", Description: "" });
      setImageFiles(null);
      setIsAddDialogOpen(false);
      fetchGallery();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // --- EDIT MEDIA ---
  const openEdit = (item: any) => {
    setSelectedItem(item);
    setFormData({
      event_title: item.event_title || "",
      Description: item.Description || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleEdit = async () => {
    if (!selectedItem) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("event_title", formData.event_title);
      if (formData.Description) fd.append("description", formData.Description);
      if (imageFiles)
        Array.from(imageFiles).forEach((f) => fd.append("media_files", f));

      await updateMedia(selectedItem.ID, fd);
      toast({ title: "Updated", description: "Media updated!" });
      setIsEditDialogOpen(false);
      fetchGallery();
      setCollectionModalOpen(false);
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.response?.data?.message || "Failed to update.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE SINGLE IMAGE FROM COLLECTION ---
  const handleDeleteImage = async () => {
    if (!imageToDelete || !selectedCollection) return;

    try {
      const currentFiles: string[] = JSON.parse(selectedCollection.MediaFiles || "[]");
      const updatedFiles = currentFiles.filter((f: string) => !f.includes(imageToDelete.path));

      const fd = new FormData();
      fd.append("event_title", selectedCollection.event_title);
      if (selectedCollection.Description) fd.append("description", selectedCollection.Description);
      // Send only remaining files
      updatedFiles.forEach((f) => fd.append("media_files", f));

      await updateMedia(selectedCollection.ID, fd);
      toast({ title: "Deleted", description: "Image removed permanently." });

      // FULL REFRESH – NO CACHED IMAGE
      await fetchGallery();
      setCollectionModalOpen(false); // Close modal
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete image.", variant: "destructive" });
    } finally {
      setDeleteDialogOpen(false);
      setImageToDelete(null);
    }
  };

  // --- DELETE ENTIRE COLLECTION ---
  const handleDeleteCollection = async () => {
    if (!selectedItem) return;
    try {
      const res = await fetch(`/api/media/${selectedItem.ID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Deleted", description: "Collection deleted." });
      await fetchGallery();
      setCollectionModalOpen(false);
    } catch {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const getImageUrls = (item: any): { url: string; path: string }[] => {
    const raw = item.MediaFiles || item.media_files;
    if (!raw) return [];

    let files: string[] = [];
    if (typeof raw === "string") {
      try {
        files = JSON.parse(raw);
      } catch {
        files = [raw];
      }
    } else if (Array.isArray(raw)) {
      files = raw;
    }

    return files.map((p: string) => ({
      url: `${BASE_URL}${p.startsWith("/") ? p : `/${p}`}`,
      path: p.startsWith("/") ? p : `/${p}`,
    }));
  };

  const filteredItems = Array.isArray(galleryItems)
    ? galleryItems.filter((item) => {
        const matchesSearch = (item?.event_title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          filterCategory === "all" || item.category === filterCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

  const openCollectionModal = (item: any) => {
    setSelectedCollection(item);
    setCollectionModalOpen(true);
  };

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
              <DialogHeader>
                <DialogTitle>Add New Media</DialogTitle>
              </DialogHeader>
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
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={filterCategory}
              placeholder="Filter category"
              onChange={(e) => setFilterCategory(e.target.value)}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const images = getImageUrls(item);
            const hasMultiple = images.length > 1;

            return (
              <Card
                key={item.ID}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-200 max-w-md mx-auto"
                onClick={() => hasMultiple && openCollectionModal(item)}
              >
                {images.length > 0 ? (
                  <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden flex items-center justify-center bg-gray-100">
                    <img
                      src={images[0].url}
                      alt={item.event_title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                <CardContent className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold">{item.event_title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.Description || "No description"}
                  </p>

                  <div className="flex justify-end gap-2 pt-2">
                    {hasMultiple && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCollectionModal(item);
                        }}
                      >
                        View Collection
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(item);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                        setDeleteDialogOpen(true);
                      }}
                    >
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
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
          </DialogHeader>
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
        onOpenChange={setDeleteDialogOpen}
        onConfirm={imageToDelete ? handleDeleteImage : handleDeleteCollection}
        title={imageToDelete ? "Delete Image" : "Delete Collection"}
        description={
          imageToDelete
            ? "This image will be permanently removed from the collection."
            : "This entire collection will be deleted."
        }
      />

      {/* COLLECTION MODAL */}
      <Dialog open={collectionModalOpen} onOpenChange={setCollectionModalOpen}>
        <DialogContent
          className="max-w-full w-[95vw] h-[90vh] p-0 bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ maxWidth: "1400px" }}
        >
          {/* Header */}
          <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div className="max-w-3xl">
                <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {selectedCollection?.event_title}
                </DialogTitle>
                {selectedCollection?.Description && (
                  <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
                    {selectedCollection.Description}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollectionModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </DialogHeader>

          {/* Image Grid */}
          <div className="p-4 md:p-6">
            <div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-fr"
              style={{ height: "calc(90vh - 160px)" }}
            >
              {selectedCollection &&
                getImageUrls(selectedCollection).map((img, idx) => (
                  <div
                    key={img.path} // Use path as key to avoid duplicates
                    className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="flex-1 p-2 flex items-center justify-center bg-gray-50">
                      <img
                        src={img.url}
                        alt={`${selectedCollection.event_title} - ${idx + 1}`}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>

                    <div className="p-2 flex gap-1 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(selectedCollection);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageToDelete({ id: selectedCollection.ID, path: img.path });
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageGallery;