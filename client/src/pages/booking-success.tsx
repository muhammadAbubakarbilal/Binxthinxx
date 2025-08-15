import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { CheckCircle, Calendar, Mail, Phone, Home, MessageCircle } from "lucide-react";

export default function BookingSuccess() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-candlelight-beige">
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-black dark:text-white mb-4">
              Your Journey Begins Here
            </h1>
            <p className="text-xl text-black dark:text-white max-w-2xl mx-auto">
              Thank you for taking this brave step toward reclaiming your authentic self. 
              Your booking has been confirmed and the transformation work awaits.
            </p>
          </div>

          {/* What Happens Next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-black dark:text-white text-center">
                What Happens Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-burnt-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-burnt-orange" />
                  </div>
                  <h3 className="font-serif text-lg text-black dark:text-white mb-2">Confirmation Email</h3>
                  <p className="text-sm text-black dark:text-white">
                    Check your inbox for detailed session information and preparation materials.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-burnt-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-burnt-orange" />
                  </div>
                  <h3 className="font-serif text-lg text-black dark:text-white mb-2">Calendar Invite</h3>
                  <p className="text-sm text-black dark:text-white">
                    You'll receive a calendar invitation with Zoom link and session details.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-burnt-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-burnt-orange" />
                  </div>
                  <h3 className="font-serif text-lg text-black dark:text-white mb-2">Pre-Session Call</h3>
                  <p className="text-sm text-black dark:text-white">
                    We may reach out for a brief pre-session conversation to ensure we're prepared.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-burnt-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-burnt-orange" />
                  </div>
                  <h3 className="font-serif text-lg text-black dark:text-white mb-2">Begin the Work</h3>
                  <p className="text-sm text-black dark:text-white">
                    Show up authentically, ready to explore what's beneath the performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preparation Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-black dark:text-white">
                Preparing for Your Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-serif text-lg text-black dark:text-white mb-3">Before We Meet</h3>
                  <ul className="space-y-2 text-black dark:text-white">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                      <span>Complete the pre-session questionnaire (sent via email)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                      <span>Find a private, comfortable space for our call</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                      <span>Test your Zoom connection and audio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                      <span>Have a journal or notepad available</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-black dark:text-white mb-3">Mindset & Intention</h3>
                  <ul className="space-y-2 text-black dark:text-white">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                      <span>Come as you are - authenticity over perfection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                      <span>Be prepared for gentle but deep exploration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                      <span>Trust the process and your own wisdom</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-burnt-orange mt-1 flex-shrink-0" />
                      <span>Remember: this is your time and space</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-white">
                Questions or Concerns?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black dark:text-white mb-4">
                If you have any questions about your booking or need to reschedule, please don't hesitate to reach out. 
                We're here to support you in this important work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setLocation('/contact')}
                  variant="outline"
                  className="border-forest-green text-black dark:text-white hover:bg-forest-green hover:text-white"
                >
                  Contact Us
                </Button>
                <Button 
                  onClick={() => setLocation('/')}
                  className="bg-burnt-orange hover:bg-burnt-orange/90 text-black dark:text-white"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inspirational Quote */}
          <div className="text-center py-12">
            <blockquote className="font-serif text-2xl md:text-3xl text-black dark:text-white mb-4 italic max-w-3xl mx-auto">
              "The cave you fear to enter holds the treasure you seek."
            </blockquote>
            <p className="text-black dark:text-white">— Joseph Campbell</p>
          </div>
        </div>
      </div>
    </div>
  );
}