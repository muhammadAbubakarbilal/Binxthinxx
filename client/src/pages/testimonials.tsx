import { Link } from "wouter";

export default function Testimonials() {
  const dmTestimonials = [
    {
      platform: 'Direct Message',
      message: "I literally can't believe this is my life now. I used to wake up every day feeling like I was wearing a costume. Now I wake up feeling like... me.",
      author: 'Sarah M., CEO'
    },
    {
      platform: 'WhatsApp',
      message: "You helped me realize I wasn't broken, I was just brilliant at surviving. Now I'm learning how to thrive. Thank you for seeing me.",
      author: 'Alex T., Artist'
    },
    {
      platform: 'Email', 
      message: "I can't imagine going back to who I was before this work. The woman I am now would terrify the woman I was a year ago - and I mean that in the best possible way.",
      author: 'Morgan L., Teacher'
    }
  ];

  const handwrittenQuotes = [
    {
      quote: "Byanca doesn't just coach you to be better. She helps you remember who you were before the world told you who to be.",
      author: 'Rachel K.',
      role: 'Executive Coach',
      rotation: 'rotate-1'
    },
    {
      quote: "This work isn't just about healing. It's about coming home to yourself in a way that makes everything else make sense.",
      author: 'Priya S.',
      role: 'Therapist',
      rotation: '-rotate-1'
    },
    {
      quote: "I finally understand what it means to live from my center instead of my edges. This is the most important work I've ever done.",
      author: 'Jordan M.',
      role: 'Entrepreneur',
      rotation: 'rotate-2'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-playfair font-bold text-4xl md:text-5xl text-ink-blue text-center mb-16">
          Proof of Life
        </h1>

        {/* Gallery Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: DM Screenshots */}
          <div className="space-y-8">
            <h2 className="font-playfair font-bold text-2xl text-ink-blue mb-8">Raw Praise</h2>

            {dmTestimonials.map((testimonial, index) => (
              <div key={index} className="paper-texture p-6 rounded-xl border border-forest-green/20">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <p className="text-sm text-forest-green mb-2">{testimonial.platform}</p>
                  <p className="text-ink-blue">"{testimonial.message}"</p>
                </div>
                <p className="text-right text-forest-green text-sm">- {testimonial.author}</p>
              </div>
            ))}
          </div>

          {/* Right: Quote Cards */}
          <div className="space-y-8">
            <h2 className="font-playfair font-bold text-2xl text-ink-blue mb-8">Handwritten Truths</h2>

            {handwrittenQuotes.map((quote, index) => (
              <div 
                key={index}
                className={`bg-candlelight-beige p-8 rounded-xl border-2 border-burnt-orange/30 transform ${quote.rotation} hover:rotate-0 transition-transform duration-300`}
              >
                <p className="font-playfair text-lg italic text-ink-blue mb-4 leading-relaxed">
                  "{quote.quote}"
                </p>
                <p className="text-forest-green font-semibold">- {quote.author}</p>
                <p className="text-forest-green text-sm">{quote.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-ink-blue p-12 rounded-xl">
          <h2 className="font-playfair font-bold text-3xl text-white mb-6">Want this to be your story?</h2>
          <Link href="/contact">
            <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-all duration-300 hover:transform hover:scale-105 w-full md:w-auto">
              Book Discovery Call
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
