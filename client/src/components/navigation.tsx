import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";


export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <motion.nav 
      className="bg-ink-blue dark:bg-ink-blue/95 text-white sticky top-0 z-50 shadow-lg backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <motion.h1 
                className="font-playfair font-bold text-xl cursor-pointer hover:text-burnt-orange transition-colors duration-300 interactive"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Binxthinxx
              </motion.h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={`interactive relative hover:text-burnt-orange transition-colors duration-300 font-medium ${
                      isActiveLink(link.href) ? "text-burnt-orange" : ""
                    }`}
                  >
                    <motion.span
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>
                    {isActiveLink(link.href) && (
                      <motion.div
                        className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-burnt-orange"
                        layoutId="activeNavLink"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Book Now Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/booking">
                <motion.button
                  className="interactive bg-burnt-orange hover:bg-burnt-orange/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </Link>
            </motion.div>

            {/* Theme Toggle */}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="interactive text-white hover:text-burnt-orange transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <motion.i 
                className={`${isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'} text-xl`}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Enhanced with Animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-ink-blue/95 border-t border-forest-green backdrop-blur-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="px-2 pt-2 pb-3 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`interactive block px-3 py-2 hover:text-burnt-orange transition-colors duration-300 ${
                      isActiveLink(link.href) ? "text-burnt-orange bg-burnt-orange/10 rounded-lg" : ""
                    }`}
                  >
                    <motion.span
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Book Now Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * navLinks.length, duration: 0.3 }}
                className="pt-2"
              >
                <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    className="interactive bg-burnt-orange hover:bg-burnt-orange/90 text-white px-3 py-2 rounded-lg font-medium transition-all duration-300 text-center"
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}