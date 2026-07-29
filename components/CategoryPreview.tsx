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
      image: '/image/category music.jpg',
      desc: 'Аксессуары для музыкантов с характером и долговечностью.'
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

  const visibleCategories = categories.slice(0, 6);

  return (
    <section className="py-20 md:py-24 bg-white border-b border-stone-200/80">
      <div className="container mx-auto px-6">
        
        {/* Заголовок блока */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 pb-6 border-b border-stone-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-[#885036]" />
              <span className="text-[#885036] font-mono text-[10px] uppercase tracking-[0.25em] font-bold">
                Каталог
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-stone-950 tracking-tight font-medium">
              Категории изделий
            </h2>
          </div>
          
          <button 
            onClick={() => onSelectCategory(ProductCategory.ALL)}
            className="hidden md:flex items-center gap-2 text-stone-900 font-bold uppercase tracking-widest text-xs hover:text-[#885036] transition-colors group"
          >
            <span>Смотреть всё</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Сетка категорий (gap-px создает тонкие линии между блоками) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200/80 border border-stone-200/80">
          {visibleCategories.map((cat) => (
            <div 
              key={cat.title}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-[380px] md:h-[420px] cursor-pointer overflow-hidden bg-white"
            >
              {/* Фотография в галерейной рамке */}
              <div className="absolute inset-0 md:inset-6 overflow-hidden bg-stone-100 transition-all duration-500">
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              {/* Градиентное затемнение */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Содержимое карточки */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-10">
                
                {/* Бейдж "Открыть" сверху */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                  <span className="text-stone-100 text-[10px] font-bold uppercase tracking-widest border border-white/40 px-3 py-1 backdrop-blur-md bg-black/20 rounded-sm">
                    Смотреть
                  </span>
                </div>

                {/* Основной текст */}
                <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 font-medium tracking-tight">
                    {cat.title}
                  </h3>
                  
                  {/* Выплывающее описание */}
                  <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                    <div className="pt-2.5 border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      <p className="text-stone-200/90 text-xs md:text-sm font-light flex items-center justify-between gap-2">
                        <span>{cat.desc}</span>
                        <ArrowRight size={14} className="shrink-0 text-[#e6ccb2]" />
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Кнопка для мобильных устройств */}
        <div className="mt-10 text-center md:hidden">
          <button 
            onClick={() => onSelectCategory(ProductCategory.ALL)}
            className="w-full inline-flex items-center justify-center gap-2 border border-stone-900 bg-[#1a110f] text-[#e6ccb2] px-8 py-4 uppercase tracking-widest text-xs font-bold rounded-sm shadow-md"
          >
            <span>Смотреть весь каталог</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};