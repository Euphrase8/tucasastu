import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

// Material UI Icons
import SpiritualIcon from '@mui/icons-material/EmojiPeople';
import LeadershipIcon from '@mui/icons-material/Groups'; 
import SportsIcon from '@mui/icons-material/SportsSoccer'; 
import AcademicIcon from '@mui/icons-material/School'; 

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "National TUCASA Convention 2024",
      date: "December 15-18, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "University of Dar es Salaam",
      type: "Convention",
      description: "Join hundreds of Adventist students from across Tanzania for worship, fellowship, and spiritual growth.",
      attendees: "500+",
      status: "Registration Open"
    },
    {
      id: 2,
      title: "Mbeya Zone Federation Baptism",
      date: "November 30, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Lake Nyasa, Mbeya",
      type: "Baptism",
      description: "A sacred ceremony welcoming new believers into the Adventist family.",
      attendees: "150+",
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Leadership Training Workshop",
      date: "December 2, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "Arusha University Campus",
      type: "Training",
      description: "Empowering the next generation of TUCASA leaders with essential skills.",
      attendees: "80",
      status: "Limited Spots"
    }
  ];

  const pastEvents = [
    {
      title: "Ruvuma Zone Evangelistic Campaign",
      date: "October 2024",
      impact: "200+ baptisms, 15 new branches established"
    },
    {
      title: "Annual TUCASA Sports Festival",
      date: "September 2024", 
      impact: "30 universities participated, strengthened inter-branch unity"
    },
    {
      title: "Southern Tanzania Union Youth Convention",
      date: "August 2024",
      impact: "1,000+ youth gathered for worship and fellowship"
    }
  ];

  const categories = [
    {
      title: "Spiritual Programs",
      description: "Prayer weeks, evangelistic campaigns, baptisms",
      icon: <SpiritualIcon className="text-4xl mb-4 mx-auto text-primary" />,
      count: "12+ annually"
    },
    {
      title: "Leadership Training",
      description: "Workshops, seminars, skill development",
      icon: <LeadershipIcon className="text-4xl mb-4 mx-auto text-primary" />,
      count: "8+ sessions"
    },
    {
      title: "Sports & Recreation",
      description: "Inter-university competitions, fun activities",
      icon: <SportsIcon className="text-4xl mb-4 mx-auto text-primary" />,
      count: "6+ tournaments"
    },
    {
      title: "Academic Excellence",
      description: "Study groups, career guidance, scholarships",
      icon: <AcademicIcon className="text-4xl mb-4 mx-auto text-primary" />,
      count: "Year-round"
    }
  ];

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Events & Programs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connecting Hearts, Transforming Lives
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the power of fellowship through our inspiring events, from spiritual conventions 
            to leadership training and community outreach programs.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8">Upcoming Events</h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="shadow-card hover:shadow-divine transition-slow group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={`${
                        event.type === 'Convention' ? 'bg-primary/10 text-primary' :
                        event.type === 'Baptism' ? 'bg-gold/10 text-gold' :
                        'bg-accent/10 text-accent'
                      }`}
                    >
                      {event.type}
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className={`${
                        event.status === 'Registration Open' ? 'bg-green-100 text-green-800' :
                        event.status === 'Limited Spots' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      {event.attendees} Expected
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Register Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Event Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8">Event Categories</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-soft transition-smooth group">
                <CardContent className="p-6">
                  {category.icon}
                  <h4 className="font-semibold mb-2">{category.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <Badge variant="outline" className="text-xs">{category.count}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Impact */}
        <div className="bg-divine-light rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-8 text-center">Recent Impact</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold mb-2">{event.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                <p className="text-sm text-primary font-medium">{event.impact}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Past Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
