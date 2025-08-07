import { useState, useEffect } from "react";

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
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-playfair font-bold text-3xl md:text-4xl text-ink-blue text-center mb-16">
          Voices of Transformation
        </h2>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
                <div className="testimonial-card bg-candlelight-beige p-8 rounded-xl border-2 border-faded-rust/30 h-full">
                  <p className="text-lg italic text-ink-blue mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-burnt-orange rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{testimonial.initial}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-ink-blue">{testimonial.author}</p>
                      <p className="text-forest-green text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-burnt-orange opacity-100' 
                    : 'bg-forest-green/30 opacity-50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
