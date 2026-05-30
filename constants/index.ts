// Импорт цен (для калькулятора)
export { PRICING } from './pricing';

// Импорт товаров по категориям
import { BELTS } from './products/belts';
import { WALLETS } from './products/wallets';
import { COMPACT } from './products/compact';
import { HOME } from './products/home';
import { ACCESSORIES } from './products/accessories';
import { MUSIC_ACCESSORIES } from './products/music_accessories';
import { BAGS } from './products/bags';
import { WATCH_STRAPS } from './products/watch_straps';
import { EXCLUSIVE } from './products/exclusive';
import { GIFT_SETS } from './products/gift_sets';
import { CARE } from './products/care';

// Экспорт отдельных категорий (для секций на главной, типа CareSection)
export { BELTS, WALLETS, COMPACT, HOME, MUSIC_ACCESSORIES, BAGS, WATCH_STRAPS, ACCESSORIES, EXCLUSIVE, GIFT_SETS, CARE };

// ГЛАВНЫЙ ЭКСПОРТ: Все товары вместе для каталога
export const PRODUCTS = [
  ...BELTS,
  ...WALLETS,
  ...COMPACT,
  ...HOME,
  ...ACCESSORIES,
  ...BAGS,
  ...WATCH_STRAPS,
  ...EXCLUSIVE,
  ...GIFT_SETS,
  ...CARE,
  ...MUSIC_ACCESSORIES
];