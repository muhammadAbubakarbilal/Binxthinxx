import { Link } from "wouter";
import { motion } from "framer-motion";
import TestimonialSlider from "@/components/testimonial-slider";
import VideoCarousel from "@/components/video-carousel";
import { ScrollAnimation, StaggerContainer, useTextReveal } from "@/components/scroll-animations";

export default function Home() {
  const services = [
    {
      id: 'wildroot-intensive',
      icon: 'fas fa-seedling',
      title: 'Wildroot',
      tagline: 'Return to your inner wilderness',
      description: 'From performance-based living to authentic self-expression',
      delay: 0
    },
    {
      id: 'one-on-one-coaching',
      icon: 'fas fa-heart',
      title: '1:1 Coaching',
      tagline: 'Deep identity reclamation work',
      description: 'Trauma-informed coaching for self-trust and belonging',
      delay: 0.1
    },
    {
      id: 'shadow-lounge',
      icon: 'fas fa-moon',
      title: 'Shadow Lounge',
      tagline: 'Integrate what you\'ve hidden',
      description: 'Safe space to explore your disowned parts',
      delay: 0.2
    },
    {
      id: 'sunday-reset',
      icon: 'fas fa-sun',
      title: 'Sunday Reset',
      tagline: 'Weekly rituals for intentional living',
      description: 'Structure that supports your authentic self',
      delay: 0.3
    }
  ];

  const heroTitle = useTextReveal("Reclaim the Self You", 0.05);
  const heroSubtitle = useTextReveal("Abandoned to Survive", 0.07);

  return (
    <div>
      {/* Hero Section with Background Video Carousel */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Video Carousel */}
        <VideoCarousel />

        {/* Overlay for text readability */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-ink-blue/70 via-ink-blue/40 to-transparent z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Candlelight Flicker Effect */}
        <div className="absolute top-10 right-10 z-30">
          <motion.div 
            className="w-4 h-4 bg-burnt-orange rounded-full candlelight-flicker"
            animate={{
              opacity: [0.7, 1, 0.8, 1],
              scale: [0.9, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Identity Hook Headlines */}
            <motion.h1 
              className="font-playfair font-bold text-4xl md:text-6xl text-black dark:text-white leading-tight mb-6"
              variants={heroTitle.containerVariants}
              initial="hidden"
              animate="visible"
            >
              {heroTitle.characters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={heroTitle.characterVariants}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <br />
              <span className="brush-stroke text-burnt-orange">
                {heroSubtitle.characters.map((char, index) => (
                  <motion.span
                    key={index}
                    variants={heroSubtitle.characterVariants}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-8 text-black dark:text-white max-w-2xl mx-auto leading-relaxed font-lora"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              For high-functioning women who've built lives that work<br />
              but are ready for ones that feel good.
            </motion.p>

            {/* CTA Above the Fold */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <Link href="/booking">
                <motion.button 
                  className="cta-pulse interactive bg-burnt-orange hover:bg-burnt-orange/90 text-black dark:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(216, 111, 56, 0.6)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Your Journey
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button 
                  className="interactive border-2 border-black/50 dark:border-white/50 hover:border-black dark:hover:border-white text-black dark:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discovery Call
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Testimonial Slider */}
      <TestimonialSlider />

      {/* Services - "The Portal" */}
      <section className="py-20 bg-candlelight-beige dark:bg-ink-blue/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="textReveal" className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-black dark:text-white mb-4">
              The Portal
            </h2>
            <p className="text-xl text-black dark:text-white font-lora italic max-w-2xl mx-auto">
              You've built a life that works. Now you're ready for one that feels good.
            </p>
          </ScrollAnimation>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                className="service-card interactive bg-white dark:bg-ink-blue/80 p-8 rounded-xl shadow-lg will-change-transform"
                whileHover={{
                  y: -8,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="service-card-content">
                  <motion.div 
                    className="w-16 h-16 bg-burnt-orange rounded-lg flex items-center justify-center mb-6"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 0.5, 0, -0.5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: service.delay,
                      ease: "easeInOut"
                    }}
                  >
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </motion.div>

                  <h3 className="font-playfair font-bold text-xl text-black dark:text-white mb-2">
                    {service.title}
                  </h3>

                  <p className="text-black dark:text-white font-lora italic text-sm mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-black dark:text-white mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <Link href={
                    service.id === 'wildroot-intensive' ? '/booking-wildroot' :
                    service.id === 'one-on-one-coaching' ? '/booking-coaching' :
                    service.id === 'shadow-lounge' ? '/booking-shadow' :
                    service.id === 'sunday-reset' ? '/booking-sunday' :
                    '/booking'
                  }>
                    <motion.button 
                      className="interactive bg-burnt-orange hover:bg-burnt-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}