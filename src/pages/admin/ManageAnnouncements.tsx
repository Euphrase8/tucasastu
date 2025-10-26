import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Plus, Edit, Trash2, Search, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  fetchAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/services/announcements";

const API_BASE = import.meta.env.VITE_BASE_URL || "https://api.tucasastu.com";

// ---------------- Announcement Form ----------------
interface AnnouncementFormProps {
  formData: any;
  setFormData: any;
  loading: boolean;
  onSubmit: () => void;
  isEdit?: boolean;
}
const AnnouncementForm = ({
  formData,
  setFormData,
  loading,
  onSubmit,
  isEdit = false,
}: AnnouncementFormProps) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    className="space-y-4"
  >
    <div className="space-y-2">
      <Label>Title</Label>
      <Input
        value={formData.Title}
        onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
        required
      />
    </div>

    <div className="space-y-2">
      <Label>Description</Label>
      <Textarea
        value={formData.Description}
        onChange={(e) =>
          setFormData({ ...formData, Description: e.target.value })
        }
        className="min-h-[100px]"
        required
      />
    </div>

    <div className="space-y-2">
      <Label>Image {isEdit ? "(optional)" : ""}</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFormData({ ...formData, Image: e.target.files?.[0] || null })
        }
      />
    </div>

    <div className="space-y-2">
      <Label>Attachment (PDF) {isEdit ? "(optional)" : ""}</Label>
      <Input
        type="file"
        accept="application/pdf"
        onChange={(e) =>
          setFormData({ ...formData, Attachment: e.target.files?.[0] || null })
        }
      />
    </div>

    <Button type="submit" className="w-full" disabled={loading}>
      {loading
        ? isEdit
          ? "Updating..."
          : "Creating..."
        : isEdit
        ? "Update Announcement"
        : "Add Announcement"}
    </Button>
  </form>
);

// ---------------- Manage Announcements ----------------
const ManageAnnouncements = () => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Image: null as File | string | null,
    Attachment: null as File | string | null,
  });

  useEffect(() => {
    fetchAllAnnouncements();
  }, []);

  // Fetch all announcements
  const fetchAllAnnouncements = async () => {
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch announcements",
        variant: "destructive",
      });
    }
  };

  // Create or update
  const handleFormSubmit = async (isEdit = false) => {
    if (!formData.Title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.Title);
      fd.append("description", formData.Description);
      if (formData.Image instanceof File) fd.append("image", formData.Image);
      if (formData.Attachment instanceof File)
        fd.append("attachment", formData.Attachment);

      if (isEdit && selectedAnnouncement) {
        await updateAnnouncement(selectedAnnouncement.ID, fd);
        toast({
          title: "Updated",
          description: "Announcement updated successfully",
        });
        setIsEditDialogOpen(false);
      } else {
        await createAnnouncement(fd);
        toast({
          title: "Created",
          description: "Announcement created successfully",
        });
        setIsAddDialogOpen(false);
      }

      setFormData({
        Title: "",
        Description: "",
        Image: null,
        Attachment: null,
      });
      await fetchAllAnnouncements();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!selectedAnnouncement) return;
    setLoading(true);
    try {
      await deleteAnnouncement(selectedAnnouncement.ID);
      toast({
        title: "Deleted",
        description: "Announcement deleted successfully",
      });
      setDeleteDialogOpen(false);
      await fetchAllAnnouncements();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to delete",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Open edit dialog
  const openEditDialog = (announcement: any) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      Title: announcement.Title || "",
      Description: announcement.Description || "",
      Image: announcement.Image || null,
      Attachment: announcement.Attachment || null,
    });
    setIsEditDialogOpen(true);
  };

  // Filtered search
  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMediaUrl = (path: string) => {
    if (!path) return "/placeholder-image.jpg";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const base = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
    return `${base}${cleanPath}`;
  };

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3e8391] to-[#2f557f] bg-clip-text text-transparent">
              Manage Announcements
            </h1>
            <p className="text-muted-foreground">
              Add, edit, and organize announcements
            </p>
          </div>

          {/* Add Announcement */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Announcement</DialogTitle>
              </DialogHeader>
              <AnnouncementForm
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                onSubmit={() => handleFormSubmit(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Announcements Grid */}
        {filteredAnnouncements.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAnnouncements.map((a) => (
              <Card
                key={a.ID}
                className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden max-w-md mx-auto"
              >
                {a.Image ? (
                  <div className="w-full h-64 sm:h-72 md:h-80 overflow-hidden flex items-center justify-center bg-gray-100">
                    <img
                      src={getMediaUrl(a.Image)}
                      alt={a.Title}
                      className="w-full h-full object-contain rounded-t-lg"
                      onError={(e) =>
                        (e.currentTarget.src = "/placeholder-image.jpg")
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-100 flex items-center justify-center text-gray-400 rounded-t-lg">
                    No Image
                  </div>
                )}

                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {a.Title}
                      </CardTitle>
                      <p className="text-sm text-gray-700 mt-1">
                        {a.Description}
                      </p>
                      {a.Attachment && (
                        <a
                          href={getMediaUrl(a.Attachment)}
                          target="_blank"
                          className="flex items-center text-blue-600 mt-2"
                        >
                          <FileText className="mr-1 h-4 w-4" /> View Attachment
                        </a>
                      )}
                      {a.CreatedAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(a.CreatedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(a)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAnnouncement(a);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No announcements found. Try adding a new one.
            </p>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
            </DialogHeader>
            <AnnouncementForm
              formData={formData}
              setFormData={setFormData}
              loading={loading}
              onSubmit={() => handleFormSubmit(true)}
              isEdit
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          title="Delete Announcement"
          description="Are you sure you want to delete this announcement? This action cannot be undone."
          confirmText="Delete"
        />
      </div>
    </AdminLayout>
  );
};

export default ManageAnnouncements;
