import { Link } from "wouter";

export default function About() {
  const journeySteps = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Survival',
      description: 'Building walls to protect a tender heart, learning to perform safety instead of feeling it.'
    },
    {
      icon: 'fas fa-tired',
      title: 'Burnout', 
      description: 'When the mask became too heavy and the performance too exhausting to maintain.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Realization',
      description: 'The moment I understood that my greatest strength was also my greatest prison.'
    },
    {
      icon: 'fas fa-phoenix-squadron',
      title: 'Reclamation',
      description: 'Rising from the ashes of who I thought I should be into who I truly am.'
    }
  ];

  const approaches = [
    {
      icon: 'fas fa-brain',
      title: 'Trauma-Informed Framework',
      description: 'Understanding how survival strategies shape identity and gently releasing what no longer serves.'
    },
    {
      icon: 'fas fa-fingerprint',
      title: 'Identity-First Coaching', 
      description: 'Moving beyond behavior change to fundamental shifts in how you see and belong to yourself.'
    },
    {
      icon: 'fas fa-yin-yang',
      title: 'Shadow Work Integration',
      description: 'Reclaiming the parts of yourself you\'ve hidden to become whole and authentic.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="text-center mb-20">
          <h1 className="font-playfair font-bold text-4xl md:text-5xl text-ink-blue mb-8">
            From Performer to Person: My Reclamation Journey
          </h1>
          <p className="text-xl text-forest-green max-w-3xl mx-auto leading-relaxed">
            For years, I wore competence like armor - until the weight of performance crushed my spirit. 
            My journey back to self-belonging began when I realized that surviving wasn't the same as living.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {journeySteps.map((step, index) => (
            <div key={step.title} className="text-center group">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${
                index === 3 
                  ? 'bg-burnt-orange group-hover:bg-ink-blue' 
                  : 'bg-ink-blue group-hover:bg-burnt-orange'
              }`}>
                <i className={`${step.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-playfair font-bold text-xl text-ink-blue mb-4">
                {step.title}
              </h3>
              <p className="text-forest-green leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Approach Section */}
        <div className="bg-candlelight-beige p-12 rounded-xl">
          <h2 className="font-playfair font-bold text-3xl text-ink-blue text-center mb-12">
            My Approach
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {approaches.map((approach) => (
              <div key={approach.title} className="text-center">
                <div className="w-16 h-16 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${approach.icon} text-white text-xl`}></i>
                </div>
                <h3 className="font-playfair font-bold text-lg text-ink-blue mb-4">
                  {approach.title}
                </h3>
                <p className="text-forest-green">{approach.description}</p>
              </div>
            ))}
          </div>

          {/* Credentials */}
          <div className="text-center border-t border-forest-green/20 pt-8">
            <p className="text-forest-green text-lg">
              <strong>ICF Certification</strong> • <strong>10+ Years Experience</strong> • <strong>Trauma-Informed Practitioner</strong>
            </p>
          </div>

          <div className="text-center mt-8">
            <Link href="/services">
              <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                Explore the Process
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
