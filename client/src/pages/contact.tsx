import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please tell us more about what brings you here (at least 10 characters)")
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      // In a real implementation, this would integrate with Google Forms API
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. We'll be in touch soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="font-playfair font-bold text-2xl text-ink-blue mb-8">Ready to Begin?</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-forest-green font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="border-forest-green/30 bg-white focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-forest-green" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-forest-green font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          {...field} 
                          className="border-forest-green/30 bg-white focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage className="text-forest-green" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-forest-green font-semibold">What brings you here?</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={6}
                          className="border-forest-green/30 bg-white focus:ring-2 focus:ring-burnt-orange focus:border-transparent transition-all duration-300 resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-forest-green" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105"
                >
                  {isSubmitting ? "Sending..." : "I'm ready for more"}
                </Button>
              </form>
            </Form>

            {/* Social Icons */}
            <div className="mt-8 flex space-x-4">
              <a 
                href="#" 
                className="w-12 h-12 bg-ink-blue rounded-full flex items-center justify-center text-white hover:bg-burnt-orange transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-ink-blue rounded-full flex items-center justify-center text-white hover:bg-burnt-orange transition-colors duration-300"
                aria-label="Threads"
              >
                <i className="fab fa-threads text-xl"></i>
              </a>
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <h2 className="font-playfair font-bold text-2xl text-ink-blue mb-8">Book Your Discovery Call</h2>

            {/* Calendly Widget Placeholder */}
            <div className="bg-white p-8 rounded-xl shadow-lg min-h-96 flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-burnt-orange rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                  <i className="fas fa-calendar-alt text-white text-2xl"></i>
                </div>
                <p className="font-playfair text-xl text-ink-blue mb-4">Schedule Your Call</p>
                <p className="text-forest-green mb-6">Choose a time that works for your transformation</p>
                <Button className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                  View Available Times
                </Button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg border border-forest-green/20">
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
      </div>
    </section>
  );
}
