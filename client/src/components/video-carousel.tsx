import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoSlide {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

export default function VideoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Therapist-style video content featuring intimate therapeutic settings
  const videoSlides: VideoSlide[] = [
    {
      id: "welcome-session",
      title: "Welcome to Your Journey",
      description: "A gentle introduction to reclaiming your authentic self",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "shadow-work", 
      title: "Embracing Your Shadow",
      description: "Learning to integrate the parts of yourself you've hidden",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: "reclamation",
      title: "The Art of Reclamation", 
      description: "Practical steps to return to your true self",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [videoSlides.length]);

  return (
    <div className="absolute inset-0 z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Background Video */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={videoSlides[currentSlide].videoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
          
          {/* Fallback Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${videoSlides[currentSlide].thumbnail})`,
              zIndex: -1
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {videoSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-burnt-orange scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              whileHover={{ scale: index === currentSlide ? 1.25 : 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}