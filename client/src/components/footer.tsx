import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-ink-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair font-bold text-xl mb-4">Binxthinxx</h3>
            <p className="text-white/80 leading-relaxed">
              Identity Reclamation Platform for high-functioning women ready to live from authenticity instead of performance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-burnt-orange transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-burnt-orange transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-burnt-orange transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-white/80 hover:text-burnt-orange transition-colors duration-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-burnt-orange transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-burnt-orange transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-burnt-orange transition-colors duration-300"
                aria-label="Threads"
              >
                <i className="fab fa-threads"></i>
              </a>
            </div>
            <p className="text-white/60 text-sm">© 2024 Binxthinxx. All rights reserved.</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            Trauma-Informed • ICF Certified • 10+ Years Experience
          </p>
        </div>
      </div>
    </footer>
  );
}