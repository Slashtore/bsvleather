import { Product, ProductCategory } from '../../types';

export const BAGS: Product[] = [
  {
    id: 'bag-1',
    name: 'Рюкзак "Странник"',
    category: ProductCategory.BAGS,
    price: 25000,
    description: 'Винтажный рюкзак в цвете "Коньяк". Ролл-топ система закрытия. Идеален для города и поездок.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    details: ['Усиленное дно', 'Лямки с войлоком', 'Внутренний карман для ноутбука']
  },
];