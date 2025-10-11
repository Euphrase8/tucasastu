import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Mail, Phone, MapPin, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Leaders = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const leadersRef = useRef<HTMLDivElement | null>(null);
  const [shouldFetchLeaders, setShouldFetchLeaders] = useState(false);

  // Fetch leaders API
  useEffect(() => {
    if (!shouldFetchLeaders) return;

    const fetchLeaders = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('https://api.tucasastu.com/api/chaplaincy-leaders');
        if (!response.ok) throw new Error('Failed to fetch leaders');
        const result = await response.json();
        setLeaders(result || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load leaders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, [shouldFetchLeaders]);

  // Intersection observer to lazy-load leaders when section is in view
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setShouldFetchLeaders(true);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (leadersRef.current) observer.observe(leadersRef.current);

    return () => {
      if (leadersRef.current) observer.unobserve(leadersRef.current);
    };
  }, []);

  // Filter leaders by level
  const filteredLeaders = activeFilter === 'all' 
    ? leaders 
    : leaders.filter((leader) => leader.Level?.toLowerCase() === activeFilter);

  const filterCategories = [
    { id: 'all', label: 'All Leaders', count: leaders.length },
    { id: 'national', label: 'National', count: leaders.filter(l => l.Level?.toLowerCase() === 'national').length },
    { id: 'chaplain', label: 'Chaplains', count: leaders.filter(l => l.Level?.toLowerCase() === 'chaplain').length },
    { id: 'zonal', label: 'Zonal', count: leaders.filter(l => l.Level?.toLowerCase() === 'zonal').length },
    { id: 'federation', label: 'Federation', count: leaders.filter(l => l.Level?.toLowerCase() === 'federation').length },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-divine-light py-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              Leadership Directory
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-gradient-divine">Leaders</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dedicated servants committed to advancing TUCASA STU's mission across Tanzania.
            </p>
          </div>

          {/* Search & Filter Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-12 shadow-card">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search leaders..." className="pl-10" />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter by level:</span>
              </div>
            </div>

            {/* Filter Categories */}
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category.id)}
                  className="transition-smooth"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">{category.count}</Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Leaders Grid */}
          <div ref={leadersRef} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-200/80 rounded-2xl p-6 h-72 skeleton"></div>
              ))
            ) : error ? (
              <p className="text-red-600 col-span-full text-center">{error}</p>
            ) : filteredLeaders.length === 0 ? (
              <p className="text-muted-foreground col-span-full text-center">No leaders found.</p>
            ) : (
              filteredLeaders.map((leader, index) => (
                <Card key={leader.ID || index} className="group overflow-hidden border-0 shadow-card hover:shadow-divine transition-all duration-300 animate-fade-in">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={leader.Image ? `https://api.tucasastu.com/${leader.Image}` : '/placeholder-image.jpg'}
                      alt={leader.Name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className={`bg-white/90 ${
                          leader.Level?.toLowerCase() === 'national' ? 'text-primary' :
                          leader.Level?.toLowerCase() === 'chaplain' ? 'text-gold' :
                          leader.Level?.toLowerCase() === 'zonal' ? 'text-accent' :
                          'text-muted-foreground'
                        }`}
                      >
                        {leader.Level}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{leader.Name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{leader.Title}</p>
                    <p className="text-sm text-muted-foreground mb-3">{leader.Institution}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {leader.Zone}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        {leader.Email}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        {leader.Contact}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-3 mb-4">{leader.Bio}</p>

                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Contact Leader
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaders;
