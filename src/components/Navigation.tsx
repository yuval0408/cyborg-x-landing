import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShieldAlert } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Technology', href: '#tech' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  // Track scroll position to trigger glassmorphic styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active section detection
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const targetId = item.href.slice(1);
        const element = document.getElementById(targetId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(targetId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled 
            ? 'py-4 bg-[#050816]/75 backdrop-blur-[40px] border-b border-white/5 shadow-[0_8px_32px_rgba(0,245,255,0.03)]' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-display text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:opacity-90 transition-opacity"
          >
            CYBORG-X
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-sans text-sm font-medium tracking-wide transition-colors relative py-1.5 ${
                    isActive ? 'text-cyber-cyan' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyber-cyan shadow-[0_0_8px_#00f5ff]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:block">
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(0, 245, 255, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-cyber-cyan to-cyber-purple text-[#050816] font-display font-bold py-2.5 px-6 rounded-full text-sm tracking-wide"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-[#050816]/95 backdrop-blur-[60px] border-l border-white/5 z-40 p-8 pt-24 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-8 flex flex-col">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`font-display text-xl font-medium tracking-wide transition-colors ${
                      isActive ? 'text-cyber-cyan' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            <div className="space-y-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center block bg-gradient-to-r from-cyber-cyan to-cyber-purple text-[#050816] font-display font-bold py-3 px-6 rounded-full text-base"
              >
                Get Started
              </a>
              <div className="text-center font-mono text-[10px] text-gray-500 flex items-center justify-center gap-1">
                <ShieldAlert className="w-3 h-3 text-cyber-cyan" /> TERMINAL OVERRIDE ENABLED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
