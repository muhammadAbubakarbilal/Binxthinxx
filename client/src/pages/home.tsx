import { Link } from "wouter";
import { motion } from "framer-motion";
import TestimonialSlider from "@/components/testimonial-slider";
import VideoCarousel from "@/components/video-carousel";
import { ScrollAnimation, StaggerContainer, useTextReveal } from "@/components/scroll-animations";

export default function Home() {
  const services = [
    {
      id: 'wildroot',
      icon: 'fas fa-seedling',
      title: 'Wildroot',
      description: 'Return to your inner wilderness',
      delay: 0
    },
    {
      id: '1on1',
      icon: 'fas fa-heart',
      title: '1:1 Coaching',
      description: 'Intimate transformation journey together',
      delay: 0.1
    },
    {
      id: 'shadow',
      icon: 'fas fa-moon',
      title: 'Shadow Lounge',
      description: 'Explore your hidden depths safely',
      delay: 0.2
    },
    {
      id: 'sunday',
      icon: 'fas fa-sun',
      title: 'Sunday Reset',
      description: 'Weekly rituals for intentional living',
      delay: 0.3
    }
  ];

  const heroTitle = useTextReveal("Reclaim the Self You", 0.05);
  const heroSubtitle = useTextReveal("Abandoned to Survive", 0.07);

  return (
    <div>
      {/* Hero Section - Enhanced with Advanced Animations */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-ink-blue/80 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1494790108755-2616c95aa9c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Character-by-Character Title Animation */}
            <motion.h1 
              className="font-playfair font-bold text-4xl md:text-6xl text-white leading-tight mb-2"
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
            </motion.h1>

            <motion.h1 
              className="font-playfair font-bold text-4xl md:text-6xl text-white leading-tight mb-6"
              variants={heroSubtitle.containerVariants}
              initial="hidden"
              animate="visible"
            >
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
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              For high-functioning women exhausted by performance
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <Link href="/contact">
                <motion.button 
                  className="cta-pulse interactive bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(216, 111, 56, 0.6)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Begin Your Reclamation
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Carousel - Therapist Sessions */}
      <VideoCarousel />

      {/* Testimonial Slider */}
      <TestimonialSlider />

      {/* Services Grid - Enhanced with Stagger Animations */}
      <section className="py-20 bg-candlelight-beige dark:bg-ink-blue/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation variant="textReveal" className="text-center mb-16">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-ink-blue dark:text-candlelight-beige">
              Pathways to Reclamation
            </h2>
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
                  
                  <h3 className="font-playfair font-bold text-xl text-ink-blue dark:text-candlelight-beige mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-forest-green dark:text-forest-green/80 mb-6">
                    {service.description}
                  </p>
                  
                  <Link href="/services">
                    <motion.button 
                      className="interactive bg-burnt-orange hover:bg-burnt-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
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
