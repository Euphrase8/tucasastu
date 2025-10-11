import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllBooks, uploadBooks, updateBooks } from "@/services/books";

const ManageBook = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentBook, setCurrentBook] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    year: new Date().getFullYear().toString()
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const books = await getAllBooks();
      if (books.length > 0) {
        const book = books[0];
        setCurrentBook(book);
        setFormData({
          title: book.title,
          author: book.author || "",
          description: book.description || "",
          year: book.year || new Date().getFullYear().toString()
        });
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("year", formData.year);
      
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }
      if (pdfFile) {
        formDataToSend.append("reading_plan", pdfFile);
      }

      if (currentBook) {
        await updateBooks(currentBook._id, formDataToSend);
        toast({ title: "Success", description: "Book updated successfully" });
      } else {
        await uploadBooks(formDataToSend);
        toast({ title: "Success", description: "Book uploaded successfully" });
      }
      
      await fetchBooks();
      setImageFile(null);
      setPdfFile(null);
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

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Book of the Year Management
          </h1>
          <p className="text-muted-foreground">Update the featured book and upload PDF</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Book Title</Label>
                  <Input 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input 
                    value={formData.author} 
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input 
                    value={formData.year} 
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {currentBook?.image && !imageFile && (
                    <p className="text-xs text-muted-foreground">Current image will be kept if not changed</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Reading Plan PDF</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {currentBook?.reading_plan && !pdfFile && (
                    <p className="text-xs text-muted-foreground">Current PDF will be kept if not changed</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Saving..." : (currentBook ? "Update Book" : "Upload Book")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold mb-2">Preview</h3>
                <p className="text-sm text-muted-foreground">How it will appear on the website</p>
              </div>

              <div className="bg-divine-light rounded-lg p-6">
                <div className="max-w-sm mx-auto">
                  <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-xl mb-6 bg-gray-200 flex items-center justify-center">
                    {(imageFile || currentBook?.image) ? (
                      <img 
                        src={imageFile ? URL.createObjectURL(imageFile) : currentBook.image} 
                        alt={formData.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Book of the Year {formData.year}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{formData.title || "Book Title"}</h2>
                    <p className="text-lg text-muted-foreground mb-4">{formData.author || "Author Name"}</p>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-4">{formData.description || "Book description will appear here..."}</p>
                    <Button className="w-full">Download PDF</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageBook;
