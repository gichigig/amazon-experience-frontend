import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop",
    title: "Shop Deals",
    subtitle: "Up to 50% off on electronics"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop",
    title: "Fashion Week",
    subtitle: "New arrivals in clothing"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=600&fit=crop",
    title: "Home & Kitchen",
    subtitle: "Everything for your home"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-0 bottom-1/3 w-16 md:w-24 flex items-center justify-center bg-transparent hover:bg-black/10 transition-colors"
      >
        <ChevronLeft size={48} className="text-foreground/70 hover:text-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-0 bottom-1/3 w-16 md:w-24 flex items-center justify-center bg-transparent hover:bg-black/10 transition-colors"
      >
        <ChevronRight size={48} className="text-foreground/70 hover:text-foreground" />
      </button>
    </div>
  );
};

export default HeroCarousel;
