import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Search, Filter, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Mock gallery data - replace with actual image URLs
  const galleryItems = [
    { id: 1, title: "TUCASA National Conference 2024", category: "events", date: "2024-03-15", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop" },
    { id: 2, title: "Baptism Ceremony - Ruvuma Zone", category: "spiritual", date: "2024-02-20", image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop" },
    { id: 3, title: "Leadership Training Workshop", category: "training", date: "2024-01-10", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
    { id: 4, title: "Community Service - Dar es Salaam", category: "service", date: "2024-02-05", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop" },
    { id: 5, title: "Youth Evangelism Campaign", category: "evangelism", date: "2024-03-01", image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop" },
    { id: 6, title: "TUCASA Annual Sports Day", category: "events", date: "2023-12-15", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop" },
    { id: 7, title: "Bible Study Fellowship", category: "spiritual", date: "2024-01-20", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop" },
    { id: 8, title: "Medical Mission Outreach", category: "service", date: "2024-02-28", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop" },
    { id: 9, title: "New Students Orientation", category: "training", date: "2024-01-05", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop" },
  ];

  const categories = [
    { id: 'all', label: 'All Photos', count: galleryItems.length },
    { id: 'events', label: 'Events', count: galleryItems.filter(item => item.category === 'events').length },
    { id: 'spiritual', label: 'Spiritual', count: galleryItems.filter(item => item.category === 'spiritual').length },
    { id: 'service', label: 'Service', count: galleryItems.filter(item => item.category === 'service').length },
    { id: 'training', label: 'Training', count: galleryItems.filter(item => item.category === 'training').length },
    { id: 'evangelism', label: 'Evangelism', count: galleryItems.filter(item => item.category === 'evangelism').length },
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-divine-light py-20">
        <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Camera className="w-4 h-4 mr-2" />
            Photo Gallery
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Capturing Our <span className="text-gradient-divine">Journey</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the moments that define our community - from spiritual gatherings to community service, 
            leadership training, and fellowship activities across Tanzania.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-12 shadow-card">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search photos..." className="pl-10" />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by:</span>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category.id)}
                className="transition-smooth"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card key={item.id} className="group overflow-hidden border-0 shadow-card hover:shadow-divine transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="hover-scale">
            Load More Photos
          </Button>
        </div>

        {/* Upload Section for Admins */}
        <div className="mt-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
          <Camera className="h-12 w-12 mx-auto text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-4">Share Your TUCASA Moments</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have photos from TUCASA events or activities? Help us build our community gallery by sharing your captures.
          </p>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            Submit Photos
          </Button>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;