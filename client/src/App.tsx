import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Testimonials from "@/pages/testimonials";
import Contact from "@/pages/contact";
import Booking from "@/pages/booking";
import Pricing from "@/pages/pricing";
import Payment from "@/pages/payment";
import BookingSuccess from "@/pages/booking-success";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/contact" component={Contact} />
        <Route path="/booking" component={Booking} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/payment" component={Payment} />
        <Route path="/booking-success" component={BookingSuccess} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-candlelight-beige dark:bg-ink-blue">
          <Navigation />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;