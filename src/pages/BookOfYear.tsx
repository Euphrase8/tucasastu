import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBooks } from "@/services/books.js";
import { BookOpen, Download } from "lucide-react";

const BookOfYear = () => {
  const [book, setBook] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");
        const books = await getAllBooks();
        setBook(books[0] || {});
      } catch (err) {
        setError("Failed to load book details. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6 shadow-lg">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Annual Book of the Year
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into this year’s carefully selected book and follow the
            structured reading plan for your spiritual growth.
          </p>
        </div>
      </section>

      {/* Book Section */}
      <section className="flex-grow py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Book Preview */}
              <Card className="shadow-xl p-8 flex flex-col items-center bg-white">
                <div className="relative">
                  <img
                    src={`https://api.tucasastu.com/${book.Image}`}
                    alt={book.Title}
                    className="w-56 h-72 md:w-64 md:h-84 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-gradient-primary text-white border-none shadow">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardContent className="mt-8 text-center">
                  <h2 className="text-2xl font-bold mb-3">{book.Title}</h2>
                  {book.Description ? (
                    <p className="text-muted-foreground leading-relaxed">
                      {book.Description}
                    </p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No description available at the moment.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Reading Plan */}
              <div className="flex flex-col justify-center">
                <div className="bg-accent/20 p-8 rounded-2xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    Reading Plan
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Stay on track with the official reading plan for{" "}
                    <span className="font-semibold text-foreground">
                      {book.Title}
                    </span>
                    . Download the PDF guide and follow along chapter by chapter
                    throughout the year.
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    asChild
                  >
                    <a
                      href={`https://api.tucasastu.com/${book.ReadingPlan}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Reading Plan (PDF)
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookOfYear;
