import { Product, ProductCategory } from '../../types';

export const MUSIC_ACCESSORIES: Product[] = [
  {
    id: 'guitar-belt-1',
    name: 'Ремень для гитары "Аккорд"',
    category: ProductCategory.MUSIC_ACCESSORIES,
    recipe: {
      leather: { type: 'dm', amount: 14 },
      hardware: [
      ],
      hours: 3
    },
    description: 'Ремень для гитары из натуральной кожи растительного дубления. Регулируемая длина.',
    imageUrl: '/image/guitar-belt-1.1.jpg',
    images: [
    '/image/guitar-belt-1.2.jpg',
    '/image/guitar-belt-1.3.jpg',
    '/image/guitar-belt-1.4.jpg',
    ],
    details: ['Кожа растительного дубления 3 мм', 'Длина: 110–135 см', 'Ширина: 8 см']
  },
];