import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface GalleryFormProps {
  formData: { event_title: string; Description: string };
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
    {/* Event Title */}
    <div className="space-y-2">
      <Label>Event Title</Label>
      <Input
        value={formData.event_title}
        onChange={(e) => setFormData({ ...formData, event_title: e.target.value })}
        required
      />
    </div>

    {/* Description */}
    <div className="space-y-2">
      <Label>Description (optional)</Label>
      <Input
        value={formData.Description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
    </div>

    {/* Media Files */}
    <div className="space-y-2">
      <Label>Media Files {isEdit ? "(optional)" : "*"}</Label>
      <Input
        type="file"
        accept="image/*,video/*,application/pdf"
        multiple
        onChange={(e) => setImageFiles(e.target.files)}
      />
      {imageFiles && imageFiles.length > 0 && (
        <p className="text-xs text-gray-500">{imageFiles.length} file(s) selected</p>
      )}
    </div>

    {/* Submit Button */}
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? (isEdit ? "Updating..." : "Adding...") : isEdit ? "Update" : "Add"}
    </Button>
  </form>
);
