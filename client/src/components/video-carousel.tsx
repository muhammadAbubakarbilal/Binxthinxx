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
  const [isPlaying, setIsPlaying] = useState(true);
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
      if (!isPlaying) {
        setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, videoSlides.length]);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(() => {
        // Auto-play blocked by browser, user will need to interact first
        setIsPlaying(false);
      });
    }
  }, [currentSlide, isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-ink-blue/95 via-ink-blue/80 to-forest-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-white mb-4">
            Begin Your Transformation
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Intimate conversations that guide you back to yourself
          </p>
        </motion.div>

        {/* Main Video Carousel */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl shadow-2xl bg-candlelight-beige/10 backdrop-blur-sm border border-burnt-orange/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-[500px] md:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Video/Image Background */}
                <div className="relative w-full h-full">
                  <motion.img
                    src={videoSlides[currentSlide].thumbnail}
                    alt={videoSlides[currentSlide].title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2 }}
                  />
                  
                  {/* Video Element (Auto-playing, prominent display) */}
                  <video
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      isPlaying ? 'opacity-100' : 'opacity-50'
                    }`}
                    src={videoSlides[currentSlide].videoUrl}
                    onEnded={() => setIsPlaying(false)}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-blue/30 via-transparent to-ink-blue/20" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full max-w-2xl px-8 md:px-12">
                      <motion.h3
                        className="font-playfair font-bold text-3xl md:text-4xl text-white mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        {videoSlides[currentSlide].title}
                      </motion.h3>
                      
                      <motion.p
                        className="text-lg text-white/90 mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      >
                        {videoSlides[currentSlide].description}
                      </motion.p>

                      {/* Play Button */}
                      <motion.button
                        onClick={handlePlayPause}
                        className="interactive group relative w-20 h-20 bg-burnt-orange/90 hover:bg-burnt-orange rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 0 30px rgba(216, 111, 56, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        <motion.i
                          className={`${isPlaying ? 'fas fa-pause' : 'fas fa-play'} text-white text-xl`}
                          animate={{ 
                            x: isPlaying ? 0 : 2,
                            scale: isPlaying ? 1 : 1.1 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Pulse Effect */}
                        <motion.div
                          className="absolute inset-0 bg-burnt-orange rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 0, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-3">
              {videoSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`interactive w-3 h-3 rounded-full transition-all duration-300 ${
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

          {/* Navigation Arrows */}
          <motion.button
            onClick={() => goToSlide(currentSlide === 0 ? videoSlides.length - 1 : currentSlide - 1)}
            className="interactive absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-chevron-left text-white text-lg"></i>
          </motion.button>

          <motion.button
            onClick={() => goToSlide((currentSlide + 1) % videoSlides.length)}
            className="interactive absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-chevron-right text-white text-lg"></i>
          </motion.button>
        </motion.div>

        {/* Video Thumbnails */}
        <motion.div 
          className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {videoSlides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`interactive flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentSlide
                  ? 'border-burnt-orange shadow-lg'
                  : 'border-white/30 hover:border-white/60'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={slide.thumbnail}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-ink-blue/20"></div>
            </motion.button>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <p className="text-lg text-white/80 mb-6">
            Ready to begin your transformation journey?
          </p>
          <motion.a
            href="/contact"
            className="interactive inline-block bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(216, 111, 56, 0.6)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule Your Session
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}