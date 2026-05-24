import { Product, ProductCategory } from '../../types';

export const ACCESSORIES: Product[] = [
  {
    id: 'accessories-1',
    name: 'Ключница удлинённая',
    category: ProductCategory.ACCESSORIES,
    recipe: {
      leather: { type: 'a4', amount: 1 },
      hardware: [
      ],
      hours: 1
    },
    description: 'Ключница для связки ключей длинного размера. Ключи не шумят и не царапают вещи в кармане или сумке. Быстро убираются с помощью кожаного шнурка',
    imageUrl: '/image/accessories-1.1.jpg',
    images: [
    '/image/accessories-1.2.jpg',
    '/image/accessories-1.3.jpg',
    ],
    details: ['Размер 14×6.5 см', 'Вмещает до 3-х ключей', 'Ремешок с кольцом']
  },
];