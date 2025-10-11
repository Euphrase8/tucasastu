import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Plus, Edit, Trash2, Search, Filter, Award, Phone, Mail, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getLeaders, addLeader, updateLeader, deleteLeader } from "@/services/leaders";

const LEVEL_COLORS: Record<string, string> = {
  national: "bg-blue-500",
  regional: "bg-green-500",
  zonal: "bg-orange-500",
  branch: "bg-purple-500",
};

const ManageLeaders = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<any>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    level: "",
    institution: "",
    email: "",
    phone: "",
    location: "",
    tenure: "",
    bio: "",
  });

  useEffect(() => {
    fetchLeaders();
    const interval = setInterval(fetchLeaders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaders = async () => {
    try {
      const data = await getLeaders();
      setLeaders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (isEdit = false) => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => fd.append(key, value));
      if (imageFile) fd.append("image", imageFile);

      if (isEdit && selectedLeader) {
        await updateLeader(selectedLeader._id, fd);
        toast({ title: "Success", description: "Leader updated successfully" });
        setIsEditDialogOpen(false);
      } else {
        await addLeader(fd);
        toast({ title: "Success", description: "Leader added successfully" });
        setIsAddDialogOpen(false);
      }

      setFormData({
        name: "",
        role: "",
        level: "",
        institution: "",
        email: "",
        phone: "",
        location: "",
        tenure: "",
        bio: "",
      });
      setImageFile(null);
      await fetchLeaders();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedLeader) return;
    setLoading(true);
    try {
      await deleteLeader(selectedLeader._id);
      toast({ title: "Deleted", description: "Leader deleted successfully" });
      setDeleteDialogOpen(false);
      await fetchLeaders();
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

  const openEditDialog = (leader: any) => {
    setSelectedLeader(leader);
    setFormData({
      name: leader.name || "",
      role: leader.role || "",
      level: leader.level || "",
      institution: leader.institution || "",
      email: leader.email || "",
      phone: leader.phone || "",
      location: leader.location || "",
      tenure: leader.tenure || "",
      bio: leader.bio || "",
    });
    setImageFile(null);
    setIsEditDialogOpen(true);
  };

  const filteredLeaders = leaders.filter((l) => {
    const searchMatch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.role.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = filterLevel === "all" || l.level === filterLevel;
    return searchMatch && filterMatch;
  });

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Manage Leaders
            </h1>
            <p className="text-muted-foreground">Add, edit, and organize leadership structure</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Leader
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Leader</DialogTitle>
              </DialogHeader>
              <LeaderForm 
                formData={formData} 
                setFormData={setFormData} 
                imageFile={imageFile} 
                setImageFile={setImageFile} 
                loading={loading} 
                onSubmit={() => handleFormSubmit(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leaders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-full md:w-[200px] flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="regional">Regional</SelectItem>
                <SelectItem value="zonal">Zonal</SelectItem>
                <SelectItem value="branch">Branch</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Leaders Grid */}
        {filteredLeaders.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLeaders.map((leader) => (
              <Card key={leader._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {leader.image ? (
                        <img src={leader.image} alt={leader.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {leader.name.split(" ").map((n: string) => n[0]).join("")}
                          </span>
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{leader.name}</CardTitle>
                        <Badge className={`${LEVEL_COLORS[leader.level] || "bg-gray-500"} text-white border-none`}>
                          {leader.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(leader)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => { setSelectedLeader(leader); setDeleteDialogOpen(true); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {leader.institution && (
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-primary" />
                      <span>{leader.institution}</span>
                    </div>
                  )}
                  {leader.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="truncate">{leader.email}</span>
                    </div>
                  )}
                  {leader.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{leader.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Leaders Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Leader</DialogTitle>
            </DialogHeader>
            <LeaderForm 
              formData={formData} 
              setFormData={setFormData} 
              imageFile={imageFile} 
              setImageFile={setImageFile} 
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
          title="Delete Leader"
          description="Are you sure you want to delete this leader? This action cannot be undone."
          confirmText="Delete"
        />
      </div>
    </AdminLayout>
  );
};

export default ManageLeaders;

// Reusable Leader Form Component
interface LeaderFormProps {
  formData: any;
  setFormData: any;
  imageFile: File | null;
  setImageFile: any;
  loading: boolean;
  onSubmit: () => void;
  isEdit?: boolean;
}

const LeaderForm = ({ formData, setFormData, imageFile, setImageFile, loading, onSubmit, isEdit = false }: LeaderFormProps) => (
  <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required={!isEdit} />
      </div>
      <div className="space-y-2">
        <Label>Position/Role</Label>
        <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required={!isEdit} />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Leadership Level</Label>
        <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="national">National</SelectItem>
            <SelectItem value="regional">Regional</SelectItem>
            <SelectItem value="zonal">Zonal</SelectItem>
            <SelectItem value="branch">Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Institution</Label>
        <Input value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required={!isEdit} />
      </div>
      <div className="space-y-2">
        <Label>Phone</Label>
        <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      </div>
    </div>

    <div className="space-y-2">
      <Label>Profile Image {isEdit ? "(leave empty to keep current)" : ""}</Label>
      <div className="flex items-center gap-2">
        <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <Upload className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>

    <div className="space-y-2">
      <Label>Biography</Label>
      <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="min-h-[100px]" />
    </div>

    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? (isEdit ? "Updating..." : "Adding...") : isEdit ? "Update Leader" : "Add Leader"}
    </Button>
  </form>
);
