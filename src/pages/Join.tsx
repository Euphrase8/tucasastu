import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Heart, 
  BookOpen, 
  Globe, 
  Award, 
  CheckCircle,
  ArrowRight,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";

const Join = () => {
  const benefits = [
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow Adventist students across Tanzania and build lasting friendships."
    },
    {
      icon: Heart,
      title: "Spiritual Growth",
      description: "Deepen your faith through prayer meetings, Bible studies, and spiritual mentorship."
    },
    {
      icon: BookOpen,
      title: "Academic Support",
      description: "Access study groups, academic resources, and peer mentoring programs."
    },
    {
      icon: Globe,
      title: "Mission Opportunities",
      description: "Participate in evangelism, community service, and outreach programs."
    }
  ];

  const membershipLevels = [
    {
      title: "Active Member",
      description: "Full voting rights and leadership opportunities",
      requirements: [
        "Baptized Seventh-day Adventist",
        "Currently enrolled in university/college",
        "Attend regular meetings",
        "Participate in activities"
      ],
      color: "bg-blue-500"
    },
    {
      title: "Associate Member",
      description: "Participate in activities and programs",
      requirements: [
        "Interested in Adventist faith",
        "Currently enrolled in university/college",
        "Respect organization values",
        "Commit to participation"
      ],
      color: "bg-green-500"
    },
    {
      title: "Alumni Member",
      description: "Continue involvement after graduation",
      requirements: [
        "Former TUCASA STU member",
        "Completed university/college",
        "Maintain good standing",
        "Support current members"
      ],
      color: "bg-purple-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Fill Application",
      description: "Complete our online registration form with your personal and academic details."
    },
    {
      number: "02", 
      title: "Review Process",
      description: "Our leadership team reviews your application within 48 hours."
    },
    {
      number: "03",
      title: "Welcome & Orientation", 
      description: "Attend orientation session and receive your membership materials."
    }
  ];

  const testimonials = [
    {
      name: "Grace Mwanga",
      institution: "UDSM",
      quote: "TUCASA STU has been my spiritual home away from home. The fellowship and support I've received has been incredible.",
      year: "3rd Year Medical Student"
    },
    {
      name: "Daniel Kimaro",
      institution: "Mzumbe University", 
      quote: "Through TUCASA, I've grown not just academically but spiritually. The leadership opportunities have prepared me for life.",
      year: "4th Year Business Student"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Join Our <span className="bg-gradient-primary bg-clip-text text-transparent">Community</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Become part of a vibrant community of Adventist students committed to academic excellence, spiritual growth, and mission service across Tanzania
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                <Link to="/register">
                  Start Your Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Ask Questions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Join <span className="text-primary">TUCASA STU?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the benefits of being part of Tanzania's largest Adventist student organization
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Levels */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Membership <span className="text-primary">Levels</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the membership level that fits your current situation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {membershipLevels.map((level, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={`h-1 ${level.color}`}></div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                    <CardTitle className="text-xl">{level.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{level.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide">Requirements:</h4>
                    {level.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to <span className="text-primary">Join</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to become a TUCASA STU member
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">{step.number}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20 transform translate-x-8"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Member <span className="text-primary">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from current TUCASA STU members
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs">{testimonial.institution}</Badge>
                          <Badge variant="outline" className="text-xs">{testimonial.year}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-accent/10">
            <CardContent className="p-0 space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
                <p className="text-lg text-muted-foreground">
                  Take the first step towards an enriching university experience with TUCASA STU
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  <Link to="/register">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Complete Application
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Us First</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Join;