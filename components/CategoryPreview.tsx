import React from 'react';
import { ProductCategory } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryPreviewProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryPreview: React.FC<CategoryPreviewProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: ProductCategory.BELTS,
      title: ProductCategory.BELTS,
      image: '/image/category belts.jpg',
      desc: 'Фундамент вашего стиля из плотной ременной кожи.'
    },
    {
      id: ProductCategory.WALLETS,
      title: ProductCategory.WALLETS,
      image: '/image/category wallets.jpg',
      desc: 'Классика, которая с годами становится только благороднее.'
    },
    {
      id: ProductCategory.COMPACT,
      title: ProductCategory.COMPACT,
      image: '/image/category cardholder.jpg',
      desc: 'Свобода от лишнего. Только самое важное под рукой.'
    },
    {
      id: ProductCategory.HOME,
      title: ProductCategory.HOME,
      image: '/image/category home.jpg',
      desc: 'Эстетика, уют и запах натуральной кожи в вашем интерьере.'
    },
    {
      id: ProductCategory.ACCESSORIES,
      title: ProductCategory.ACCESSORIES,
      image: '/image/category accessories.jpg',
      desc: 'Стиль складывается из незаметных, но важных деталей.'
    },
    {
      id: ProductCategory.MUSIC_ACCESSORIES,
      title: ProductCategory.MUSIC_ACCESSORIES,
      image: '/image/category music.jpg', // ← замени на путь к твоему фото
      desc: 'Создавайте мелодии с аксессуарами, которые звучат стилем и качеством.'
    },
    {
      id: ProductCategory.BAGS,
      title: ProductCategory.BAGS,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
      desc: 'Надежные спутники для ваших больших и малых путешествий.'
    },
    {
      id: ProductCategory.WATCH_STRAPS,
      title: ProductCategory.WATCH_STRAPS,
      image: 'https://images.unsplash.com/photo-1542835697-3f3074dc6312?q=80&w=1000&auto=format&fit=crop',
      desc: 'Новое дыхание и индивидуальный характер для любимых часов.'
    },
    {
      id: ProductCategory.EXCLUSIVE,
      title: ProductCategory.EXCLUSIVE,
      image: 'https://images.unsplash.com/photo-1569388330292-7a6a841cd155?q=80&w=1000&auto=format&fit=crop',
      desc: 'Смелые идеи и уникальные образы, где ремесло граничит с искусством.'
    },
    {
      id: ProductCategory.GIFT_SETS,
      title: ProductCategory.GIFT_SETS,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop',
      desc: 'Готовое решение, чтобы впечатлить близких без лишних слов.'
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-leather-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-leather-200 pb-8">
          <div>
            {/* "Каталог" label removed here */}
            <h2 className="text-5xl font-serif text-leather-900 tracking-tight">Коллекции</h2>
          </div>
          <button 
            onClick={() => onSelectCategory(ProductCategory.ALL)}
            className="hidden md:flex items-center gap-2 text-leather-900 font-bold uppercase tracking-wider text-xs hover:text-leather-600 transition-colors"
          >
            Смотреть всё
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Сетка: gap-px создаёт линии за счёт видимого фона родителя */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-leather-200">
          {categories.slice(0, 6).map((cat, idx) => {
            const total = categories.slice(0, 6).length;
            const cols = 3;
            const currentRow = Math.floor(idx / cols);
            const totalRows = Math.ceil(total / cols);
            const isLastInRow = (idx + 1) % cols === 0;

            return (
              <div 
                key={cat.title}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative h-[400px] cursor-pointer overflow-hidden bg-white"
              >
                {/* Background Image */}
                <div className="absolute inset-0 md:inset-8">
                  <img 
                      src={cat.image} 
                      alt={cat.title}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110 md:group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/50 transition-colors duration-500"></div>

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  {/* Top Label */}
                  <div className="absolute top-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-4 group-hover:translate-y-0">
                    <span className="text-white text-[10px] uppercase tracking-widest border border-white/40 px-3 py-1 backdrop-blur-sm">
                      Открыть
                    </span>
                  </div>

                  {/* Main Text */}
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-3xl font-serif text-white mb-2">
                          {cat.title}
                      </h3>
                      
                      {/* Description Line */}
                      <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                          <div className="pt-2 border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                              <p className="text-white/90 text-sm font-light flex items-center gap-2">
                                  {cat.desc}
                                  <ArrowRight size={14} />
                              </p>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button 
            onClick={() => onSelectCategory(ProductCategory.ALL)}
            className="inline-flex items-center gap-2 border border-leather-900 text-leather-900 px-8 py-4 uppercase tracking-wider text-xs font-bold hover:bg-leather-900 hover:text-white transition-colors"
          >
            Смотреть весь каталог
          </button>
        </div>
      </div>
    </section>
  );
};