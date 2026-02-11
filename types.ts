

export interface Product {
  id: string;
  name: string;
  category: 'Rice' | 'Wheat' | 'Spices' | 'Instant';
  description: string;
  price: number;
  image: string;
  images?: string[]; // Optional array for multiple images (packet + nutrition facts)
  benefits: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum AppSection {
  HOME = 'home',
  PRODUCTS = 'products',
  CONTACT = 'contact'
}