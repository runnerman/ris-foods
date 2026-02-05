
import React from 'react';
import { Product } from './types';
import puttuPodiImg from './components/puttu-podi.jpg';
import roastedRavaImg from './components/roasted-rava.jpg';
import palappamImg from './components/palappam-mix.jpg';
import ricePowderImg from './components/rice-powder.jpg';
import dosaBatterImg from './components/dosa-batter.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'puttu-podi',
    name: 'Steam Roasted Puttu Podi',
    category: 'Rice',
    description: 'Traditionally steam-roasted for that perfect granular texture and authentic aroma.',
    price: 65,
    image: puttuPodiImg,
    benefits: ['Preservative Free', 'Steam Roasted', 'Traditional Taste']
  },
  {
    id: 'rava',
    name: 'Semolina Roasted Rava',
    category: 'Wheat',
    description: 'Premium quality roasted semolina for soft, non-sticky Upma and Kesari.',
    price: 60,
    image: roastedRavaImg,
    benefits: ['Pre-roasted', 'Low Glycemic Index', 'Premium Wheat']
  },
  {
    id: 'palappam-mix',
    name: 'Instant Palappam Mix',
    category: 'Instant',
    description: 'Create lacy, soft-centered palappams instantly with our signature rice-coconut blend.',
    price: 75,
    image: palappamImg,
    benefits: ['Zero Fermentation Wait', 'Naturally Sweet', 'Lacy Edges']
  },
  {
    id: 'batter',
    name: 'Idly & Dosa Batter',
    category: 'Instant',
    description: 'Freshly stone-ground and naturally fermented batter for restaurant-style breakfasts at home.',
    price: 90,
    image: dosaBatterImg,
    benefits: ['Naturally Fermented', 'Stone Ground', 'No Soda Added']
  },
  {
    id: 'roasted-rice-powder',
    name: 'Roasted Rice Powder',
    category: 'Rice',
    description: 'Multi-purpose rice flour, perfectly roasted for Idiyappam, Pathiri, and snacks.',
    price: 70,
    image: ricePowderImg,
    benefits: ['Double Roasted', 'Super Fine', '100% Pure Rice']
  }
];

export const ICONS = {
  Leaf: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
  ),
  Chef: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h12" /><path d="M6 22h12" /><path d="M9 10V5a3 3 0 0 1 6 0v5" /><path d="M12 2v2" /><path d="M5 10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3Z" /><path d="M7 14h10" /></svg>
  ),
  Package: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4 7.5 4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" /></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
  ),
  Logo: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
      <path d="M35 75V25H55C65 25 70 30 70 37.5C70 45 65 50 55 50H35M55 50L75 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="55" cy="50" r="4" fill="#10b981" />
    </svg>
  )
};
