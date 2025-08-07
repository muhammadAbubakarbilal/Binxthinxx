
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

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
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "",
    city: "",
    zipCode: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      // Redirect to services if no booking data
      setLocation('/services');
    }
  }, [setLocation]);

  const handleBack = () => {
    const params = new URLSearchParams();
    if (bookingData?.serviceId) {
      params.set('service', bookingData.serviceId);
    }
    setLocation(`/pricing?${params.toString()}`);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

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
      }, 2000);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-candlelight-beige flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-ink-blue mb-4">No Booking Found</h1>
          <p className="text-forest-green mb-6">Please start a new booking.</p>
          <Button onClick={() => setLocation('/services')} className="bg-burnt-orange hover:bg-burnt-orange/90 text-white">
            View Services
          </Button>
        </div>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-candlelight-beige flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl text-ink-blue mb-4">Payment Successful!</h1>
          <p className="text-forest-green mb-6">Your booking has been confirmed. Redirecting...</p>
        </motion.div>
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

                  <div className="space-y-2">
                    <h4 className="font-medium text-ink-blue">Contact Information</h4>
                    <p className="text-forest-green"><strong>Name:</strong> {bookingData.name}</p>
                    <p className="text-forest-green"><strong>Email:</strong> {bookingData.email}</p>
                    {bookingData.phone && <p className="text-forest-green"><strong>Phone:</strong> {bookingData.phone}</p>}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium text-ink-blue">Session Details</h4>
                    <p className="text-forest-green"><strong>Date:</strong> {new Date(bookingData.preferredDate).toLocaleDateString()}</p>
                    <p className="text-forest-green"><strong>Time:</strong> {bookingData.timeSlot}</p>
                  </div>

                  {bookingData.notes && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <h4 className="font-medium text-ink-blue">Additional Notes</h4>
                        <p className="text-forest-green text-sm">{bookingData.notes}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl text-ink-blue flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>
                    Your payment information is secure and encrypted.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentForm.cardNumber}
                        onChange={(e) => setPaymentForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                        maxLength={19}
                        required
                        disabled={isProcessing}
                        className="border-forest-green/30 focus:border-burnt-orange"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentForm.expiryDate}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                          maxLength={5}
                          required
                          disabled={isProcessing}
                          className="border-forest-green/30 focus:border-burnt-orange"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentForm.cvv}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, cvv: e.target.value }))}
                          maxLength={3}
                          required
                          disabled={isProcessing}
                          className="border-forest-green/30 focus:border-burnt-orange"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        placeholder="John Doe"
                        value={paymentForm.nameOnCard}
                        onChange={(e) => setPaymentForm(prev => ({ ...prev, nameOnCard: e.target.value }))}
                        required
                        disabled={isProcessing}
                        className="border-forest-green/30 focus:border-burnt-orange"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Input
                        id="billingAddress"
                        placeholder="123 Main Street"
                        value={paymentForm.billingAddress}
                        onChange={(e) => setPaymentForm(prev => ({ ...prev, billingAddress: e.target.value }))}
                        required
                        disabled={isProcessing}
                        className="border-forest-green/30 focus:border-burnt-orange"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={paymentForm.city}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, city: e.target.value }))}
                          required
                          disabled={isProcessing}
                          className="border-forest-green/30 focus:border-burnt-orange"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="10001"
                          value={paymentForm.zipCode}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, zipCode: e.target.value }))}
                          required
                          disabled={isProcessing}
                          className="border-forest-green/30 focus:border-burnt-orange"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-forest-green bg-green-50 p-3 rounded-lg">
                      <Lock className="w-4 h-4" />
                      <span>Your payment information is secured with 256-bit SSL encryption</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="font-serif text-lg text-ink-blue">Total Amount:</span>
                      <span className="font-bold text-2xl text-burnt-orange">${bookingData.totalAmount.toLocaleString()}</span>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full py-6 bg-burnt-orange hover:bg-burnt-orange/90 text-white text-lg font-medium"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing Payment...
                        </>
                      ) : (
                        `Complete Payment - $${bookingData.totalAmount.toLocaleString()}`
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
