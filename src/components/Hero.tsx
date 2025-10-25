import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, Send, Link } from 'lucide-react';
import heroImage from '@/assets/hero-student.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="TUCASA STU - Adventist students across Tanzania"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 grid lg:grid-cols-2 gap-10 items-center py-10 sm:py-12 md:py-16 lg:py-20">
        {/* Left Content */}
        <div className="text-white">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium mb-10">
            <Users className="mr-2 h-4 w-4" />
            Tanzania Universities & Colleges Adventist Students' Association
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Living the Mission,{' '}
            <span className="text-gradient-divine">Reaching the Nation</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
            Join thousands of Adventist students across Tanzania as we unite in faith,
            education, and service. Together, we're building a community that transforms
            lives and spreads hope throughout our nation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-gold-foreground shadow-divine"
            >
              Join TUCASA Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold">50+</div>
              <div className="text-sm text-white/80">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold">5,000+</div>
              <div className="text-sm text-white/80">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold">25</div>
              <div className="text-sm text-white/80">Years Strong</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="hidden lg:block">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-divine">
            <h3 className="text-2xl font-bold text-primary mb-6">Quick Access</h3>

            <div className="space-y-4">
              {/* Upcoming Events */}
              <a
                href="#events"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth group"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">Upcoming Events</div>
                    <div className="text-sm text-muted-foreground">
                      View all programs
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-smooth" />
              </a>

              {/* Summit Link (replaces Find Branch) */}
              <a
                href="https://summit.tucasastu.com/"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth group"
              >
                <div className="flex items-center space-x-3">
                  <Send className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">Join Summit</div>
                    <div className="text-sm text-muted-foreground">
                      View summit details
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-smooth" />
              </a>

              {/* TIMS Registration */}
              <a
                href="https://tims.tucasastu.com/register/"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth group"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">TIMS Registration</div>
                    <div className="text-sm text-muted-foreground">Member portal</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-smooth" />
              </a>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button className="w-full bg-gradient-to-r from-primary to-accent">
                <a href="/leaders">
                  Contact Leadership

                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-1 h-10 bg-white/30 rounded-full mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;