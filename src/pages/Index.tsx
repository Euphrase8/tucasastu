import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Announcements from '@/components/Announcements';
import About from '@/components/About';
import Leadership from '@/components/Leadership';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Announcements />
      <About />
      <Leadership />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
