import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PRODUCTS } from '../constants.tsx';
import { Product, AppSection } from '../types.ts';

interface ProductListProps {
  isFullPage?: boolean;
  onNavigate?: (section: AppSection) => void;
}

const ProductList: React.FC<ProductListProps> = ({ isFullPage = false, onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const categories = ['Rice', 'Wheat', 'Instant'];

  const getProductImages = (product: Product) => {
    // Use images array if available, otherwise fall back to single image
    return product.images && product.images.length > 0 ? product.images : [product.image];
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleNextImg = () => {
    if (!selectedProduct) return;
    const imgs = getProductImages(selectedProduct);
    setCurrentImgIndex((prev) => (prev + 1) % imgs.length);
  };

  const handlePrevImg = () => {
    if (!selectedProduct) return;
    const imgs = getProductImages(selectedProduct);
    setCurrentImgIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
  };

  if (!isFullPage) {
    return (
      <section className="relative py-32 bg-gradient-to-b from-stone-50 via-white to-stone-50 overflow-hidden" id="products">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-3 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="font-bold text-xs uppercase tracking-[0.3em]">Selected for You</span>
            </motion.div>

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-900 bg-clip-text text-transparent tracking-tight mb-6">
              Heritage Favorites
            </h2>

            <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Discover our curated collection of authentic Kerala breakfast essentials
            </p>

            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mt-8 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto"
          >
            {PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredId(product.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative bg-white rounded-[40px] p-6 md:p-8 shadow-lg hover:shadow-xl border border-stone-100 hover:border-emerald-200 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.33%-2rem)] max-w-[400px]"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(AppSection.PRODUCTS);
                  }
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-100/0 opacity-0 group-hover:from-emerald-50/80 group-hover:via-emerald-50/40 group-hover:to-transparent group-hover:opacity-100 transition-all duration-700"
                  animate={hoveredId === product.id ? {
                    background: [
                      "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.02) 50%, transparent 100%)",
                      "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.04) 50%, transparent 100%)",
                      "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.02) 50%, transparent 100%)"
                    ]
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Top Badge Section */}
                <div className="flex justify-between items-center mb-8 relative z-10 px-2">
                  <motion.span
                    className="bg-stone-900 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg group-hover:bg-emerald-600 transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    {product.category}
                  </motion.span>
                  {product.id === 'puttu-podi' && (
                    <motion.div
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 px-4 py-2 rounded-full"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-amber-700 text-[8px] font-black uppercase tracking-widest">Best Seller</span>
                    </motion.div>
                  )}
                </div>

                {/* Enhanced Image Container */}
                <div className="aspect-[4/5] mb-10 relative overflow-hidden rounded-[45px] bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-100 shadow-inner">
                  <motion.img
                    src={product.image}
                    className="w-full h-full object-cover"
                    alt={product.name}
                    whileHover={{ scale: 1.08, rotate: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Image Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent group-hover:from-emerald-900/10 transition-colors duration-700"></div>

                  {/* Quick View Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  >
                    <motion.div
                      className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl flex items-center gap-3"
                      initial={{ scale: 0, y: 20 }}
                      animate={hoveredId === product.id ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      <span className="text-stone-900 font-bold text-sm uppercase tracking-wider">Quick View</span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="px-4 flex-grow flex flex-col items-center text-center relative z-10">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-4 leading-tight tracking-tight group-hover:text-emerald-800 transition-colors duration-500">
                    {product.name}
                  </h3>

                  <p className="text-stone-500 text-sm md:text-base font-light leading-relaxed mb-8 line-clamp-2 max-w-[280px]">
                    {product.description}
                  </p>

                  {/* Features Badges */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <span className="bg-stone-50 text-stone-600 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-stone-200">
                      100% Natural
                    </span>
                    <span className="bg-stone-50 text-stone-600 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-stone-200">
                      No Additives
                    </span>
                  </div>

                  {/* Price Section Removed */}
                  <div className="mt-auto w-full pt-8 border-t border-stone-100 group-hover:border-emerald-200 transition-colors">
                    <div className="flex flex-col items-center mb-6">
                      {/* Price was here */}
                    </div>

                    {/* CTA with Icon Animation */}
                    <motion.div
                      className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={hoveredId === product.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      View Details
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={hoveredId === product.id ? { x: [0, 5, 0] } : { x: 0 }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-[55px] ring-1 ring-inset ring-emerald-500/0 group-hover:ring-emerald-500/20 transition-all duration-700 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => onNavigate && onNavigate(AppSection.PRODUCTS)}
              className="group inline-flex items-center gap-4 bg-stone-900 hover:bg-emerald-600 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-2xl shadow-stone-900/20 hover:shadow-emerald-600/30 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Complete Collection
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Full Page Version with Enhanced Design
  return (
    <section className="bg-gradient-to-b from-stone-50 via-white to-stone-50 min-h-screen pb-40 overflow-hidden relative" id="products">
      {/* Enhanced Background */}
      <div className="absolute top-0 left-0 w-full h-[1400px] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-[0.07] saturate-0"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/40 via-stone-50/90 to-stone-50"></div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[600px] left-20 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-32 mb-32 text-center relative"
        >
          {/* Large Decorative Text */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-stone-200/40 text-[10rem] md:text-[15rem] font-serif italic select-none leading-none tracking-tighter">
            RIS
          </div>

          <motion.span
            className="inline-block text-emerald-700 text-xs font-bold uppercase tracking-[0.5em] mb-8 relative z-10 bg-emerald-50 px-6 py-3 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The RIS Collection
          </motion.span>

          <h2 className="text-7xl md:text-9xl font-bold text-stone-900 mb-6 font-serif tracking-tighter leading-[0.9] relative z-10">
            Pure Grains,
            <br />
            <span className="italic bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent block mt-4">
              Rich Heritage
            </span>
          </h2>

          <p className="text-stone-600 text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10 relative z-10">
            Explore our complete range of traditionally crafted breakfast essentials
          </p>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full relative z-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Category Sections */}
        {categories.map((cat, catIndex) => (
          <div key={cat} className="mb-40 relative">
            {/* Category Background Text */}
            <div className="absolute -top-24 -left-12 md:-left-20 text-[12rem] md:text-[20rem] font-serif font-black text-stone-100/50 select-none pointer-events-none uppercase tracking-tighter italic leading-none opacity-60">
              {cat[0]}
              <span className="text-[3rem] md:text-[5rem] not-italic tracking-normal opacity-20">
                {cat.slice(1)}
              </span>
            </div>

            {/* Category Header */}
            <motion.div
              className="flex flex-col items-center mb-20 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.4em] mb-3 bg-emerald-50 px-5 py-2 rounded-full">
                Category {catIndex + 1}
              </span>
              <h3 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 text-center">
                {cat} <span className="italic font-normal text-emerald-800/60">Series</span>
              </h3>
              <motion.div
                className="h-0.5 w-64 bg-gradient-to-r from-transparent via-emerald-300 to-transparent mt-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12 relative z-10"
            >
              {PRODUCTS.filter(p => p.category === cat).map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  onClick={() => { setSelectedProduct(product); setCurrentImgIndex(0); }}
                  onHoverStart={() => setHoveredId(product.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="group cursor-pointer relative w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.33%-2rem)] max-w-[400px]"
                >
                  <div className="relative aspect-[3.5/5] rounded-[65px] overflow-hidden bg-white shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_80px_rgba(5,150,105,0.15)] transition-all duration-700 hover:-translate-y-6 border border-stone-200/80 hover:border-emerald-200 isolate">
                    {/* Product Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-stone-100 transition-colors duration-700 group-hover:from-emerald-50/30 group-hover:to-stone-50"></div>

                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover relative z-10"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/40 to-transparent z-20 transition-all duration-700 group-hover:from-black/95 group-hover:via-black/50"></div>

                    {/* Border Ring */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-[65px] pointer-events-none z-30"></div>

                    {/* Hover Content */}
                    <motion.div
                      className="absolute inset-0 z-40 flex flex-col justify-end p-10 md:p-12"
                      initial={false}
                    >
                      {/* Animated Line */}
                      <motion.div
                        className="h-1 bg-emerald-400 mb-8 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={hoveredId === product.id ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />

                      <motion.h4
                        className="text-3xl md:text-4xl font-serif font-bold mb-5 text-emerald-400 transition-colors duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={hoveredId === product.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {product.name}
                      </motion.h4>

                      <motion.p
                        className="text-sm md:text-base text-stone-300 font-light leading-relaxed mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={hoveredId === product.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {product.description}
                      </motion.p>

                      <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        animate={hoveredId === product.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="flex flex-col">
                          {/* Price removed */}
                        </div>

                        <motion.div
                          className="flex items-center gap-3 bg-white/15 hover:bg-emerald-500 px-7 py-4 rounded-full backdrop-blur-xl border border-white/20 transition-all shadow-xl cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-[10px] uppercase font-black tracking-[0.25em] text-white">
                            Explore
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Enhanced Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-stone-950/98 backdrop-blur-2xl overflow-hidden"
            onClick={() => setSelectedProduct(null)}
          >
            {/* Modal Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]"></div>
              <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]"></div>
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-7xl rounded-[80px] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative max-h-[90vh] lg:h-[85vh] isolate"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 z-[110] p-5 bg-stone-100 hover:bg-emerald-600 rounded-full hover:text-white transition-all text-stone-900 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </motion.button>

              {/* Image Gallery Section */}
              <div className="w-full lg:w-1/2 relative bg-gradient-to-br from-stone-100 to-stone-200 h-[45vh] lg:h-full group/slider overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImgIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    src={getProductImages(selectedProduct)[currentImgIndex]}
                    className="w-full h-full object-contain"
                    alt={selectedProduct.name}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {getProductImages(selectedProduct).length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-6 md:px-10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={handlePrevImg}
                      className="p-4 md:p-5 bg-white/30 hover:bg-white/50 backdrop-blur-2xl rounded-full text-white transition-all shadow-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </motion.button>

                    <motion.button
                      onClick={handleNextImg}
                      className="p-4 md:p-5 bg-white/30 hover:bg-white/50 backdrop-blur-2xl rounded-full text-white transition-all shadow-xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </motion.button>
                  </div>
                )}

                {/* Image Indicators */}
                {getProductImages(selectedProduct).length > 1 && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {getProductImages(selectedProduct).map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setCurrentImgIndex(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${i === currentImgIndex ? 'w-12 bg-emerald-500' : 'w-2 bg-white/50 hover:bg-white/70'}`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                <div>
                  <motion.span
                    className="inline-block text-emerald-600 font-bold text-xs uppercase tracking-[0.4em] mb-6 bg-emerald-50 px-5 py-2 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Signature Series
                  </motion.span>

                  <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-stone-900 mb-6 leading-[0.95] tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedProduct.name}
                  </motion.h2>

                  <motion.div
                    className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-transparent mb-8 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />

                  <motion.p
                    className="text-stone-600 text-base md:text-lg lg:text-xl font-light leading-relaxed mb-10 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selectedProduct.description}
                  </motion.p>

                  {/* Product Features Grid */}
                  <motion.div
                    className="grid grid-cols-2 gap-6 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-6 md:p-7 rounded-3xl border border-stone-200 hover:border-emerald-200 transition-colors">
                      <span className="text-[10px] uppercase font-bold text-stone-500 tracking-[0.3em] block mb-3">
                        Purity Rank
                      </span>
                      <span className="text-xl md:text-2xl font-serif font-bold text-stone-900">
                        100% Natural
                      </span>
                    </div>

                    <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-6 md:p-7 rounded-3xl border border-stone-200 hover:border-emerald-200 transition-colors">
                      <span className="text-[10px] uppercase font-bold text-stone-500 tracking-[0.3em] block mb-3">
                        Category
                      </span>
                      <span className="text-xl md:text-2xl font-serif font-bold text-stone-900">
                        {selectedProduct.category}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Price and CTA */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 pt-8 border-t border-stone-200 bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex flex-col">
                    {/* Price removed */}
                  </div>

                  <motion.button
                    className="w-full sm:flex-grow py-6 md:py-7 bg-gradient-to-r from-stone-950 to-stone-900 hover:from-emerald-600 hover:to-emerald-500 text-white rounded-[32px] font-bold text-sm uppercase tracking-[0.25em] transition-all shadow-2xl shadow-stone-950/30 hover:shadow-emerald-600/40"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Secure Order
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } 
        .custom-scrollbar::-webkit-scrollbar-track { background: #f5f5f4; border-radius: 10px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 10px; transition: background 0.3s; } 
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}} />
    </section>
  );
};

export default ProductList;  