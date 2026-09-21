import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenConnect: () => void;
  onOpenBlog?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConnect,
  onOpenBlog,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'featured', 'experience', 'interests', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#featured', id: 'featured' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Blog', href: '#blog', id: 'blog' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: (typeof navLinks)[0]) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (link.id === 'blog' && onOpenBlog) {
      onOpenBlog();
      return;
    }
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[76px] flex items-center ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-black/[0.05] shadow-[0_2px_16px_rgba(0,0,0,0.03)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1240px] w-full mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Brand / Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, navLinks[0])}
          className="font-bold text-[19px] text-[#0B0F17] tracking-tight hover:opacity-80 transition-opacity"
        >
          Xindi Wang
        </a>

        {/* Center: Minimalist Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-9">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-[13.5px] transition-colors duration-150 ${
                  isActive
                    ? 'font-semibold text-[#0B0F17]'
                    : 'font-medium text-[#4B5563] hover:text-[#0B0F17]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Let's Connect CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConnect}
            id="nav-connect-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0F17] hover:bg-[#1E293B] text-white text-xs font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Let's Connect</span>
            <ArrowRight size={13} className="stroke-[2.5]" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#0B0F17] hover:bg-black/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-[76px] inset-x-0 bg-white/95 backdrop-blur-xl border-b border-black/[0.08] p-6 shadow-xl flex flex-col gap-3 z-40"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#0B0F17] hover:bg-[#F3F4F6] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
