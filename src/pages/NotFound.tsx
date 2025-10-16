import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      `404 Error: Attempted to access non-existent route → ${location.pathname}`
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-[6rem] font-extrabold text-gray-800 leading-none tracking-tight">
          404
        </h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mt-3 max-w-md text-gray-500 mx-auto">
          Sorry, the page you are looking for doesn’t exist or may have been moved.  
          Please check the URL or return to the homepage.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-white font-medium shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </motion.div>

      <footer className="absolute bottom-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} TUCASA STU. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;
