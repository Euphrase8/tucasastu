import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Mail, Phone, ArrowRight } from 'lucide-react';
import { getLeaders } from '@/services/leaders';

const Leadership = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [chaplains, setChaplains] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const data = await getLeaders();
      setLeaders(data);

      // Filter chaplains from all leaders
      const filteredChaplains = data.filter((leader: any) =>
        leader.role.toLowerCase().includes('chaplain')
      );
      setChaplains(filteredChaplains);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {chaplains.map((chaplain, index) => (
              <Card
                key={index}
                className="group overflow-hidden shadow-card hover:shadow-divine transition-all duration-300 border-0 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {chaplain.image ? (
                    <img
                      src={chaplain.image}
                      alt={chaplain.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-semibold text-2xl">
                        {chaplain.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-gold/90 text-gold-foreground">
                      Chaplain
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {chaplain.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{chaplain.role}</p>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                    {chaplain.bio}
                  </p>
                  <div className="space-y-3 mb-6">
                    {chaplain.email && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-2 text-primary" />
                        {chaplain.email}
                      </div>
                    )}
                    {chaplain.phone && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        {chaplain.phone}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => window.location.href = `mailto:${chaplain.email}`}
                  >
                    Contact Chaplain
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Chaplain Uploaded</h3>
            <p className="text-muted-foreground">
              Currently, no chaplains are available. Please check back later.
            </p>
          </div>
        )}

        {/* View All Leaders Button */}
        {leaders.length > 0 && (
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-card">
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
        )}
      </div>
    </section>
  );
};

export default Leadership;
