
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Clock, DollarSign } from "lucide-react";

export default function BookingSunday() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: ""
  });

  const service = {
    name: "Sunday Reset Ritual",
    price: 47,
    duration: "Weekly",
    description: "Weekly Recalibration Practice",
    features: [
      "Weekly video transmissions",
      "Ritual design templates",
      "Community sharing space",
      "Monthly live Q&A sessions",
      "Intention setting practices",
      "Weekly reflection prompts"
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
              <CardHeader className="bg-gradient-to-r from-burnt-orange to-forest-green text-white">
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
                      <div className="font-bold text-2xl text-ink-blue">${service.price}</div>
                      <div className="text-forest-green text-sm">Weekly</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-burnt-orange" />
                    <div>
                      <div className="font-bold text-xl text-ink-blue">Sundays</div>
                      <div className="text-forest-green text-sm">Every Week</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-burnt-orange" />
                    <div>
                      <div className="font-bold text-xl text-ink-blue">Ongoing</div>
                      <div className="text-forest-green text-sm">Subscription</div>
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
                <CardTitle className="font-serif text-2xl text-ink-blue">Start Your Sunday Reset</CardTitle>
                <CardDescription>
                  Begin your weekly ritual for intentional living.
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
                    <Label htmlFor="message">What intentions do you want to cultivate? (optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Share what you'd like to bring more intention to in your life..."
                      className="min-h-[120px] border-forest-green/30 focus:border-burnt-orange"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-6 bg-burnt-orange hover:bg-burnt-orange/90 text-white text-lg font-medium"
                  >
                    Start Weekly Reset - ${service.price}/week
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
