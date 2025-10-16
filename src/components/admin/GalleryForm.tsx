// src/components/admin/GalleryForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface GalleryFormProps {
  formData: { title: string; category: string; date: string };
  setFormData: (data: any) => void;
  imageFiles: FileList | null;
  setImageFiles: (files: FileList | null) => void;
  loading: boolean;
  onSubmit: () => void;
  isEdit?: boolean;
}

export const GalleryForm = ({
  formData,
  setFormData,
  imageFiles,
  setImageFiles,
  loading,
  onSubmit,
  isEdit = false,
}: GalleryFormProps) => (
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
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
    </div>

    <div className="space-y-2">
      <Label>Category</Label>
      <Select
        value={formData.category}
        onValueChange={(value) => setFormData({ ...formData, category: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
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
      <Input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
    </div>

    <div className="space-y-2">
      <Label>Images {isEdit ? "(optional)" : "*"}</Label>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImageFiles(e.target.files)}
      />
      {imageFiles && imageFiles.length > 0 && (
        <p className="text-xs text-gray-500">{imageFiles.length} file(s) selected</p>
      )}
    </div>

    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? (isEdit ? "Updating..." : "Adding...") : isEdit ? "Update" : "Add"}
    </Button>
  </form>
);
