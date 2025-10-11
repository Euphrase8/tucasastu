import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, X, Users, Calendar, BookOpen, Phone, Camera, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">T</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold">TUCASA STU</h1>
            <p className="text-xs text-muted-foreground">Living the Mission, Reaching the Nation</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="#about"
                      >
                        <Users className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Our Mission
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Empowering Adventist students across Tanzania to live their faith and reach the nation.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a href="#background" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Background</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn about our history and foundation
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a href="#leadership" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Leadership</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Meet our dedicated leaders
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#events" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Events
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/gallery" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Gallery
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/summit" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Summit
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/#contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/book-of-year" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Book Of Year
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/calendar" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Calendar
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="hidden lg:flex">
            TIMS Login
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            Join TUCASA
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container py-4">
            <div className="flex flex-col space-y-3">
              <a href="#about" className="flex items-center space-x-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                <span>About</span>
              </a>
              <a href="#events" className="flex items-center space-x-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </a>
              <a href="/gallery" className="flex items-center space-x-2 text-sm font-medium">
                <Camera className="h-4 w-4" />
                <span>Gallery</span>
              </a>
              <a href="/calendar" className="flex items-center space-x-2 text-sm font-medium">
                <Camera className="h-4 w-4" />
                <span>Calendar</span>
              </a>
              <a href="/book-of-year" className="flex items-center space-x-2 text-sm font-medium">
                <Camera className="h-4 w-4" />
                <span>Book Of Year</span>
              </a>
              <a href="/summit" className="flex items-center space-x-2 text-sm font-medium">
                <Mountain className="h-4 w-4" />
                <span>Summit</span>
              </a>
              <a href="#contact" className="flex items-center space-x-2 text-sm font-medium">
                <Phone className="h-4 w-4" />
                <span>Contact</span>
              </a>
              <div className="pt-3 border-t space-y-2">
                <Button variant="outline" className="w-full">
                  TIMS Login
                </Button>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  Join TUCASA
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;