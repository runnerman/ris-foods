import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Layer - High Visibility Heritage Food Texture */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1585816561202-e98fe10d8025?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover brightness-[0.45] saturate-[1.1]"
          alt="Kerala Heritage Background"
        />
        {/* Softened Gradient Overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/10 to-transparent"></div>
        {/* Background Glow */}
        <div className="absolute top-[30%] left-[5%] w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24">

        {/* Left Content - Refined "Appropriate" Font Sizes */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center lg:text-left"
        >


          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.05] tracking-tight mb-8">
            Taste the <br />
            <span className="text-emerald-500 italic">Heritage.</span>
          </h1>

          <p className="text-stone-300 text-lg md:text-xl font-light max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12 opacity-90">
            Crafting the finest breakfast essentials using traditional methods since 2020. 100% Natural, 100% Naadan.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <button
              onClick={onExplore}
              className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-[11px] font-black uppercase tracking-[0.25em] transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
            >
              Explore Collection
            </button>
          </div>
        </motion.div>

        {/* Right Content - The Floating Card */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            /* Gentle Constant Pulse */
            animate={{
              scale: [1, 1.015, 1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            /* Subtle Zoom Out on Hover */
            whileHover={{
              scale: 0.98,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="relative w-full max-w-[340px] aspect-[1/1.75] bg-[#1a1817] rounded-[65px] p-6 shadow-[0_60px_100px_-30px_rgba(0,0,0,1)] border border-white/5 cursor-pointer overflow-hidden group"
          >
            {/* Image Section */}
            <div className="h-[62%] w-full rounded-[45px] overflow-hidden mb-6 relative">
              <img
                src={PRODUCTS[0].image}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="RIS Puttu Podi"
              />
              <div className="absolute inset-0 bg-stone-900/5"></div>
            </div>

            {/* Product Info Section */}
            <div className="px-2">
              <div className="bg-[#0f0f0f] rounded-[35px] p-8 border border-white/5 shadow-inner">
                <h3 className="text-white text-3xl font-serif font-bold mb-3 tracking-tight leading-tight">
                  Steam Roasted Puttu Podi
                </h3>
                <p className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.4em] mt-4">
                  Premium Rice Flour
                </p>
              </div>
            </div>

            {/* Shine/Reflect effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
          </motion.div>

          {/* Background Glow under the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/5 blur-[120px] -z-10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;