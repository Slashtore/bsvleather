import { Product, ProductCategory } from '../../types';

export const WATCH_STRAPS: Product[] = [
  {
    id: 'watch_straps-1',
    name: 'Ремешок "Rally"',
    category: ProductCategory.WATCH_STRAPS,
    price: 3500,
    description: 'Перфорированный ремешок в гоночном стиле. Цвет "Олива". Подходит для любых классических часов.',
    imageUrl: 'https://images.unsplash.com/photo-1542835697-3f3074dc6312?q=80&w=1000&auto=format&fit=crop',
    details: ['Индивидуальный размер', 'Гипоаллергенная подкладка', 'Пряжка из стали']
  },
];