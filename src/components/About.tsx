import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, BookOpen, Users, Target, Globe, Star } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-divine-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Heart className="w-4 h-4 mr-2" />
            About TUCASA STU
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Empowering Faith-Based Education Across Tanzania
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            For over two decades, TUCASA STU has been the cornerstone of Adventist student life 
            in Tanzania's higher education institutions, fostering spiritual growth, academic excellence, 
            and community service.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-card hover:shadow-divine transition-slow border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To unite, inspire, and empower Adventist students across Tanzania's universities 
                and colleges through spiritual growth, academic excellence, community service, 
                and evangelistic outreach, preparing them to be transformative leaders in their 
                communities and professions.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-divine transition-slow border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gold text-gold-foreground flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading faith-based student association in East Africa, nurturing 
                a generation of Adventist professionals who exemplify Christ-like character, 
                academic excellence, and dedicated service to God and humanity throughout 
                Tanzania and beyond.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Faith & Spirituality",
                description: "Deepening our relationship with God through prayer, worship, and Bible study."
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Academic Excellence",
                description: "Pursuing the highest standards in education while maintaining Christian values."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Community Service",
                description: "Serving others with love and dedication, making positive impacts in our communities."
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "Leadership Development",
                description: "Nurturing Christ-centered leaders who inspire positive change."
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Cultural Unity",
                description: "Celebrating diversity while fostering unity among students from all backgrounds."
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Mission Focus",
                description: "Living out our calling to share God's love and reach every person in Tanzania."
              }
            ].map((value, index) => (
              <Card key={index} className="shadow-card hover:shadow-soft transition-smooth border-0 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 group-hover:text-gold transition-smooth">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* History Timeline */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-card">
          <h3 className="text-2xl font-bold text-center mb-8">Our Journey</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1999
              </div>
              <h4 className="font-semibold mb-2">Foundation</h4>
              <p className="text-sm text-muted-foreground">
                TUCASA STU was established to unite Adventist students across Tanzania's growing higher education sector.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold text-gold-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2010
              </div>
              <h4 className="font-semibold mb-2">Expansion</h4>
              <p className="text-sm text-muted-foreground">
                Expanded to over 30 universities and colleges with structured regional federations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2024
              </div>
              <h4 className="font-semibold mb-2">Digital Era</h4>
              <p className="text-sm text-muted-foreground">
                Launched TIMS platform and modernized operations to serve over 5,000 active members.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;