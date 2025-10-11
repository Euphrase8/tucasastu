import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mountain, Calendar, MapPin, Users, Clock, Star, ArrowRight } from 'lucide-react';

const Summit = () => {
  const summitHighlights = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "500+ Participants",
      description: "Students from over 50 universities across Tanzania"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "3-Day Experience",
      description: "Intensive spiritual and leadership development program"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "International Speakers",
      description: "Renowned spiritual leaders and youth mentors"
    },
    {
      icon: <Mountain className="w-6 h-6" />,
      title: "Life Transformation",
      description: "Testimonies of changed lives and renewed faith"
    }
  ];

  const schedule = [
    {
      day: "Friday",
      date: "July 25, 2025",
      events: [
        { time: "9:00 AM", title: "Registration & Welcome", speaker: "TUCASA Leadership" },
        { time: "11:00 AM", title: "Opening Ceremony", speaker: "Dr. Samuel Misiani" },
        { time: "2:00 PM", title: "Youth Leadership in Modern World", speaker: "Pastor John Bradshaw" },
        { time: "4:30 PM", title: "Breakout Sessions", speaker: "Various Leaders" },
        { time: "7:00 PM", title: "Evening Worship", speaker: "Pastor David Gates" }
      ]
    },
    {
      day: "Saturday",
      date: "July 26, 2025",
      events: [
        { time: "7:00 AM", title: "Morning Devotion", speaker: "Local Chaplains" },
        { time: "9:30 AM", title: "Sabbath School", speaker: "Dr. Clifford Goldstein" },
        { time: "11:00 AM", title: "Divine Service", speaker: "Pastor Ted Wilson" },
        { time: "3:00 PM", title: "Youth Panel Discussion", speaker: "TUCASA Alumni" },
        { time: "5:00 PM", title: "Community Service Planning", speaker: "Service Committee" },
        { time: "7:30 PM", title: "Cultural Night", speaker: "Regional Groups" }
      ]
    },
    {
      day: "Sunday",
      date: "July 27, 2025",
      events: [
        { time: "8:00 AM", title: "Morning Worship", speaker: "Pastor Mark Finley" },
        { time: "10:00 AM", title: "Mission Emphasis", speaker: "Dr. Gary Krause" },
        { time: "1:00 PM", title: "Networking Lunch", speaker: "All Participants" },
        { time: "3:00 PM", title: "Commitment & Baptism", speaker: "Regional Pastors" },
        { time: "5:00 PM", title: "Closing Ceremony", speaker: "TUCASA Executive" }
      ]
    }
  ];

  const speakers = [
    {
      name: "Pastor Ted Wilson",
      title: "General Conference President",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      topic: "Leading with Purpose"
    },
    {
      name: "Dr. Samuel Misiani",
      title: "East Central Africa Division President",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      topic: "Africa's Youth Vision"
    },
    {
      name: "Pastor John Bradshaw",
      title: "It Is Written Speaker/Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      topic: "Faith in Digital Age"
    },
    {
      name: "Pastor David Gates",
      title: "Mission Evangelist",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      topic: "Total Member Involvement"
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-divine-light py-20">
        <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Mountain className="w-4 h-4 mr-2" />
            TUCASA Summit 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Rise to the <span className="text-gradient-divine">Summit</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Join us for the most anticipated gathering of Adventist students in Tanzania. 
            Three days of spiritual transformation, leadership development, and lifelong connections.
          </p>
          
          {/* Event Details */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">July 25-27, 2025</div>
                <div className="text-sm text-muted-foreground">3 Days</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">Arusha, Tanzania</div>
                <div className="text-sm text-muted-foreground">Conference Center</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <Users className="h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-semibold">500+ Expected</div>
                <div className="text-sm text-muted-foreground">Students & Leaders</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Download Brochure
            </Button>
          </div>
        </div>

        {/* Summit Highlights */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Summit Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summitHighlights.map((highlight, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-divine transition-slow border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {highlight.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Speakers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Speakers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, index) => (
              <Card key={index} className="overflow-hidden shadow-card hover:shadow-divine transition-slow border-0 group">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-1">{speaker.name}</h3>
                  <p className="text-sm text-primary mb-2">{speaker.title}</p>
                  <p className="text-sm text-muted-foreground">{speaker.topic}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Summit Schedule</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {schedule.map((day, dayIndex) => (
              <Card key={dayIndex} className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-primary">{day.day}</h3>
                    <p className="text-sm text-muted-foreground">{day.date}</p>
                  </div>
                  <div className="space-y-4">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex space-x-3 pb-4 border-b border-border/50 last:border-0">
                        <div className="text-sm font-medium text-primary min-w-[70px]">
                          {event.time}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-1">{event.title}</div>
                          <div className="text-xs text-muted-foreground">{event.speaker}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registration CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 text-center">
          <Mountain className="h-16 w-16 mx-auto text-primary mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Rise to the Summit?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't miss this transformative experience. Register today and secure your place at 
            Tanzania's premier Adventist youth summit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              Register for Summit 2025
            </Button>
            <Button size="lg" variant="outline">
              Contact Organizers
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            Early bird registration ends March 31, 2025 • Limited spaces available
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Summit;