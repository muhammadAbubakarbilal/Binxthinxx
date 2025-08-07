
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Clock, DollarSign } from "lucide-react";

export default function BookingWildroot() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: ""
  });

  const service = {
    name: "Wildroot Intensive",
    price: 3997,
    duration: "6 months",
    description: "6-Month Identity Reclamation Journey",
    features: [
      "12 bi-weekly 1:1 coaching sessions (90 minutes each)",
      "Access to Shadow Lounge community for 6 months",
      "Weekly Sunday Reset rituals and practices",
      "Personalized identity reclamation toolkit",
      "Voxer support between sessions",
      "Bonus: The Disruption masterclass series"
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/payment");
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-candlelight-beige">
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setLocation('/booking')}
            className="mb-6 border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </div>
      </div>

      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="mb-8">
              <CardHeader className="bg-gradient-to-r from-burnt-orange to-faded-rust text-white">
                <CardTitle className="font-serif text-3xl">{service.name}</CardTitle>
                <CardDescription className="text-white/90 text-lg">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-burnt-orange" />
                    <div>
                      <div className="font-bold text-2xl text-ink-blue">${service.price.toLocaleString()}</div>
                      <div className="text-forest-green text-sm">Investment</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-burnt-orange" />
                    <div>
                      <div className="font-bold text-xl text-ink-blue">{service.duration}</div>
                      <div className="text-forest-green text-sm">Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-burnt-orange" />
                    <div>
                      <div className="font-bold text-xl text-ink-blue">12 Sessions</div>
                      <div className="text-forest-green text-sm">Included</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-serif text-xl text-ink-blue mb-4">What's Included:</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-forest-green">
                        <div className="w-2 h-2 bg-burnt-orange rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-ink-blue">Book Your Journey</CardTitle>
                <CardDescription>
                  Fill out the form below to schedule your Wildroot Intensive journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="border-forest-green/30 focus:border-burnt-orange"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="border-forest-green/30 focus:border-burnt-orange"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="border-forest-green/30 focus:border-burnt-orange"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Start Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        min={today}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                        className="border-forest-green/30 focus:border-burnt-orange"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your journey (optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="What draws you to this work? What are you hoping to transform?"
                      className="min-h-[120px] border-forest-green/30 focus:border-burnt-orange"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-6 bg-burnt-orange hover:bg-burnt-orange/90 text-white text-lg font-medium"
                  >
                    Proceed to Payment - ${service.price.toLocaleString()}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
