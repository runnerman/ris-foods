import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-emerald-950">
      {/* Enhanced Background Layer with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1585816561202-e98fe10d8025?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover brightness-[0.4] saturate-[1.2]"
          alt="Kerala Heritage Background"
        />
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent"></div>

        {/* Animated Background Glows */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Decorative Grain Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')] z-[1]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-24 pb-12">

        {/* Left Content - Enhanced Typography & Animations */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-left space-y-8"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mx-auto lg:mx-0"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">Since 2020</span>
          </motion.div>

          {/* Main Headline with Stagger Animation */}
          <div className="space-y-4">
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Taste the
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="relative inline-block"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold italic leading-[0.95] tracking-tight bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                Heritage.
              </h1>
              {/* Underline Decoration */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </div>

          {/* Enhanced Description */}
          <motion.p
            className="text-stone-300 text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Crafting the finest breakfast essentials using traditional methods.
            <span className="text-emerald-400 font-medium"> 100% Natural, 100% Naadan.</span>
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <motion.button
              onClick={onExplore}
              className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-emerald-900/40 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                Explore Collection
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </motion.button>

            <motion.button
              className="group px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                Our Story
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-45 transition-transform">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">100% Natural</p>
                <p className="text-stone-400 text-xs">No Preservatives</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Premium Quality</p>
                <p className="text-stone-400 text-xs">Direct Sourcing</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Enhanced Floating Card */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.02,
              rotateY: 5,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[1/1.7] bg-gradient-to-br from-stone-900 to-stone-950 rounded-[50px] sm:rounded-[70px] p-5 sm:p-7 shadow-[0_70px_120px_-40px_rgba(0,0,0,0.9)] border border-white/10 cursor-pointer overflow-hidden group mx-auto"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ mixBlendMode: "overlay" }}
            />

            {/* Premium Badge on Card */}
            <div className="absolute top-7 right-7 z-20 bg-emerald-500 text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
              Heritage
            </div>

            {/* Image Section with Enhanced Effects */}
            <div className="h-[60%] w-full rounded-[50px] overflow-hidden mb-7 relative group/img">
              <motion.img
                src={PRODUCTS[0].image}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                alt="RIS Puttu Podi"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent"></div>

              {/* Image Overlay on Hover */}
              <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Product Info Section - Enhanced */}
            <div className="px-2 space-y-4">
              <div className="bg-stone-950 rounded-[40px] p-8 border border-white/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <h3 className="text-white text-3xl font-serif font-bold mb-2 tracking-tight leading-tight group-hover:text-emerald-300 transition-colors duration-500">
                    Steam Roasted Puttu Podi
                  </h3>
                  <p className="text-stone-400 text-sm mb-4 font-light">
                    Traditionally steam-roasted for authentic flavor
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.4em]">
                        Premium Rice Flour
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      {/* Price removed */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Button */}
              <motion.button
                onClick={onExplore}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </motion.button>
            </div>

            {/* Card Border Glow */}
            <div className="absolute inset-0 rounded-[70px] bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ mixBlendMode: "overlay" }}></div>
          </motion.div>

          {/* Enhanced Background Glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-radial from-emerald-500/10 via-emerald-500/5 to-transparent blur-3xl -z-10 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;