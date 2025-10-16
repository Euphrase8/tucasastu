import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Upload, FileText, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllBooks, uploadBooks, updateBooks, deleteBooks } from "@/services/books";

const ManageBook = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear().toString()
  });
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const data = await getAllBooks();
      if (data.length > 0) {
        const firstBook = data[0];
        setBook(firstBook);
        setFormData({
          title: firstBook.Title,
          description: firstBook.Description || "",
          year: new Date(firstBook.CreatedAt).getFullYear().toString()
        });
        setEditMode(true);
      } else {
        setBook(null);
        setFormData({
          title: "",
          description: "",
          year: new Date().getFullYear().toString()
        });
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      toast({ title: "Error", description: "Failed to fetch book", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast({ title: "Error", description: "Book title is required", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const sendData = new FormData();
      sendData.append("title", formData.title);
      sendData.append("description", formData.description);
      sendData.append("year", formData.year);
      if (imageFile) sendData.append("image", imageFile);
      if (pdfFile) sendData.append("reading_plan", pdfFile);

      if (editMode && book) {
        await updateBooks(book.ID, sendData);
        toast({ title: "Success", description: "Book updated successfully" });
      } else {
        await uploadBooks(sendData);
        toast({ title: "Success", description: "Book uploaded successfully" });
      }

      setImageFile(null);
      setPdfFile(null);
      await fetchBook();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save book",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => setDeleteConfirm(true);

  const handleDelete = async () => {
    if (!book) return;

    setLoading(true);
    try {
      await deleteBooks(book.ID);
      toast({ title: "Success", description: "Book deleted successfully" });
      setBook(null);
      setFormData({
        title: "",
        description: "",
        year: new Date().getFullYear().toString()
      });
      setImageFile(null);
      setPdfFile(null);
      setEditMode(false);
      setDeleteConfirm(false);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to delete book", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const getMediaUrl = (file: string | null) => {
    if (!file) return "/placeholder-image.jpg";
    return file.startsWith("http") ? file : `${import.meta.env.VITE_BASE_URL}/${file}`;
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 space-y-8 relative">
        {/* Header (NEW) */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-8 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3e8391] to-[#2f557f] bg-clip-text text-transparent">
              Book of the Year Management
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Update or add the featured book and upload PDF
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <Card className="lg:col-span-1">
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Book Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {book?.Image && !imageFile && (
                    <p className="text-xs text-muted-foreground">Current image will be kept if not changed</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Reading Plan PDF</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {book?.ReadingPlan && !pdfFile && (
                    <p className="text-xs text-muted-foreground">Current PDF will be kept if not changed</p>
                  )}
                </div>

                <Button type="submit" className="w-full mt-2" disabled={loading}>
                  {loading ? "Saving..." : editMode ? "Update Book" : "Upload Book"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <div className="lg:col-span-2 relative flex flex-col">
            <Card className="flex-1">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2">Preview</h3>
                  <p className="text-sm text-muted-foreground">How it will appear on the website</p>
                </div>

                <div className="w-full max-w-md mx-auto">
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-lg shadow-xl mb-4 bg-gray-200 flex items-center justify-center">
                    {(imageFile || book?.Image) ? (
                      <img 
                        src={imageFile ? URL.createObjectURL(imageFile) : getMediaUrl(book.Image)}
                        alt={formData.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-16 w-16 text-gray-400" />
                    )}
                  </div>

                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">{formData.title || "Book Title"}</h2>
                    <p className="text-xs text-muted-foreground line-clamp-3">{formData.description || "Book description here..."}</p>
                    {book?.ReadingPlan && (
                      <a
                        href={getMediaUrl(book.ReadingPlan)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        <FileText className="w-4 h-4" /> Download PDF
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>

              {/* CRUD Buttons */}
              {book && (
                <div className="flex justify-end gap-2 p-4 border-t">
                  <Button size="sm" onClick={() => setEditMode(true)} className="flex items-center gap-1">
                    <Pencil className="w-4 h-4" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={confirmDelete} className="flex items-center gap-1">
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full relative">
              <button className="absolute top-2 right-2" onClick={() => setDeleteConfirm(false)}>
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
              <p className="text-sm mb-6">Are you sure you want to delete this book? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setDeleteConfirm(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                  {loading ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageBook;
