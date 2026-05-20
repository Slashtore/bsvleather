import { Product, ProductCategory } from '../../types';

export const COMPACT: Product[] = [
  {
    id: 'compact-1',
    name: 'Зажим "Мани"',
    category: ProductCategory.COMPACT,
    recipe: {
      leather: { type: 'a4', amount: 2 },
      hardware: [
      ],
      hours: 1.5
    },
    description: 'Зажим для купюр с зигзагообразной строчкой — стильное решение для хранения наличных и карт. Лаконичный дизайн и премиальная кожа делают аксессуар уместным в любом образе.',
    imageUrl: '/image/compact-1.1.jpg',
    images: [
    '/image/compact-1.2.jpg',
    ],
    details: ['Размер 8х11см', 'Пружинный механизм', 'Четыре кармана для карт']
  },
  {
    id: 'compact-2',
    name: 'Картхолдер "Тинькофф"',
    category: ProductCategory.COMPACT,
    recipe: {
      leather: { type: 'a4', amount: 1 },
      hardware: [
      ],
      hours: 1.5
    },
    description: 'Компактный картхолдер для четырёх карт и купюр. Занимает минимум места в кармане, оставляя только необходимое.',
    imageUrl: '/image/compact-2.1.jpg',
    images: [
    '/image/compact-2.2.jpg',
    ],
    details: ['Размер 10×8 см', '4 слота для карт + отдельный карман для наличных', 'Держит форму']
  },
];