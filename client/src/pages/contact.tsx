import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Heart, Send, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDiscoveryCall, setIsDiscoveryCall] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    toast({
      title: isDiscoveryCall ? "Discovery Call Requested!" : "Message Sent!",
      description: isDiscoveryCall 
        ? "We'll contact you within 24 hours to schedule your complimentary discovery call."
        : "Thank you for reaching out. We'll get back to you soon.",
    });
  };

  const handleScheduleDiscoveryCall = () => {
    setIsDiscoveryCall(true);
  };

  const expectations = [
    "45-minute deep-dive conversation",
    "Explore what's calling you forward", 
    "Discover if we're aligned for the journey"
  ];

  return (
    <section className="py-20 bg-candlelight-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair font-bold text-4xl md:text-5xl text-ink-blue mb-6">
            The Open Door
          </h1>
          <p className="text-xl text-forest-green font-lora italic max-w-2xl mx-auto">
            This isn't just a contact form. It's a declaration: I'm ready for more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Discovery Call Section */}
          <Card className="mb-8 md:col-span-2">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-ink-blue flex items-center gap-2">
                <Calendar className="w-6 h-6 text-burnt-orange" />
                Schedule Your Complimentary Discovery Call
              </CardTitle>
              <p className="text-forest-green">
                Not sure which offering is right for you? Book a 30-minute discovery call to explore your path to authentic living.
              </p>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleScheduleDiscoveryCall}
                className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-4 text-lg"
              >
                Schedule Discovery Call
              </Button>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-ink-blue flex items-center gap-2">
                <Heart className="w-6 h-6 text-burnt-orange" />
                {isDiscoveryCall ? "Discovery Call Request" : "Let's Connect"}
              </CardTitle>
              <p className="text-forest-green">
                {isDiscoveryCall 
                  ? "Tell us a bit about yourself and we'll schedule your complimentary discovery call." 
                  : "Ready to begin your journey? I'd love to hear from you."
                }
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-ink-blue">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name"
                      className="mt-2 border-forest-green/30 focus:border-burnt-orange"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-ink-blue">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="Enter your email"
                      className="mt-2 border-forest-green/30 focus:border-burnt-orange"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-ink-blue">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="Enter your phone number"
                      className="mt-2 border-forest-green/30 focus:border-burnt-orange"
                    />
                  </div>

                  {isDiscoveryCall && (
                    <div>
                      <Label htmlFor="timePreference" className="text-ink-blue">Preferred Call Time</Label>
                      <Select>
                        <SelectTrigger className="mt-2 border-forest-green/30 focus:border-burnt-orange">
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
                    <div>
                      <Label htmlFor="subject" className="text-ink-blue">Subject</Label>
                      <Input 
                        id="subject" 
                        placeholder="What's on your mind?"
                        className="mt-2 border-forest-green/30 focus:border-burnt-orange"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message" className="text-ink-blue">
                      {isDiscoveryCall ? "Tell us about your journey" : "Message"}
                    </Label>
                    <Textarea 
                      id="message"
                      placeholder={isDiscoveryCall 
                        ? "What's calling you to this work? What would you like to explore during our call?"
                        : "Share what's calling you to this work..."
                      }
                      className="mt-2 min-h-[120px] border-forest-green/30 focus:border-burnt-orange"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-burnt-orange hover:bg-burnt-orange/90 text-white py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      {isDiscoveryCall ? "Scheduling..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      {isDiscoveryCall ? "Request Discovery Call" : "Send Message"}
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {isDiscoveryCall && (
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setIsDiscoveryCall(false)}
                    className="w-full mt-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
                  >
                    Send Regular Message Instead
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <div className="hidden lg:block"> {/* Placeholder for potential future content or spacing */}</div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-forest-green/10">
            <h3 className="font-playfair font-bold text-lg text-ink-blue mb-3">What to Expect:</h3>
            <ul className="space-y-2 text-forest-green">
              {expectations.map((expectation, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-check-circle text-burnt-orange mt-1 mr-3"></i>
                  <span>{expectation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}