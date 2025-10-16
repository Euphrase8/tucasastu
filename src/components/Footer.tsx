import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { FaWhatsapp, FaTwitter } from "react-icons/fa";
import logo from "@/assets/tucasa.png"; // Updated logo import

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, url: "https://www.instagram.com/tucasastu/", label: "Instagram" },
    { icon: Facebook, url: "https://www.facebook.com/profile.php?id=100007626844444", label: "Facebook" },
    { icon: Youtube, url: "https://www.youtube.com/channel/UCXlIX--xWi5EkMOHEAondw?view_as=subscriber", label: "YouTube" },
    { icon: FaTwitter, url: "https://x.com/TUCASA_STU", label: "X" },
    { icon: FaWhatsapp, url: "https://api.whatsapp.com/send/?phone=255757344344", label: "WhatsApp" },
  ];

  const relatedLinks = [
    { name: "Seventh Day Adventist Church", url: "https://www.adventist.org/en/" },
    { name: "Southern Tanzania Union Mission", url: "https://www.stuadventist.org" },
    { name: "ADRA", url: "https://adra.org" },
    { name: "Hope Channel", url: "https://www.hopetv.org" },
    { name: "Adventist World Radio", url: "https://www.awr.org" },
    { name: "Public Campus Ministry", url: "https://www.pcm.adventist.org" },
    { name: "TUCASA Information Management System (TIMS)", url: "https://tims.tucasastu.com" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="TUCASA Logo" className="h-12 w-12 object-contain rounded-lg shadow-md" />
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
              {socialLinks.map(({ icon: Icon, url, label }, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-gold transition-all group"
                >
                  <Icon className="w-5 h-5 text-primary-foreground group-hover:text-gold-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* About TUCASA */}
          <div>
            <h4 className="font-semibold mb-6">About TUCASA</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Our Mission & Vision", href: "#about" },
                { name: "Leadership Team", href: "#leadership" },
                { name: "History & Background", href: "#background" },
                { name: "University Branches", href: "#branches" },
                { name: "Partnerships", href: "#partnerships" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-gold transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Links */}
          <div>
            <h4 className="font-semibold mb-6">Related Links</h4>
            <ul className="space-y-3 text-sm">
              {relatedLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/80 hover:text-gold transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
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
                  <a href="mailto:tucasastu@gmail.com" className="hover:text-gold transition-all">
                    tucasastu@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-1 text-gold shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">Phone</p>
                  <a href="tel:+255673037399" className="hover:text-gold transition-all block">
                    +255 673 037 399
                  </a>
                  <a href="tel:+255714163300" className="hover:text-gold transition-all">
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

    {/* Left: Copyright + DevHub Credit */}
    <div className="flex items-center gap-56 text-sm text-primary-foreground/80">
      <span>© {currentYear} TUCASA STU. All rights reserved.</span>
      <div className="inline-flex items-center gap-1 px-3 py-1 border border-primary-foreground/20 rounded-lg bg-primary-foreground/5 text-sm font-medium shadow-sm">
        Made with <Heart className="w-4 h-4 text-gold font-montserrat" /> by DevHub Developers Inc.
      </div>
    </div>

    {/* Right: Links */}
    <div className="flex items-center gap-6 text-sm">
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
