import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Check, School, MapPin, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    yearOfStudy: "",
    course: "",
    residence: "",
    baptized: "",
    homeChurch: "",
    emergencyContact: "",
    emergencyPhone: "",
    motivation: ""
  });

  const { toast } = useToast();

  const institutions = [
    "University of Dar es Salaam (UDSM)",
    "Mzumbe University",
    "Sokoine University of Agriculture (SUA)",
    "Ardhi University",
    "University of Dodoma (UDOM)",
    "Open University of Tanzania (OUT)",
    "Muhimbili University of Health and Allied Sciences (MUHAS)",
    "Nelson Mandela African Institution of Science and Technology",
    "State University of Zanzibar (SUZA)",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with your API
    console.log("Registration data:", formData);
    toast({
      title: "Registration Submitted!",
      description: "Your application has been received. You'll hear from us within 48 hours.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join <span className="bg-gradient-primary bg-clip-text text-transparent">TUCASA STU</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Become part of a community dedicated to spiritual growth, academic excellence, and mission service
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">Membership Registration Form</CardTitle>
                <p className="text-muted-foreground">
                  Please fill out all required fields to complete your TUCASA STU membership application
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <h3 className="text-xl font-semibold">Personal Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          value={formData.middleName}
                          onChange={(e) => handleChange("middleName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            className="pl-10"
                            placeholder="+255 XXX XXX XXX"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <h3 className="text-xl font-semibold">Academic Information</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution *</Label>
                        <Select value={formData.institution} onValueChange={(value) => handleChange("institution", value)}>
                          <SelectTrigger className="w-full">
                            <School className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select your institution" />
                          </SelectTrigger>
                          <SelectContent>
                            {institutions.map((institution) => (
                              <SelectItem key={institution} value={institution}>
                                {institution}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="yearOfStudy">Year of Study *</Label>
                          <Select value={formData.yearOfStudy} onValueChange={(value) => handleChange("yearOfStudy", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">First Year</SelectItem>
                              <SelectItem value="2">Second Year</SelectItem>
                              <SelectItem value="3">Third Year</SelectItem>
                              <SelectItem value="4">Fourth Year</SelectItem>
                              <SelectItem value="5">Fifth Year</SelectItem>
                              <SelectItem value="postgrad">Postgraduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course">Course/Program *</Label>
                          <Input
                            id="course"
                            placeholder="e.g. Computer Science, Medicine"
                            value={formData.course}
                            onChange={(e) => handleChange("course", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spiritual & Contact Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <h3 className="text-xl font-semibold">Spiritual & Contact Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="residence">Current Residence *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="residence"
                            className="pl-10"
                            placeholder="Area/Location"
                            value={formData.residence}
                            onChange={(e) => handleChange("residence", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="baptized">Baptism Status *</Label>
                        <Select value={formData.baptized} onValueChange={(value) => handleChange("baptized", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes, I am baptized</SelectItem>
                            <SelectItem value="no">Not yet baptized</SelectItem>
                            <SelectItem value="planning">Planning to be baptized</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="homeChurch">Home Church</Label>
                        <Input
                          id="homeChurch"
                          placeholder="Your local SDA church"
                          value={formData.homeChurch}
                          onChange={(e) => handleChange("homeChurch", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                        <Input
                          id="emergencyContact"
                          placeholder="Full name"
                          value={formData.emergencyContact}
                          onChange={(e) => handleChange("emergencyContact", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        placeholder="+255 XXX XXX XXX"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">4</span>
                      </div>
                      <h3 className="text-xl font-semibold">Why Join TUCASA STU?</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">
                        Tell us briefly why you want to join TUCASA STU and how you hope to contribute
                      </Label>
                      <Textarea
                        id="motivation"
                        className="min-h-[100px]"
                        placeholder="Share your motivation and goals..."
                        value={formData.motivation}
                        onChange={(e) => handleChange("motivation", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t">
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      <Check className="mr-2 h-5 w-5" />
                      Submit Registration
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;