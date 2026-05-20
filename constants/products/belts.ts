import { Product, ProductCategory } from '../../types';

export const BELTS: Product[] = [
  {
    id: 'belt-1',
    name: 'Ремень "Классический"',
    category: ProductCategory.BELTS,
    recipe: {
      leather: { type: 'belt_blank_4_0cm', amount: 1.3 },
      hardware: [
        { type: 'buckle', count: 1 },
        { type: 'screw', count: 1 }
      ],
      hours: 3
    },
    description: 'Мощный ремень из бычьей кожи толщиной 3.5 мм. Цвет: "Коньяк". Пряжка выполнена из металла с матовым покрытием в цвете титан.',
    imageUrl: '/image/Belt-1.1.jpg',
    images: [
    '/image/Belt-1.2.jpg',
    ],
    details: ['Ширина 40мм', 'Прямоугольная пряжка', 'Шлёвка с фиксацией на винт']
  },
];