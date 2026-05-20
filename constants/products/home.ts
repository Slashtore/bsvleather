import { Product, ProductCategory } from '../../types';

export const HOME: Product[] = [
  {
    id: 'home-1',
    name: 'Лоток для ключей и мелочей',
    category: ProductCategory.HOME,
    recipe: {
      leather: { type: 'a4', amount: 1 },
      hardware: [
        { type: 'snap_button', count: 4 },
      ],
      hours: 1.5
    },
    description: 'Гладкая лицевая сторона внутри и фактурная бахтарма снаружи создают лаконичный контраст. Упорядочивает ежедневные мелочи и стильно дополняет рабочее пространство.',
    imageUrl: '/image/home-1.1.jpg',
    images: [
    '/image/home-1.2.jpg',
    ],
    details: ['Размер 16х16см', '4 металлические кнопки для фиксации формы', 'Вмещает ключи, телефон, мелочь или аксессуары']
  },
];