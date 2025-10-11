import React from 'react';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold text-gold-foreground">
                <span className="text-xl font-bold">T</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">TUCASA STU</h3>
                <p className="text-sm text-primary-foreground/80">Living the Mission</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              Tanzania Universities & Colleges Adventist Students' Association - 
              Southern Tanzania Union, empowering faith-based education across Tanzania.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/tucasastu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-gold transition-smooth group"
              >
                <Instagram className="w-5 h-5 group-hover:text-gold-foreground" />
              </a>
              <a 
                href="#facebook" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-gold transition-smooth group"
              >
                <Facebook className="w-5 h-5 group-hover:text-gold-foreground" />
              </a>
              <a 
                href="#youtube" 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-gold transition-smooth group"
              >
                <Youtube className="w-5 h-5 group-hover:text-gold-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">About TUCASA</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-gold transition-smooth">
                  Our Mission & Vision
                </a>
              </li>
              <li>
                <a href="#leadership" className="text-primary-foreground/80 hover:text-gold transition-smooth">
                  Leadership Team
                </a>
              </li>
              <li>
                <a href="#background" className="text-primary-foreground/80 hover:text-gold transition-smooth">
                  History & Background
                </a>
              </li>
              <li>
                <a href="#branches" className="text-primary-foreground/80 hover:text-gold transition-smooth">
                  University Branches
                </a>
              </li>
              <li>
                <a href="#partnerships" className="text-primary-foreground/80 hover:text-gold transition-smooth">
                  Partnerships
                </a>
              </li>
            </ul>
          </div>

          {/* Programs & Services */}
          <div>
            <h4 className="font-semibold mb-6">Programs & Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#events" className="text-primary-foreground/80 hover:text-gold transition-smooth">
                  Events & Conventions
                </a>
              </li>
              <li>
                <a href="#tims" className="text-primary-foreground/80 hover:text-gold transition-smooth flex items-center">
                  TIMS Portal
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#training" className="text-primary-foreground/80 hover:text-gold transition-smooth">
                  Leadership Training
                </a>
              </li>
              <li>
                <a href="#evangelism" className="text-primary-foreground/80 hover:text-gold transition-smooth">
                  Evangelistic Campaigns
                </a>
              </li>
              <li>
                <a href="#store" className="text-primary-foreground/80 hover:text-gold transition-smooth flex items-center">
                  Online Store
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-6">Contact Information</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 mt-1 text-gold shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">Email</p>
                  <a 
                    href="mailto:tucasastu@gmail.com" 
                    className="hover:text-gold transition-smooth"
                  >
                    tucasastu@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-1 text-gold shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">Phone</p>
                  <a 
                    href="tel:+255673037399" 
                    className="hover:text-gold transition-smooth block"
                  >
                    +255 673 037 399
                  </a>
                  <a 
                    href="tel:+255714163300" 
                    className="hover:text-gold transition-smooth"
                  >
                    +255 714 163 300
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-gold shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">Location</p>
                  <p>Southern Tanzania Union</p>
                  <p>Mbeya, Tanzania</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />

      {/* Bottom Footer */}
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/80">
            <p>
              © {currentYear} TUCASA STU. All rights reserved. 
              <span className="inline-flex items-center ml-2">
                Made with <Heart className="w-4 h-4 mx-1 text-gold" /> for Adventist students.
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#privacy" className="text-primary-foreground/80 hover:text-gold transition-smooth">
              Privacy Policy
            </a>
            <a href="#terms" className="text-primary-foreground/80 hover:text-gold transition-smooth">
              Terms of Use
            </a>
            <a href="#sitemap" className="text-primary-foreground/80 hover:text-gold transition-smooth">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;