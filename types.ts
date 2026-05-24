import { PRICING } from './constants/pricing';

export enum ProductCategory {
  ALL = 'Все',
  BELTS = 'Ремни',
  WALLETS = 'Кошельки',
  COMPACT = 'Картхолдеры и Зажимы',
  HOME = 'Для дома и офиса',
  ACCESSORIES = 'Мелочи и Чехлы',
  BAGS = 'Сумки и Рюкзаки',
  WATCH_STRAPS = 'Часовые ремешки',
  EXCLUSIVE = 'Эксклюзив и Арт',
  GIFT_SETS = 'Подарочные наборы',
  CARE = 'Средства ухода'
}

export enum MaterialType {
  LEATHER = 'Кожа',
  THREAD = 'Нить',
  HARDWARE = 'Фурнитура'
}

export enum LeatherStyle {
  SMOOTH = 'Гладкая (Classic)',
  VINTAGE = 'Винтажная (Pull-up)',
  TEXTURED = 'Фактурная'
}

// Берут ключи напрямую из pricing.ts
export type LeatherType = keyof typeof PRICING.materials.leather;
export type HardwareType = keyof typeof PRICING.materials.hardware;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  recipe?: ProductRecipe;
  price?: number; 
  description: string;
  imageUrl: string;
  images?: string[];
  details: string[];
}

export interface Material {
  id: string;
  type: MaterialType;
  style?: LeatherStyle;
  name: string;
  description: string;
  imageUrl: string;
  colorHex?: string;
  features: string[];
}

export interface MaterialUsage {
  type: LeatherType;  // ✅ Автоматический тип из pricing
  amount: number;
}

export interface HardwareUsage {
  type: HardwareType;  // ✅ Автоматический тип из pricing
  count: number;
}

export interface ProductRecipe {
  leather: MaterialUsage;
  hardware: HardwareUsage[];
  hours: number;
}

export interface CartItem extends Product {
  quantity: number;
  price: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
  type: string;
}