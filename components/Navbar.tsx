import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants.tsx';
import { AppSection } from '../types.ts';

import logoImg from './ris-logo.png';

interface NavbarProps {
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', value: AppSection.HOME },
    { label: 'Products', value: AppSection.PRODUCTS },
    { label: 'Contact', value: AppSection.CONTACT },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-stone-950/95 backdrop-blur-xl border-b border-stone-800 py-4 shadow-2xl'
        : 'bg-transparent py-8'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <div className="flex justify-between items-center">

          {/* LOGO (ABSOLUTE – DOES NOT AFFECT NAVBAR HEIGHT) */}
          <div
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => onNavigate(AppSection.HOME)}
          >
            <img
              src={logoImg}
              alt="RIS Logo"
              className="h-20 md:h-24 w-auto object-contain"
            />
          </div>

          {/* Spacer to keep layout balanced */}
          <div className="w-24 md:w-32" />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.value)}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:text-emerald-400 ${currentSection === item.value
                  ? 'text-emerald-500'
                  : 'text-stone-300'
                  }`}
              >
                {item.label}
              </button>
            ))}

            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10 active:scale-95">
              Where to Buy
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-400 hover:text-white transition-colors p-2"
            >
              {isOpen ? <ICONS.X /> : <ICONS.Menu />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 shadow-2xl">
          <div className="px-6 pt-4 pb-8 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-4 text-[10px] font-bold uppercase tracking-widest ${currentSection === item.value
                  ? 'text-emerald-500 bg-emerald-500/5'
                  : 'text-stone-400'
                  } rounded-2xl transition-all`}
              >
                {item.label}
              </button>
            ))}

            <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest mt-4">
              Where to Buy
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
