
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
  const categories = ['Rice', 'Wheat', 'Instant'];

  const getProductImages = (img: string) => [
    img,
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800"
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleNextImg = () => {
    if (!selectedProduct) return;
    const imgs = getProductImages(selectedProduct.image);
    setCurrentImgIndex((prev) => (prev + 1) % imgs.length);
  };

  const handlePrevImg = () => {
    if (!selectedProduct) return;
    const imgs = getProductImages(selectedProduct.image);
    setCurrentImgIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
  };

  if (!isFullPage) {
    return (
      <section className="py-32 bg-stone-50" id="products">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.5em] mb-4 block">Selected for You</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 tracking-tight">Heritage Favorites</h2>
            <div className="w-16 h-[2px] bg-emerald-600/30 mx-auto mt-8 rounded-full"></div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {/* Showing all 5 products and centering the last row (3+2 layout) */}
            {PRODUCTS.map((product) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                className="group relative bg-white rounded-[50px] p-6 pb-12 shadow-2xl shadow-stone-200/50 border border-stone-100/50 hover:shadow-emerald-900/5 transition-all duration-700 cursor-pointer overflow-hidden flex flex-col w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-2.5rem)] max-w-[400px]"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(AppSection.PRODUCTS);
                  }
                }}
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2"></div>
                
                {/* Product Tag */}
                <div className="flex justify-between items-center mb-8 relative z-10 px-2">
                  <span className="bg-stone-50 text-stone-500 border border-stone-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-500">{product.category}</span>
                  {product.id === 'puttu-podi' && (
                     <div className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-emerald-600 text-[8px] font-black uppercase tracking-widest">Heritage Grade</span>
                     </div>
                  )}
                </div>

                {/* Image Container */}
                <div className="aspect-[4/5] mb-10 relative overflow-hidden rounded-[40px] bg-stone-50 border border-stone-50">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover saturate-[0.85] group-hover:saturate-100 group-hover:scale-110 transition-all duration-1000 ease-[0.22, 1, 0.36, 1]" 
                    alt={product.name} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-900/10 group-hover:to-emerald-900/5 transition-colors"></div>
                </div>

                {/* Content */}
                <div className="px-4 flex-grow flex flex-col items-center text-center">
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4 leading-tight tracking-tight group-hover:text-emerald-800 transition-colors duration-500">
                    {product.name}
                  </h3>
                  <p className="text-stone-400 text-sm font-light leading-relaxed mb-8 line-clamp-2 max-w-[240px]">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto w-full pt-8 border-t border-stone-50 flex flex-col items-center">
                    <div className="flex flex-col items-center mb-6">
                      <span className="text-[9px] text-stone-300 font-black uppercase tracking-[0.3em] mb-1">Standard Pack</span>
                      <span className="text-3xl font-black text-stone-900 tracking-tighter">
                        <span className="text-emerald-600 font-serif mr-1">₹</span>{product.price}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      Explore Details
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-stone-50 min-h-screen pb-40 overflow-hidden relative" id="products">
      {/* Products Page Content stays largely the same but ensures consistency */}
      <div className="absolute top-0 left-0 w-full h-[1200px] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-10 saturate-0"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/30 via-stone-50/80 to-stone-50"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-32 mb-40 text-center relative">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 text-emerald-900/5 text-9xl font-serif italic select-none">R</div>
          <span className="text-emerald-700 text-[12px] font-bold uppercase tracking-[0.8em] mb-8 block relative z-10">The RIS Collection</span>
          <h2 className="text-7xl md:text-9xl font-bold text-stone-900 mb-10 font-serif tracking-tighter leading-[0.85] relative z-10">Pure Grains,<br/><span className="italic text-emerald-800 font-serif block mt-2">Rich Heritage</span></h2>
          <div className="w-24 h-1 bg-emerald-600/30 mx-auto mb-10 rounded-full"></div>
        </motion.div>

        {categories.map((cat) => (
          <div key={cat} className="mb-48 relative">
            <div className="absolute -top-32 -left-20 text-[16rem] md:text-[24rem] font-serif font-black text-stone-200/30 select-none pointer-events-none uppercase tracking-tighter italic leading-none opacity-40">
              {cat[0]}<span className="text-[4rem] not-italic tracking-normal opacity-10 ml-[-40px]">{cat.slice(1)}</span>
            </div>
            <div className="flex flex-col items-center mb-20 relative z-10">
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em] mb-2">Category</span>
              <h3 className="text-5xl font-serif font-bold text-stone-900 text-center">{cat} <span className="italic font-normal text-emerald-900/40">Series</span></h3>
              <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-emerald-200 to-transparent mt-4"></div>
            </div>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-wrap justify-center gap-12 relative z-10">
              {PRODUCTS.filter(p => p.category === cat).map((product) => (
                <motion.div key={product.id} variants={itemVariants} onClick={() => { setSelectedProduct(product); setCurrentImgIndex(0); }} className="group cursor-pointer relative w-full max-w-[380px]">
                  <div className="relative aspect-[3.5/5] rounded-[60px] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 border border-stone-200/60 isolate">
                    <div className="absolute inset-0 bg-stone-50 transition-colors duration-700 group-hover:bg-transparent"></div>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover saturate-[0.95] group-hover:saturate-100 transition-all duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent transition-all duration-700 group-hover:opacity-0"></div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[60px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 to-stone-950 opacity-0 group-hover:opacity-95 transition-all duration-500 flex flex-col justify-end p-12">
                      <div className="h-0.5 w-0 bg-emerald-500 mb-6 group-hover:w-full transition-all duration-700 delay-100 origin-left"></div>
                      <h4 className="text-3xl font-serif font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-500">{product.name}</h4>
                      <p className="text-sm text-stone-300 font-light leading-relaxed mb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 delay-200">{product.description}</p>
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-300">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Price</span>
                          <span className="text-3xl font-bold tracking-tighter text-white">₹{product.price}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 hover:bg-emerald-600 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 transition-all group/btn shadow-xl">
                          <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white">Discover</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover/btn:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-stone-950/98 backdrop-blur-2xl overflow-hidden" onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.9, y: 100, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 100, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-7xl rounded-[80px] overflow-hidden flex flex-col lg:flex-row shadow-2xl relative h-full lg:h-[80vh] isolate">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-12 right-12 z-[110] p-5 bg-stone-100 rounded-full hover:bg-emerald-600 hover:text-white transition-all text-stone-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <div className="w-full lg:w-1/2 relative bg-stone-100 h-[45vh] lg:h-full group/slider overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img key={currentImgIndex} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1.05 }} exit={{ opacity: 0, scale: 1 }} transition={{ duration: 0.6 }} src={getProductImages(selectedProduct.image)[currentImgIndex]} className="w-full h-full object-cover" alt={selectedProduct.name} />
                </AnimatePresence>
                <div className="absolute inset-0 flex items-center justify-between px-8 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                  <button onClick={handlePrevImg} className="p-4 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-full text-white transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
                  <button onClick={handleNextImg} className="p-4 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-full text-white transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {getProductImages(selectedProduct.image).map((_, i) => (
                    <button key={i} onClick={() => setCurrentImgIndex(i)} className={`h-2 rounded-full transition-all duration-500 ${i === currentImgIndex ? 'w-10 bg-emerald-500' : 'w-2 bg-white/40'}`} />
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-between overflow-hidden">
                <div className="overflow-y-auto custom-scrollbar pr-4">
                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Signature Series</span>
                  <h2 className="text-5xl lg:text-7xl font-serif font-bold text-stone-900 mb-8 leading-[1] tracking-tighter">{selectedProduct.name}</h2>
                  <div className="h-1 w-20 bg-emerald-100 mb-10"></div>
                  <p className="text-stone-500 text-lg lg:text-xl font-light leading-relaxed mb-10 italic">{selectedProduct.description}</p>
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest block mb-2">Purity Rank</span>
                      <span className="text-xl font-serif font-bold text-stone-900">100% Natural</span>
                    </div>
                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest block mb-2">Category</span>
                      <span className="text-xl font-serif font-bold text-stone-900">{selectedProduct.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-10 pt-10 border-t border-stone-100 bg-white">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Standard Pack</span>
                    <span className="text-5xl font-black text-stone-900 tracking-tighter">₹{selectedProduct.price}</span>
                  </div>
                  <button className="w-full sm:w-auto flex-grow py-8 bg-stone-950 text-white rounded-[32px] font-bold text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl shadow-stone-950/20 active:scale-95">Secure Order</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{ __html: `.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }`}} />
    </section>
  );
};

export default ProductList;
