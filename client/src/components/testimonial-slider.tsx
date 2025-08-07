import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  initial: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Byanca saw me when I felt invisible. She helped me find my way back to a self I thought I'd lost forever.",
    author: "Jamie L.",
    role: "Wildroot Graduate",
    initial: "J"
  },
  {
    id: "2", 
    quote: "This work changed how I belong to myself. I no longer need to perform to be worthy of love.",
    author: "Taylor R.",
    role: "1:1 Coaching Client",
    initial: "T"
  },
  {
    id: "3",
    quote: "I finally understand what it means to live from authenticity instead of anxiety. This is life-changing work.",
    author: "Maya S.",
    role: "Shadow Lounge Member", 
    initial: "M"
  }
];

export default function TestimonialSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 bg-white dark:bg-ink-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="font-playfair font-bold text-3xl md:text-4xl text-ink-blue dark:text-candlelight-beige text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Voices of Transformation
        </motion.h2>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="flex"
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -15 }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={testimonial.id} 
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ 
                    opacity: index === currentSlide ? 1 : 0.7, 
                    y: 0, 
                    scale: index === currentSlide ? 1 : 0.95 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <motion.div 
                    className="testimonial-card interactive bg-candlelight-beige dark:bg-ink-blue/60 p-8 rounded-xl border-2 border-faded-rust/30 h-full will-change-transform"
                    whileHover={{
                      y: -10,
                      rotate: 1,
                      scale: 1.02,
                      borderColor: "rgb(216, 111, 56)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.p 
                      className="text-lg italic text-ink-blue dark:text-candlelight-beige mb-6 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      "{testimonial.quote}"
                    </motion.p>
                    
                    <div className="flex items-center">
                      <motion.div 
                        className="w-12 h-12 bg-burnt-orange rounded-full flex items-center justify-center mr-4"
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 0 20px rgba(216, 111, 56, 0.5)"
                        }}
                      >
                        <span className="text-white font-bold">{testimonial.initial}</span>
                      </motion.div>
                      
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="font-semibold text-ink-blue dark:text-candlelight-beige">
                          {testimonial.author}
                        </p>
                        <p className="text-forest-green dark:text-forest-green/80 text-sm">
                          {testimonial.role}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Slider Controls */}
          <motion.div 
            className="flex justify-center mt-8 space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 interactive ${
                  index === currentSlide 
                    ? 'bg-burnt-orange opacity-100 scale-125' 
                    : 'bg-forest-green/30 opacity-50 hover:opacity-75'
                }`}
                whileHover={{ scale: index === currentSlide ? 1.25 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
