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
            {/* Logo (reduced size) */}
            <div className="h-24 md:h-20 w-auto -ml-1">
              <img
                src={logoImg}
                alt="RIS Logo"
                className="h-full w-auto object-contain block"
              />
            </div>

            {/* Description (aligned with logo) */}
            <p className="text-stone-400 font-light mt-6 max-w-xs leading-relaxed">
              Crafting premium, authentic Kerala breakfast
              experiences since 2022.
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
              <li className="flex items-center justify-end mt-5">
                <a
                  href="https://wa.me/919072336333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-stone-300 hover:text-white transition-colors group px-3 py-1.5 rounded-full hover:bg-stone-900 border border-transparent hover:border-stone-800"
                >
                  <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-6 h-6 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase mt-0.5">WhatsApp Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 md:mt-20 pt-6 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="text-[10px] text-stone-600 uppercase tracking-[0.3em] font-bold">
            © 2022 Emmanuel Food Products
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
