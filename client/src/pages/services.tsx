import { Link } from "wouter";

export default function Services() {
  const programs = [
    {
      id: 'wildroot',
      title: 'WILDROOT',
      tagline: 'Return to your inner wilderness',
      from: 'Performer',
      to: 'Whole Human',
      gradient: 'from-burnt-orange to-faded-rust',
      includes: [
        '6 deep-dive coaching sessions',
        'Guided journaling prompts', 
        'Voice note support between sessions',
        'Shadow work exercises'
      ],
      perfectFor: 'Those craving self-belonging and ready to release the exhausting performance of being who they think they should be.',
      ctaText: 'Join Waitlist',
      ctaLink: '/contact'
    },
    {
      id: 'coaching',
      title: '1:1 COACHING',
      tagline: 'Intimate transformation journey',
      from: 'Fragmented',
      to: 'Integrated', 
      gradient: 'from-ink-blue to-forest-green',
      includes: [
        'Bi-weekly 90-minute sessions',
        'Personalized integration practices',
        'Email support between sessions',
        'Custom resource library'
      ],
      perfectFor: 'Those ready for deep, sustained transformation with personalized support and accountability.',
      ctaText: 'Book Discovery Call',
      ctaLink: '/contact'
    },
    {
      id: 'shadow-lounge',
      title: 'SHADOW LOUNGE',
      tagline: 'Explore your hidden depths',
      from: 'Hiding',
      to: 'Embracing',
      gradient: 'from-forest-green to-ink-blue',
      includes: [
        'Monthly group shadow work sessions',
        'Private community access',
        'Monthly integration calls',
        'Shadow work toolkit'
      ],
      perfectFor: 'Those ready to reclaim disowned parts of themselves in a safe, supportive group setting.',
      ctaText: 'Learn More',
      ctaLink: '/contact'
    },
    {
      id: 'sunday-reset',
      title: 'SUNDAY RESET',
      tagline: 'Weekly rituals for intentional living',
      from: 'Reactive',
      to: 'Intentional',
      gradient: 'from-burnt-orange to-forest-green',
      includes: [
        'Weekly video transmissions',
        'Ritual design templates',
        'Community sharing space',
        'Monthly live Q&A sessions'
      ],
      perfectFor: 'Those wanting to cultivate weekly practices that anchor you in authenticity and intention.',
      ctaText: 'Join Community',
      ctaLink: '/contact',
      hasVideo: true
    }
  ];

  return (
    <section className="py-20 bg-candlelight-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="relative mb-20 p-16 rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-forest-green/90 to-forest-green/70"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=800')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="relative z-10 text-center">
            <blockquote className="font-playfair text-3xl md:text-4xl text-white leading-relaxed italic">
              "You've built a life that works. Now you're ready for one that feels good."
            </blockquote>
          </div>
        </div>

        {/* Program Cards */}
        <div className="space-y-16">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className={`md:w-1/3 p-8 bg-gradient-to-br ${program.gradient} text-white`}>
                  <h2 className="font-playfair font-bold text-3xl mb-4">{program.title}</h2>
                  <p className="text-xl italic mb-6">{program.tagline}</p>
                  <div className="space-y-2 text-lg">
                    <p><strong>From:</strong> {program.from}</p>
                    <p><strong>To:</strong> {program.to}</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="font-playfair font-bold text-xl text-ink-blue mb-4">What's Included:</h3>
                  <ul className="space-y-2 text-forest-green mb-6">
                    {program.includes.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <i className="fas fa-check-circle text-burnt-orange mr-3"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-forest-green mb-6 leading-relaxed">
                    <strong>Perfect for:</strong> {program.perfectFor}
                  </p>

                  {/* Video Section for Sunday Reset */}
                  {program.hasVideo && (
                    <div className="bg-candlelight-beige p-8 rounded-lg mb-6 text-center">
                      <div className="animate-float">
                        <i className="fas fa-video text-burnt-orange text-4xl mb-4"></i>
                      </div>
                      <p className="font-playfair text-xl text-ink-blue mb-2">Transformation Montage Coming Soon</p>
                      <p className="text-forest-green">Experience the journey through video testimonials</p>
                    </div>
                  )}

                  <Link href={program.ctaLink}>
                    <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                      {program.ctaText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
