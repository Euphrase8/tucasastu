// src/pages/Gallery.tsx
import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Calendar, X, Images } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MediaItem {
  ID: number;
  EventTitle: string;
  MediaFiles: string; // JSON string of array
  Description: string;
  CreatedAt: string;
}

const Gallery: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCollection, setOpenCollection] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<{
    title: string;
    description: string;
    images: string[];
  } | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.tucasastu.com/api/media");
        const data = await res.json();
        setMedia(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleViewCollection = (item: MediaItem) => {
    const files: string[] = JSON.parse(item.MediaFiles);
    const images = files.map((f) =>
      `https://api.tucasastu.com/${f.startsWith("/") ? f.slice(1) : f}`
    );
    setSelectedCollection({
      title: item.EventTitle,
      description: item.Description,
      images,
    });
    setOpenCollection(true);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1 border-gray-300">
              <Camera className="w-4 h-4 mr-2" />
              Photo Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Capturing Our{" "}
              <span className="bg-gradient-to-r from-[#3e8391] to-[#2f557f] bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Moments that define us, memories that inspire us.
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3e8391]"></div>
            </div>
          ) : media.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No gallery items found.</p>
          ) : (
            /* LARGER CARDS – INCREASED SCALE */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {media.map((item) => {
                const files: string[] = JSON.parse(item.MediaFiles);
                const isCollection = files.length > 1;
                const displayImage = files[0];

                return (
                  <Card
                    key={item.ID}
                    className="group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white max-w-2xl mx-auto"
                  >
                    {/* Larger Image Container */}
                    <div className="relative w-full h-72 md:h-80 lg:h-96 bg-gray-50 p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={`https://api.tucasastu.com/${
                          displayImage.startsWith("/") ? displayImage.slice(1) : displayImage
                        }`}
                        alt={item.EventTitle}
                        className="w-full h-full object-contain rounded-lg shadow-sm"
                        loading="lazy"
                      />

                      {/* PROFESSIONAL "View Collection" Button */}
                      {isCollection && (
                        <Button
                          variant="default"
                          size="sm"
                          className="absolute bottom-6 right-6 bg-gradient-to-r from-[#3e8391] to-[#2f557f] hover:from-[#2f557f] hover:to-[#3e8391] text-white font-medium text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCollection(item);
                          }}
                        >
                          <Images className="w-4 h-4" />
                          View Collection ({files.length})
                        </Button>
                      )}
                    </div>

                    {/* Card Content */}
                    <CardContent className="p-6 bg-white">
                      <h3 className="font-bold text-xl text-gray-900 line-clamp-1">
                        {item.EventTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                        {item.Description || "No description available."}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mt-3">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {new Date(item.CreatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* MODAL – Full Detail, No Crop */}
          <Dialog open={openCollection} onOpenChange={setOpenCollection}>
            <DialogContent
              className="max-w-full w-[95vw] h-[90vh] p-0 bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={{ maxWidth: "1400px" }}
            >
              {/* Header */}
              <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="max-w-4xl">
                    <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      {selectedCollection?.title}
                    </DialogTitle>
                    {selectedCollection?.description && (
                      <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
                        {selectedCollection.description}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenCollection(false)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </DialogHeader>

              {/* Image Grid – Full Detail */}
              <div className="p-4 md:p-6">
                <div
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr"
                  style={{
                    height: "calc(90vh - 140px)",
                  }}
                >
                  {selectedCollection?.images.map((src, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm p-2"
                    >
                      <img
                        src={src}
                        alt={`${selectedCollection.title} - ${idx + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;