import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Phone, ArrowRight } from 'lucide-react';

interface Leader {
  ID: number;
  Name: string;
  Title?: string;
  Image?: string;
  Contact?: string;
}

const Leadership: React.FC = () => {
  const [chaplains, setChaplains] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChaplains = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.tucasastu.com/api/chaplaincy-leaders');
        if (!response.ok) throw new Error('Failed to fetch chaplains');
        const data: Leader[] = await response.json();
        // Filter only chaplains
        setChaplains(data.filter((leader) => leader.Title?.toLowerCase() === 'chaplain'));
      } catch (error) {
        console.error('Error fetching chaplains:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChaplains();
  }, []);

  return (
    <section id="leadership" className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Spiritual Leadership
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Our <span className="text-gradient-divine">Chaplains</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our dedicated chaplains provide spiritual guidance, pastoral care, and ministerial support 
            to TUCASA STU members across all regions of Tanzania.
          </p>
        </div>

        {/* Chaplains Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading chaplains...</p>
        ) : chaplains.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {chaplains.map((chaplain, index) => (
              <Card
                key={chaplain.ID}
                className="group overflow-hidden shadow-card hover:shadow-divine transition-all duration-300 border-0 animate-fade-in max-w-xs w-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-full h-64 overflow-hidden rounded-xl">
                  {chaplain.Image ? (
                    <img
                      src={`https://api.tucasastu.com/${chaplain.Image}`}
                      alt={chaplain.Name || 'Chaplain'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-semibold text-2xl">
                        {chaplain.Name?.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-gold/90 text-gold-foreground">
                      Chaplain
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {chaplain.Name}
                  </h3>
                  <p className="text-primary font-medium mb-3 text-sm">{chaplain.Title}</p>
                  {chaplain.Contact && (
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      {chaplain.Contact}
                    </div>
                  )}
                  {chaplain.Contact && (
                    <Button
                      variant="outline"
                      className="w-full text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => window.location.href = `tel:${chaplain.Contact}`}
                    >
                      Contact Chaplain
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Chaplain Uploaded</h3>
            <p className="text-muted-foreground">Currently, no chaplains are available. Please check back later.</p>
          </div>
        )}

        {/* View All Leaders Button */}
        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-card inline-block">
            <h3 className="text-2xl font-bold mb-4">Complete Leadership Directory</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Discover our full leadership team including national executives, zonal presidents, 
              federation leaders, and branch coordinators serving across Tanzania.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={() => window.location.href = '/leaders'}
            >
              View All Leaders
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
