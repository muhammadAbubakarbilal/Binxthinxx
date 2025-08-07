
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function BookingWildroot() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation('/pricing?service=wildroot-intensive');
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-candlelight-beige flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-burnt-orange mx-auto mb-4"></div>
        <p className="text-forest-green">Redirecting to booking...</p>
      </div>
    </div>
  );
}
