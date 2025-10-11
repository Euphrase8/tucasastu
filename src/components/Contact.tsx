import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube,
  Send,
  Clock,
  Globe,
  Users,
  Calendar,
  BookOpen
} from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-divine-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Mail className="w-4 h-4 mr-2" />
            Contact Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect With TUCASA STU
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have questions? Need guidance? Want to get involved? We're here to help you 
            on your spiritual and academic journey. Reach out to us today!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  Phone Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">General Inquiries</p>
                  <a href="tel:+255673037399" className="text-primary hover:underline">
                    +255 673 037 399
                  </a>
                </div>
                <div>
                  <p className="font-medium">Leadership Office</p>
                  <a href="tel:+255714163300" className="text-primary hover:underline">
                    +255 714 163 300
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  Email Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Official Email</p>
                <a 
                  href="mailto:tucasastu@gmail.com" 
                  className="text-primary hover:underline font-medium"
                >
                  tucasastu@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Headquarters</p>
                <p>Southern Tanzania Union Conference</p>
                <p className="text-sm text-muted-foreground">Mbeya, Tanzania</p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>Sabbath Rest</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/tucasastu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-smooth"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="#facebook" 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-smooth"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="#youtube" 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-smooth"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-divine border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <p className="text-muted-foreground">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name *
                    </label>
                    <Input 
                      id="firstName" 
                      placeholder="Enter your first name"
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name *
                    </label>
                    <Input 
                      id="lastName" 
                      placeholder="Enter your last name"
                      className="bg-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email address"
                    className="bg-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="university" className="text-sm font-medium">
                    University/College
                  </label>
                  <Input 
                    id="university" 
                    placeholder="Your institution (if applicable)"
                    className="bg-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject *
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="What is this message about?"
                    className="bg-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <Textarea 
                    id="message" 
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="bg-white/50"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-accent">
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Clear Form
                  </Button>
                </div>

                <div className="bg-gold/10 rounded-lg p-4">
                  <p className="text-sm text-gold-foreground">
                    <strong>Response Time:</strong> We typically respond within 24-48 hours. 
                    For urgent matters, please call us directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Users className="w-6 h-6 text-primary" />
            <span>Join TUCASA</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Calendar className="w-6 h-6 text-primary" />
            <span>Event Registration</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span>TIMS Portal</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Globe className="w-6 h-6 text-primary" />
            <span>Online Store</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;