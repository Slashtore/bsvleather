import { Product, ProductCategory } from '../../types';

export const CARE: Product[] = [
  
    {
    id: 'care-1',
    name: 'Микрофибра',
    category: ProductCategory.CARE,
    price: 200,
    description: 'Для нанесения бальзама и полировки, вместо тряпок, которые могут ворсом забиваться в швы.',
    imageUrl: '/image/microfiber.jpg',
    details: ['Япония', 'Бесцветный', 'Для профессионалов']
  },
  {
    id: 'care-2',
    name: 'Ластик для кожи',
    category: ProductCategory.CARE,
    price: 250,
    description: 'Для удаления загрязнений и полос на коже.',
    imageUrl: '/image/eraser.jpg',
    details: ['Япония', 'Бесцветный', 'Для профессионалов']
  },
  {
    id: 'care-3',
    name: 'Пена очиститель',
    category: ProductCategory.CARE,
    price: 750,
    description: 'Для изделий из гладкой кожи, замши, нубука и текстиля. Очищает от загрязнений, ухаживает и защищает.',
    imageUrl: '/image/foam.jpg',
    details: ['Япония', 'Бесцветный', 'Для профессионалов']
  },
  {
    id: 'care-4',
    name: 'Бальзам для кожи',
    category: ProductCategory.CARE,
    price: 900,
    description: 'Натуральный бальзам на основе пчелиного воска, масла какао, и миндального масла. Питает кожу, защищает от влаги и скрывает мелкие царапины.',
    imageUrl: '/image/balm.jpg',
    details: ['Объем 50мл', '100% натуральный', 'Подходит для любой кожи']
  },
  {
    id: 'care-5',
    name: 'Щетка для полировки',
    category: ProductCategory.CARE,
    price: 1200,
    description: 'Удаляет пыль, грязь не повреждая кожу. Придаёт ей блеск, мягкость и ухоженный вид.',
    imageUrl: '/image/brush.jpg',
    details: ['Натуральный ворс', 'Деревянная ручка', 'Не царапает кожу']
  },
    {
    id: 'care-6',
    name: 'Пропитка для кожи',
    category: ProductCategory.CARE,
    price: 900,
    description: 'Натуральный бальзам на основе пчелиного воска, масла какао, и миндального масла. Питает кожу, защищает от влаги и скрывает мелкие царапины.',
    imageUrl: '/image/oil.jpg',
    details: ['Объем 50мл', '100% натуральный', 'Подходит для любой кожи']
  }
];