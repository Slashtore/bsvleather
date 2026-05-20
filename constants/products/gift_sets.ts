import { Product, ProductCategory } from '../../types';

export const GIFT_SETS: Product[] = [
  {
    id: 'gift_set-1',
    name: 'Набор "Джентльмен"',
    category: ProductCategory.GIFT_SETS,
    price: 8000,
    description: 'Подарочный набор: Ремень + Бифолд в едином стиле. Упакован в деревянную коробку с наполнителем.',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
    details: ['Деревянная коробка', 'Выгоднее на 10%', 'Гравировка в подарок']
  },
];