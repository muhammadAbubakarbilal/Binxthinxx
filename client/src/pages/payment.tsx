import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Lock, CheckCircle, AlertCircle } from "lucide-react";

interface BookingData {
  name: string;
  email: string;
  phone?: string;
  preferredDate: string;
  timeSlot: string;
  notes?: string;
  serviceId: string;
  serviceName: string;
  totalAmount: number;
}

export default function Payment() {
  const [, setLocation] = useLocation();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  const handleBack = () => {
    const params = new URLSearchParams();
    if (bookingData?.serviceId) {
      params.set('service', bookingData.serviceId);
    }
    setLocation(`/pricing?${params.toString()}`);
  };

  const handlePayment = async () => {
    if (!bookingData) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment
      setPaymentComplete(true);
      
      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed. Check your email for details.",
      });

      // Clear booking data
      sessionStorage.removeItem('bookingData');

      // Redirect to success page after a delay
      setTimeout(() => {
        setLocation('/booking-success');
      }, 3000);

    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-candlelight-beige flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-ink-blue mb-4">No Booking Found</h1>
          <p className="text-forest-green mb-6">Please complete the booking form first.</p>
          <Button onClick={() => setLocation('/booking')} className="bg-burnt-orange hover:bg-burnt-orange/90 text-white">
            Start Booking
          </Button>
        </div>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-candlelight-beige flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-4xl text-ink-blue mb-4">Payment Successful!</h1>
          <p className="text-xl text-forest-green mb-6">
            Your booking for <strong>{bookingData.serviceName}</strong> has been confirmed.
          </p>
          <p className="text-forest-green mb-8">
            You will receive a confirmation email shortly with all the details and next steps.
          </p>
          <Button onClick={() => setLocation('/')} className="bg-burnt-orange hover:bg-burnt-orange/90 text-white">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-candlelight-beige">
      {/* Navigation */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="mb-6 border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
            disabled={isProcessing}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Booking Details
          </Button>
        </div>
      </div>

      <div className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-ink-blue flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-serif text-xl text-ink-blue mb-2">{bookingData.serviceName}</h3>
                    <p className="text-forest-green">Investment: <span className="font-bold text-burnt-orange text-xl">${bookingData.totalAmount.toLocaleString()}</span></p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-ink-blue">Contact Information</h4>
                    <div className="space-y-1 text-forest-green">
                      <p><strong>Name:</strong> {bookingData.name}</p>
                      <p><strong>Email:</strong> {bookingData.email}</p>
                      {bookingData.phone && <p><strong>Phone:</strong> {bookingData.phone}</p>}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-ink-blue">Session Details</h4>
                    <div className="space-y-1 text-forest-green">
                      <p><strong>Preferred Date:</strong> {new Date(bookingData.preferredDate).toLocaleDateString()}</p>
                      <p><strong>Time Slot:</strong> {bookingData.timeSlot}</p>
                      {bookingData.notes && (
                        <div>
                          <strong>Notes:</strong>
                          <p className="mt-1 italic">{bookingData.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-ink-blue flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Secure Payment
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-forest-green">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mock Payment Form */}
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-yellow-800 font-medium">Demo Mode</p>
                          <p className="text-sm text-yellow-700">
                            This is a demonstration. In the live version, you would enter your payment details here. 
                            Click "Complete Payment" to simulate the booking process.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mock Credit Card Form */}
                    <div className="space-y-4 opacity-60">
                      <div>
                        <label className="block text-sm font-medium text-ink-blue mb-2">Card Number</label>
                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                          **** **** **** 4242
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-ink-blue mb-2">Expiry Date</label>
                          <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                            MM/YY
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ink-blue mb-2">CVC</label>
                          <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                            ***
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink-blue mb-2">Name on Card</label>
                        <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                          {bookingData.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-forest-green">Total Amount:</span>
                      <span className="font-bold text-2xl text-burnt-orange">
                        ${bookingData.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    <Button 
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-burnt-orange hover:bg-burnt-orange/90 text-white py-6 text-lg"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Complete Payment
                          <Lock className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-forest-green text-center">
                      By completing this payment, you agree to our terms of service and privacy policy.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}