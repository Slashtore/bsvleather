import { Product, ProductCategory } from '../../types';

export const WALLETS: Product[] = [
  {
    id: 'wallets-1',
    name: 'Бифолд "Классика"',
    category: ProductCategory.WALLETS,
    recipe: {
      leather: { type: 'a4', amount: 1 },
      hardware: [
        { type: 'snap_button', count: 1 },
      ],
      hours: 2.5
    },
    description: 'Компактный бифолд из гладкой кожи. Белая строчка и окрашенный урез создают акцент. 2 слота для карт, карманы для купюр и мелочи, и при этом тонкий.',
    imageUrl: '/image/wallet-1.1.jpg',
    images: [
    '/image/wallet-1.2.jpg',
    '/image/wallet-1.3.jpg',
    ],
    details: ['Размер 9×9 см', 'Вместительный', 'Белая строчка и урез']
  },
];