import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Star, ArrowRight } from "lucide-react";

const services = [
  {
    id: "wildroot-intensive",
    name: "Wildroot Intensive",
    tagline: "6-Month Identity Reclamation Journey",
    description: "A comprehensive program for high-functioning women ready to dismantle the performance and reclaim their authentic selves. This intensive combines shadow work, somatic practices, and identity archaeology to guide you from survival-based living to genuine self-belonging.",
    price: 3997,
    duration: "6 months",
    sessionsIncluded: 12,
    features: [
      "12 bi-weekly 1:1 coaching sessions (90 minutes each)",
      "Access to Shadow Lounge community for 6 months",
      "Weekly Sunday Reset rituals and practices",
      "Personalized identity reclamation toolkit",
      "Voxer support between sessions",
      "Bonus: The Disruption masterclass series"
    ],
    popular: true
  },
  {
    id: "one-on-one-coaching",
    name: "1:1 Coaching Sessions",
    tagline: "Individual Deep Dive Sessions",
    description: "Single session or package options for targeted work on specific aspects of your identity reclamation journey. Perfect for those ready to explore specific patterns or transitions.",
    price: 350,
    duration: "90 minutes",
    sessionsIncluded: 1,
    features: [
      "90-minute deep dive coaching session",
      "Pre-session preparation guide",
      "Session recording for your reference",
      "Follow-up integration practices",
      "Option to add additional sessions"
    ],
    popular: false
  },
  {
    id: "shadow-lounge",
    name: "Shadow Lounge Membership",
    tagline: "Monthly Community Experience",
    description: "A monthly gathering space for women doing the deep work of identity reclamation. Each session explores different aspects of shadow work, authenticity, and the journey from performance to truth.",
    price: 97,
    duration: "Monthly",
    sessionsIncluded: 1,
    features: [
      "Monthly 2-hour group session",
      "Private community access",
      "Monthly themed shadow work prompts",
      "Guest expert sessions",
      "Peer support and accountability",
      "Archive of past sessions"
    ],
    popular: false
  },
  {
    id: "sunday-reset",
    name: "Sunday Reset Ritual",
    tagline: "Weekly Recalibration Practice",
    description: "A weekly practice designed to help you shed the week's accumulated performance and reconnect with your authentic self. Each session includes guided meditation, journaling, and gentle movement.",
    price: 47,
    duration: "Weekly",
    sessionsIncluded: 4,
    features: [
      "Weekly 60-minute guided session",
      "Downloadable journal prompts",
      "Guided meditation recordings",
      "Movement and breath work practices",
      "Community check-ins",
      "Monthly progress tracking"
    ],
    popular: false
  }
];

export default function Booking() {
  const [, setLocation] = useLocation();

  const handleSelectService = (serviceId: string) => {
    setLocation(`/pricing?service=${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-candlelight-beige">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black dark:text-white mb-6 leading-tight">
            Choose Your Portal
            <span className="block text-2xl md:text-3xl lg:text-4xl text-black dark:text-white font-normal mt-2">
              Into Authentic Living
            </span>
          </h1>
          <p className="text-lg md:text-xl text-black dark:text-white max-w-3xl mx-auto leading-relaxed">
            Each offering is a carefully crafted invitation to step away from the performance 
            and into the truth of who you really are. Choose the path that calls to your soul.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className={`relative transition-all duration-300 hover:shadow-2xl ${
                service.popular ? 'ring-2 ring-burnt-orange shadow-xl' : ''
              }`}>
                {service.popular && (
                  <Badge className="absolute -top-3 left-6 bg-burnt-orange text-black dark:text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-serif text-2xl text-black dark:text-white mb-2">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="text-black dark:text-white text-lg font-medium">
                        {service.tagline}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-black dark:text-white">
                        ${service.price.toLocaleString()}
                      </div>
                      <div className="text-black dark:text-white text-sm">
                        {service.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-black dark:text-white leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-black dark:text-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-burnt-orange" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-burnt-orange" />
                      <span>{service.sessionsIncluded} sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-burnt-orange" />
                      <span>{service.id.includes('one-on-one') ? '1:1' : 'Group'}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-serif text-lg text-black dark:text-white">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-black dark:text-white">
                          <Star className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))} 
                    </ul>
                  </div>

                  <Button 
                    onClick={() => handleSelectService(service.id)}
                    className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                      service.popular 
                        ? 'bg-burnt-orange hover:bg-burnt-orange/90 text-black dark:text-white' 
                        : 'bg-ink-blue hover:bg-ink-blue/90 text-black dark:text-white'
                    }`} 
                  >
                    Select This Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ink-blue py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white dark:text-white mb-6">
            Not Sure Which Path Is Right?
          </h2>
          <p className="text-xl text-white dark:text-white mb-8 leading-relaxed">
            Book a complimentary 30-minute discovery call to explore which offering 
            aligns with where you are in your reclamation journey.
          </p>
          <Button 
            onClick={() => setLocation('/contact')}
            className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-4 text-lg"
          >
            Schedule Discovery Call
          </Button>
        </div>
      </section>
    </div>
  );
}