import { Product, ProductCategory } from '../../types';

export const EXCLUSIVE: Product[] = [
  {
    id: 'exclusive-1',
    name: 'Кожаный Кокошник',
    category: ProductCategory.EXCLUSIVE,
    price: 12000,
    description: 'Современная интерпретация русского головного убора. Тиснение, сложная формовка, роспись. Арт-объект, который можно носить.',
    imageUrl: 'https://images.unsplash.com/photo-1569388330292-7a6a841cd155?q=80&w=1000&auto=format&fit=crop', // Абстрактное фото фэшн/кожи
    details: ['Единственный экземпляр', 'Ручная формовка', 'Индивидуальная подгонка']
  },
  {
    id: 'exclusive-2',
    name: 'Кошелек "Байкер"',
    category: ProductCategory.EXCLUSIVE,
    price: 8000,
    description: 'Брутальный лонгер на цепи. Толстая черная кожа, массивный карабин, тиснение черепа.',
    imageUrl: 'https://images.unsplash.com/photo-1559563458-52c6952796dc?q=80&w=1000&auto=format&fit=crop',
    details: ['Неубиваемая конструкция', 'Латунная цепь в комплекте', 'Глубокое тиснение']
  },
];