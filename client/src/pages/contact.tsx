import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Heart, Send, Calendar, Check, Sparkles, MessageCircle, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDiscoveryCall, setIsDiscoveryCall] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    timePreference: "",
    subject: "",
    message: ""
  });
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Background elements for visual interest
  const backgroundElements = [
    { id: 1, className: "absolute top-1/4 left-1/4 w-32 h-32 bg-burnt-orange/5 rounded-full blur-3xl" },
    { id: 2, className: "absolute bottom-1/4 right-1/4 w-40 h-40 bg-forest-green/5 rounded-full blur-3xl" },
  ];

  useEffect(() => {
    // Add subtle parallax effect to background elements
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax-element');
      
      elements.forEach((el, index) => {
        const speed = 0.05 + (index * 0.02);
        const transform = `translateY(${scrollY * speed}px)`;
        (el as HTMLElement).style.transform = transform;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormSubmitted(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        timePreference: "",
        subject: "",
        message: ""
      });
      setIsDiscoveryCall(false);
      setFormSubmitted(false);
    }, 4000);

    toast({
      title: isDiscoveryCall ? "Discovery Call Requested!" : "Message Sent!",
      description: isDiscoveryCall 
        ? "We'll contact you within 24 hours to schedule your complimentary discovery call."
        : "Thank you for reaching out. We'll get back to you soon.",
    });
  };

  const handleScheduleDiscoveryCall = () => {
    setIsDiscoveryCall(true);
    // Scroll to the form
    setTimeout(() => {
      const formElement = document.getElementById('contact-form');
      if (formElement) {
        formElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, timePreference: value }));
  };

  const expectations = [
    { 
      icon: <Clock className="w-5 h-5 text-burnt-orange" />, 
      text: "45-minute deep-dive conversation" 
    },
    { 
      icon: <Heart className="w-5 h-5 text-burnt-orange" />, 
      text: "Explore what's calling you forward" 
    },
    { 
      icon: <Sparkles className="w-5 h-5 text-burnt-orange" />, 
      text: "Discover if we're aligned for the journey" 
    }
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-burnt-orange" />,
      title: "Email",
      detail: "hello@journey.com",
      description: "For general inquiries and partnership opportunities"
    },
    {
      icon: <Phone className="w-6 h-6 text-burnt-orange" />,
      title: "Phone",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-5pm EST"
    },
    {
      icon: <MapPin className="w-6 h-6 text-burnt-orange" />,
      title: "Location",
      detail: "New York, NY",
      description: "Virtual sessions available worldwide"
    }
  ];

  return (
    <section className="py-20 bg-candlelight-beige relative overflow-hidden">
      {/* Subtle background elements */}
      {backgroundElements.map(element => (
        <div key={element.id} className={cn(element.className, "parallax-element")} />
      ))}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-playfair font-bold text-4xl md:text-5xl text-ink-blue mb-6 relative inline-block">
              The Open Door
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-burnt-orange rounded-full" />
            </h1>
            <p className="text-xl text-forest-green font-lora italic max-w-2xl mx-auto">
              This isn't just a contact form. It's a declaration: I'm ready for more.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Contact Info & Discovery Call */}
          <div className="lg:col-span-5 space-y-8">
            {/* Discovery Call Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="relative overflow-hidden border-2 border-burnt-orange/20 bg-gradient-to-br from-white to-candlelight-beige/50 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:border-burnt-orange/30">
                <div className="absolute top-0 right-0 w-24 h-24 bg-burnt-orange/5 rounded-bl-full -z-10" />
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-burnt-orange/10 rounded-lg">
                      <Calendar className="w-6 h-6 text-burnt-orange" />
                    </div>
                    <div>
                      <CardTitle className="font-serif text-2xl text-ink-blue">
                        Schedule Your Complimentary Discovery Call
                      </CardTitle>
                      <p className="text-forest-green mt-2">
                        Not sure which offering is right for you? Book a 30-minute discovery call to explore your path to authentic living.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-forest-green/5 rounded-bl-full -z-10" />
                  <div className="relative">
                    <p className="text-forest-green mb-4 italic">
                      Let's have a heart-to-heart conversation about your journey and find the perfect path for your transformation.
                    </p>
                    <Button 
                      onClick={handleScheduleDiscoveryCall}
                      className="bg-gradient-to-r from-burnt-orange to-faded-rust hover:from-burnt-orange/90 hover:to-faded-rust/90 text-white px-8 py-4 text-lg w-full sm:w-auto transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                      size="lg"
                    >
                      <Coffee className="w-5 h-5 mr-2" />
                      Schedule Discovery Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* What to Expect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-forest-green/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-burnt-orange rounded-l-full" />
                <h3 className="font-playfair font-bold text-xl text-ink-blue mb-5 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-burnt-orange" />
                  What to Expect:
                </h3>
                <div className="space-y-4">
                  {expectations.map((expectation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-candlelight-beige/50 transition-colors"
                    >
                      <div className="mt-1 flex-shrink-0">
                        {expectation.icon}
                      </div>
                      <p className="text-forest-green">{expectation.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card 
                    key={index}
                    className="border-forest-green/10 hover:border-burnt-orange/30 transition-all duration-300 hover:shadow-md"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-burnt-orange/10 rounded-lg">
                          {method.icon}
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-ink-blue mb-1">{method.title}</h4>
                          <p className="text-burnt-orange font-medium mb-1">{method.detail}</p>
                          <p className="text-forest-green text-sm">{method.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-white to-candlelight-beige/30 border-forest-green/10">
                <div className="absolute top-0 right-0 w-20 h-20 bg-burnt-orange/5 rounded-bl-full -z-10" />
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-burnt-orange/10 rounded-lg">
                      <Heart className="w-6 h-6 text-burnt-orange" />
                    </div>
                    <div>
                      <CardTitle className="font-serif text-2xl text-ink-blue flex items-center gap-2">
                        {isDiscoveryCall ? "Discovery Call Request" : "Let's Connect"}
                      </CardTitle>
                      <p className="text-forest-green mt-2">
                        {isDiscoveryCall 
                          ? "Tell us a bit about yourself and we'll schedule your complimentary discovery call." 
                          : "Ready to begin your journey? I'd love to hear from you."
                        }
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form
                        key="form"
                        id="contact-form"
                        onSubmit={handleSubmit}
                        ref={formRef}
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <div className="relative">
                            <Label 
                              htmlFor="name" 
                              className={cn(
                                "text-forest-green transition-all duration-200",
                                activeField === 'name' && "text-burnt-orange font-medium"
                              )}
                            >
                              Your Name
                            </Label>
                            <Input 
                              id="name" 
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              onFocus={() => setActiveField('name')}
                              onBlur={() => setActiveField(null)}
                              placeholder="Enter your full name"
                              className="mt-2 border-forest-green/30 focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange/20 transition-all duration-200"
                              required
                            />
                            <div className="absolute -bottom-5 left-0 text-xs text-forest-green/70">
                              How should we address you?
                            </div>
                          </div>

                          <div className="relative">
                            <Label 
                              htmlFor="email" 
                              className={cn(
                                "text-forest-green transition-all duration-200",
                                activeField === 'email' && "text-burnt-orange font-medium"
                              )}
                            >
                              Email Address
                            </Label>
                            <Input 
                              id="email" 
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              onFocus={() => setActiveField('email')}
                              onBlur={() => setActiveField(null)}
                              placeholder="Enter your email"
                              className="mt-2 border-forest-green/30 focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange/20 transition-all duration-200"
                              required
                            />
                            <div className="absolute -bottom-5 left-0 text-xs text-forest-green/70">
                              We'll never share your information
                            </div>
                          </div>

                          <div className="relative">
                            <Label 
                              htmlFor="phone" 
                              className={cn(
                                "text-forest-green transition-all duration-200",
                                activeField === 'phone' && "text-burnt-orange font-medium"
                              )}
                            >
                              Phone Number
                            </Label>
                            <Input 
                              id="phone" 
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              onFocus={() => setActiveField('phone')}
                              onBlur={() => setActiveField(null)}
                              placeholder="Enter your phone number"
                              className="mt-2 border-forest-green/30 focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange/20 transition-all duration-200"
                            />
                            <div className="absolute -bottom-5 left-0 text-xs text-forest-green/70">
                              Optional but helpful for scheduling
                            </div>
                          </div>

                          {isDiscoveryCall && (
                            <div className="relative">
                              <Label 
                                htmlFor="timePreference" 
                                className={cn(
                                  "text-forest-green transition-all duration-200",
                                  activeField === 'timePreference' && "text-burnt-orange font-medium"
                                )}
                              >
                                Preferred Call Time
                              </Label>
                              <Select 
                                value={formData.timePreference} 
                                onValueChange={handleSelectChange}
                              >
                                <SelectTrigger 
                                  className="mt-2 border-forest-green/30 focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange/20 transition-all duration-200"
                                  onFocus={() => setActiveField('timePreference')}
                                  onBlur={() => setActiveField(null)}
                                >
                                  <SelectValue placeholder="Select preferred time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                                  <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                                  <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {!isDiscoveryCall && (
                            <div className="relative">
                              <Label 
                                htmlFor="subject" 
                                className={cn(
                                  "text-forest-green transition-all duration-200",
                                  activeField === 'subject' && "text-burnt-orange font-medium"
                                )}
                              >
                                Subject
                              </Label>
                              <Input 
                                id="subject" 
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                onFocus={() => setActiveField('subject')}
                                onBlur={() => setActiveField(null)}
                                placeholder="What's on your mind?"
                                className="mt-2 border-forest-green/30 focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange/20 transition-all duration-200"
                                required
                              />
                            </div>
                          )}

                          <div className="relative">
                            <Label 
                              htmlFor="message" 
                              className={cn(
                                "text-forest-green transition-all duration-200",
                                activeField === 'message' && "text-burnt-orange font-medium"
                              )}
                            >
                              {isDiscoveryCall ? "Tell us about your journey" : "Message"}
                            </Label>
                            <Textarea 
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              onFocus={() => setActiveField('message')}
                              onBlur={() => setActiveField(null)}
                              placeholder={isDiscoveryCall 
                                ? "What's calling you to this work? What would you like to explore during our call?"
                                : "Share what's calling you to this work..."
                              }
                              className="mt-2 min-h-[120px] border-forest-green/30 focus:border-burnt-orange focus:ring-1 focus:ring-burnt-orange/20 transition-all duration-200"
                              required
                            />
                            <div className="absolute -bottom-5 left-0 text-xs text-forest-green/70">
                              {isDiscoveryCall 
                                ? "What's calling you to this work?" 
                                : "Your journey matters to us"
                              }
                            </div>
                          </div>
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-burnt-orange to-faded-rust hover:from-burnt-orange/90 hover:to-faded-rust/90 text-white py-6 text-lg font-medium relative overflow-hidden group"
                        >
                          <span className="relative z-10 flex items-center justify-center w-full">
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                                {isDiscoveryCall ? "Scheduling..." : "Sending..."}
                              </>
                            ) : (
                              <>
                                {isDiscoveryCall ? "Request Discovery Call" : "Send Message"}
                                <Send className="w-5 h-5 ml-3 transform transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </span>
                          <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                        </Button>

                        {isDiscoveryCall && (
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={() => setIsDiscoveryCall(false)}
                            className="w-full mt-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white hover:border-forest-green/90"
                          >
                            Send Regular Message Instead
                          </Button>
                        )}
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-10"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                          <Check className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="font-serif text-2xl text-ink-blue mb-2">
                          Thank You!
                        </h3>
                        <p className="text-forest-green mb-6 max-w-md mx-auto">
                          {isDiscoveryCall 
                            ? "Your discovery call request has been received. We'll be in touch within 24 hours to confirm the details."
                            : "Your message has been sent successfully. We'll get back to you as soon as possible."
                          }
                        </p>
                        <Button
                          onClick={() => {
                            setFormSubmitted(false);
                            formRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-burnt-orange hover:bg-burnt-orange/90 text-white"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}