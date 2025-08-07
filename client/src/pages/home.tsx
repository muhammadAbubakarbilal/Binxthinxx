import { Link } from "wouter";
import TestimonialSlider from "@/components/testimonial-slider";

export default function Home() {
  const services = [
    {
      id: 'wildroot',
      icon: 'fas fa-seedling',
      title: 'Wildroot',
      description: 'Return to your inner wilderness',
      delay: '0s'
    },
    {
      id: '1on1',
      icon: 'fas fa-heart',
      title: '1:1 Coaching',
      description: 'Intimate transformation journey together',
      delay: '0.2s'
    },
    {
      id: 'shadow',
      icon: 'fas fa-moon',
      title: 'Shadow Lounge',
      description: 'Explore your hidden depths safely',
      delay: '0.4s'
    },
    {
      id: 'sunday',
      icon: 'fas fa-sun',
      title: 'Sunday Reset',
      description: 'Weekly rituals for intentional living',
      delay: '0.6s'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-blue/80 to-transparent z-10"></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1494790108755-2616c95aa9c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-playfair font-bold text-4xl md:text-6xl text-white leading-tight mb-6 animate-fade-in">
              Reclaim the Self You{' '}
              <span className="brush-stroke text-burnt-orange">Abandoned</span>{' '}
              to Survive
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-slide-up">
              For high-functioning women exhausted by performance
            </p>
            <Link href="/contact">
              <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 animate-slide-up">
                Begin Your Reclamation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Slider */}
      <TestimonialSlider />

      {/* Services Grid */}
      <section className="py-20 bg-candlelight-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-ink-blue text-center mb-16">
            Pathways to Reclamation
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="service-card bg-white p-8 rounded-xl shadow-lg"
              >
                <div 
                  className="w-16 h-16 bg-burnt-orange rounded-lg flex items-center justify-center mb-6 animate-float"
                  style={{ animationDelay: service.delay }}
                >
                  <i className={`${service.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="font-playfair font-bold text-xl text-ink-blue mb-4">
                  {service.title}
                </h3>
                <p className="text-forest-green mb-6">{service.description}</p>
                <Link href="/services">
                  <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full">
                    Learn More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
