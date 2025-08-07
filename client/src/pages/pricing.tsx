
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, ArrowLeft, DollarSign, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

const services = {
  "wildroot-intensive": {
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
  },
  "one-on-one-coaching": {
    name: "1:1 Coaching Sessions",
    price: 350,
    duration: "90 minutes",
    description: "Individual Deep Dive Sessions",
    features: [
      "90-minute deep dive coaching session",
      "Pre-session preparation guide",
      "Session recording for your reference",
      "Follow-up integration practices",
      "Option to add additional sessions"
    ]
  },
  "shadow-lounge": {
    name: "Shadow Lounge Membership",
    price: 97,
    duration: "Monthly",
    description: "Monthly Community Experience",
    features: [
      "Monthly group shadow work sessions",
      "Private community access",
      "Monthly integration calls",
      "Shadow work toolkit",
      "Peer support network",
      "Guest expert sessions"
    ]
  },
  "sunday-reset": {
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
  }
};

const timeSlots = [
  "9:00 AM - 10:30 AM",
  "11:00 AM - 12:30 PM",
  "1:00 PM - 2:30 PM",
  "3:00 PM - 4:30 PM",
  "5:00 PM - 6:30 PM",
  "7:00 PM - 8:30 PM"
];

export default function Pricing() {
  const [location, setLocation] = useLocation();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      timeSlot: "",
      notes: "",
    },
  });

  useEffect(() => {
    const urlParts = location.split('?');
    if (urlParts.length > 1) {
      const params = new URLSearchParams(urlParts[1]);
      const serviceParam = params.get('service');
      if (serviceParam && services[serviceParam as keyof typeof services]) {
        setSelectedService(serviceParam);
      }
    }
  }, [location]);

  const service = selectedService ? services[selectedService as keyof typeof services] : null;

  const onSubmit = (data: BookingFormData) => {
    if (!service) return;

    // Store booking data in sessionStorage for the payment page
    const bookingData = {
      ...data,
      serviceId: selectedService,
      serviceName: service.name,
      totalAmount: service.price,
    };

    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    setLocation('/payment');
  };

  const handleBack = () => {
    setLocation('/services');
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-candlelight-beige flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-ink-blue mb-4">Service Not Found</h1>
          <p className="text-forest-green mb-6">Please select a service from our offerings.</p>
          <Button onClick={() => setLocation('/services')} className="bg-burnt-orange hover:bg-burnt-orange/90 text-white">
            View Services
          </Button>
        </div>
      </div>
    );
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-candlelight-beige">
      {/* Navigation */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handleBack}
            className="mb-6 border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </div>
      </div>

      <div className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Service Details Card */}
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
                      <div className="font-bold text-xl text-ink-blue">Premium</div>
                      <div className="text-forest-green text-sm">Experience</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-serif text-xl text-ink-blue mb-4">What's Included:</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-forest-green">
                        <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-ink-blue">Schedule Your Session</CardTitle>
                <CardDescription>
                  Choose your preferred date and time to begin your transformation journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                className="border-forest-green/30 focus:border-burnt-orange"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Enter your email" 
                                {...field} 
                                className="border-forest-green/30 focus:border-burnt-orange"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your phone number" 
                                {...field} 
                                className="border-forest-green/30 focus:border-burnt-orange"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date *</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                min={today}
                                {...field} 
                                className="border-forest-green/30 focus:border-burnt-orange"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="timeSlot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Time Slot *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-forest-green/30 focus:border-burnt-orange">
                                <SelectValue placeholder="Select your preferred time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share anything you'd like us to know about your journey..."
                              className="min-h-[100px] border-forest-green/30 focus:border-burnt-orange"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-t pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="font-serif text-xl text-ink-blue">Total Investment</h3>
                          <p className="text-forest-green">One-time payment</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-3xl text-burnt-orange">${service.price.toLocaleString()}</div>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full py-6 bg-burnt-orange hover:bg-burnt-orange/90 text-white text-lg font-medium"
                      >
                        Proceed to Payment - ${service.price.toLocaleString()}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
