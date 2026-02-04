import React from 'react';
import { ICONS } from '../constants.tsx';

import logoImg from './ris-logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-white py-16 md:py-20 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* Brand Section */}
          <div className="flex flex-col items-start">
            {/* Logo (unchanged size & position) */}
            <div className="h-28 md:h-20 w-auto -ml-1">
              <img
                src={logoImg}
                alt="RIS Logo"
                className="h-full w-auto object-contain block"
              />
            </div>

            {/* Description (optically aligned with logo) */}
            <p className="mt-1 pl-7 text-stone-400 text-sm leading-relaxed max-w-sm font-light">
              Crafting authentic Kerala breakfast experiences since 2020.
              From our fields to your morning table.
            </p>
          </div>

          {/* Support Section */}
          <div className="md:text-right">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-6 md:mb-8 text-stone-200">
              Support
            </h4>
            <ul className="space-y-3 text-stone-500 text-sm font-medium">
              <li>VI/61, Mankidiyil Ris Gardens</li>
              <li>Hospital, Jn, Piravom</li>
              <li>Kerala, India 686664</li>
              <li className="text-stone-400">+91 90723 36333</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 md:mt-20 pt-6 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="text-[10px] text-stone-600 uppercase tracking-[0.3em] font-bold">
            © 2020 Emmanuel Food Products
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
