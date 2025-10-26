import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Calendar, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

interface MediaItem {
  ID: number;
  EventTitle: string;
  MediaFiles: string; // JSON string of array
  Description: string;
  CreatedAt: Date;
}

const Gallery: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.tucasastu.com/api/media");
        const data = await res.json();
        setMedia(data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleViewCollection = (files: string[]) => {
    setSelectedCollection(files);
    setOpenCollection(true);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-divine-light py-20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Camera className="w-4 h-4 mr-2" />
              Photo Gallery
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Capturing Our{" "}
              <span className="text-gradient-divine">Journey</span>
            </h1>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">
              Loading gallery...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {media.map((item) => {
                const files: string[] = JSON.parse(item.MediaFiles);
                const isCollection = files.length > 1;
                const displayImage = files[0];

                return (
                  <Card
                    key={item.ID}
                    className="group overflow-hidden border-0 shadow-card hover:shadow-divine transition-all duration-300 max-w-2xl mx-auto"
                  >
                    <div className="relative w-full h-64 bg-black/5 flex items-center justify-center">
                      <img
                        src={`https://api.tucasastu.com/${displayImage}`}
                        alt={item.EventTitle}
                        className="w-full h-full object-contain transition-transform duration-500"
                        loading="lazy"
                      />
                      {isCollection && (
                        <Button
                          className="absolute bottom-3 right-3 bg-white/80 text-primary text-xs px-2 py-1 rounded"
                          onClick={() =>
                            handleViewCollection(
                              files.map((f) => `https://api.tucasastu.com/${f}`)
                            )
                          }
                        >
                          View Collection ({files.length})
                        </Button>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{item.EventTitle}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.Description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.CreatedAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Collection Modal */}
          <Dialog
            open={openCollection}
            onClose={() => setOpenCollection(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <Dialog.Panel className="bg-white rounded-lg max-w-4xl w-full p-4 relative animate-fade-in">
              <Button
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => setOpenCollection(false)}
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedCollection.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Collection ${i + 1}`}
                    className="w-full h-48 object-cover rounded-lg animate-fade-in"
                  />
                ))}
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
