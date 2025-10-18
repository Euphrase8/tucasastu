import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Users, Calendar, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      `404 Error: Attempted to access non-existent route → ${location.pathname}`
    );
  }, [location.pathname]);

  const quickLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/#about", icon: Users },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Book of the Year", path: "/book-of-year", icon: BookOpen },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-xl"
      >
        <h1 className="text-[6rem] font-extrabold text-gray-800 leading-none tracking-tight">
          404
        </h1>
        <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mt-4 text-gray-500 text-sm md:text-base">
          Sorry, the page you are looking for doesn’t exist or may have been moved.  
          You can use the links below or return to the homepage.
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-medium shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-gray-700 font-medium shadow-sm transition hover:bg-gray-100"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                {link.name}
              </Link>
            );
          })}
        </div>
      </motion.div>

      <footer className="absolute bottom-6 text-sm text-gray-400 text-center w-full">
        <p>
          &copy; {new Date().getFullYear()} TUCASA STU. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default NotFound;
