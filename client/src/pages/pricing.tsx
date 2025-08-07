import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

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
    description: "6-Month Identity Reclamation Journey"
  },
  "one-on-one-coaching": {
    name: "1:1 Coaching Sessions",
    price: 350,
    duration: "90 minutes",
    description: "Individual Deep Dive Sessions"
  },
  "shadow-lounge": {
    name: "Shadow Lounge Membership",
    price: 97,
    duration: "Monthly",
    description: "Monthly Community Experience"
  },
  "sunday-reset": {
    name: "Sunday Reset Ritual",
    price: 47,
    duration: "Weekly",
    description: "Weekly Recalibration Practice"
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
    const params = new URLSearchParams(location.split('?')[1] || '');
    const serviceParam = params.get('service');
    if (serviceParam && services[serviceParam as keyof typeof services]) {
      setSelectedService(serviceParam);
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
    setLocation('/booking');
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-candlelight-beige flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-ink-blue mb-4">Service Not Found</h1>
          <p className="text-forest-green mb-6">Please select a service from our offerings.</p>
          <Button onClick={() => setLocation('/booking')} className="bg-burnt-orange hover:bg-burnt-orange/90 text-white">
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
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Service Summary */}
            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-ink-blue">
                    {service.name}
                  </CardTitle>
                  <p className="text-faded-rust text-lg">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-forest-green">Duration:</span>
                      <span className="font-medium text-ink-blue">{service.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-forest-green">Investment:</span>
                      <span className="text-2xl font-bold text-burnt-orange">
                        ${service.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What Happens Next */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-ink-blue">
                    What Happens Next
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-burnt-orange mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-ink-blue">Submit Your Information</p>
                        <p className="text-sm text-forest-green">Complete the booking form with your details</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-burnt-orange mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-ink-blue">Secure Payment</p>
                        <p className="text-sm text-forest-green">Complete your investment securely online</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-burnt-orange mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-ink-blue">Confirmation & Preparation</p>
                        <p className="text-sm text-forest-green">Receive confirmation email with session details and prep materials</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-burnt-orange mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-ink-blue">Begin Your Journey</p>
                        <p className="text-sm text-forest-green">Start your identity reclamation work</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-ink-blue">
                    Book Your Session
                  </CardTitle>
                  <p className="text-forest-green">
                    Share your details and we'll confirm your booking within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ink-blue">Full Name *</FormLabel>
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
                            <FormLabel className="text-ink-blue">Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="Enter your email address" 
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
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ink-blue">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
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
                            <FormLabel className="text-ink-blue">Preferred Date *</FormLabel>
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

                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-ink-blue">Preferred Time *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-forest-green/30 focus:border-burnt-orange">
                                  <SelectValue placeholder="Select a time slot" />
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
                            <FormLabel className="text-ink-blue">Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Share anything that would help us prepare for your session..."
                                rows={4}
                                {...field}
                                className="border-forest-green/30 focus:border-burnt-orange resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-burnt-orange hover:bg-burnt-orange/90 text-white py-6 text-lg"
                      >
                        Proceed to Payment
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}