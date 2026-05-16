import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, Home, Phone, MapPin, Info, LayoutGrid } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Início', path: '#inicio', icon: <Home size={18} /> },
    { name: 'Propriedades', path: '#propriedades', icon: <LayoutGrid size={18} /> },
    { name: 'Sobre', path: '#sobre', icon: <Info size={18} /> },
    { name: 'Localização', path: '#localizacao', icon: <MapPin size={18} /> },
    { name: 'Contato', path: '#contato', icon: <Phone size={18} /> },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 flex items-center px-4 md:px-8 lg:px-12',
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm' 
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group" onClick={(e) => scrollToSection(e as any, '#inicio')}>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform group-hover:scale-105">
              M
            </div>
            <span className={cn(
              "text-base md:text-lg font-bold tracking-tight uppercase whitespace-nowrap",
              isScrolled ? "text-slate-900" : "text-white"
            )}>
              MACEIÓ<span className="font-light text-sky-500">PRIME</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center flex-nowrap ml-auto gap-x-[clamp(1rem,2vw,2.5rem)]">
            <div className="flex items-center gap-x-[clamp(1rem,1.5vw,2rem)] whitespace-nowrap">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => scrollToSection(e, link.path)}
                  className={cn(
                    "relative group text-[clamp(10px,0.8vw,12px)] font-bold tracking-[0.15em] uppercase transition-colors py-2",
                    isScrolled ? "text-slate-600" : "text-white/90",
                    "hover:text-sky-500"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[2px] bg-sky-500 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                  )} />
                </a>
              ))}
            </div>
            <button 
              onClick={(e) => scrollToSection(e as any, '#contato')}
              className="btn-premium whitespace-nowrap shrink-0 text-xs px-6 py-2.5"
            >
              Agendar Visita
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "lg:hidden p-2.5 rounded-xl transition-all active:scale-95 z-[60]",
              isScrolled ? "bg-slate-100 text-slate-900" : "bg-white/10 backdrop-blur-md text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[60] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-sky-600 rounded flex items-center justify-center text-white font-bold">M</div>
                  <span className="font-bold text-slate-900 tracking-tight">MENU</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.path}
                      onClick={(e) => scrollToSection(e, link.path)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl transition-all font-semibold",
                        "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span className={cn(
                        "p-2 rounded-lg",
                        "bg-slate-100/50"
                      )}>
                        {link.icon}
                      </span>
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 border-t border-slate-100">
                <button 
                  onClick={(e) => scrollToSection(e as any, '#contato')}
                  className="w-full btn-premium py-4 rounded-2xl shadow-xl shadow-sky-100"
                >
                  Agendar Visita
                </button>
                <p className="text-center text-slate-400 text-xs mt-6 font-medium uppercase tracking-widest">
                  Maceió Prime © 2024
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
