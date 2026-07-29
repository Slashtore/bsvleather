import React, { useState, useLayoutEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  onBecomeClient: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onBecomeClient }) => {
  const reviews = [
    {
      id: 1,
      name: "Александр К.",
      product: "Ремень \"Форма\"",
      text: "Кожа плотная, с приятным матовым финишем. Ношу каждый день — потёртостей нет. Пряжка держит чётко, не люфтит. Отличный ремень.",
      rating: 5,
      date: "20 декабря 2024"
    },
    {
      id: 2,
      name: "Людмила К.",
      product: "Ремень \"Форма\"",
      text: "Заказывала ярко-красный ремень. Видела подобный в онлайн бутике ГУМ, но стоимость... Цвет классный, насыщенный. Настоящая кожа. И цена приятная.",
      rating: 5,
      date: "25 декабря 2025"
    },
    {
      id: 3,
      name: "Ольга Б.",
      product: "Футляр для очков",
      text: "Футляр с необычным тиснением кожи. Очки больше не царапаются, не лежат где попало, а сам футляр стал самостоятельным аксессуаром.",
      rating: 5,
      date: "09 марта 2024"
    },
    {
      id: 4,
      name: "Антон В.",
      product: "Бифолд",
      text: "Бифолд коньячного оттенка — это вещь. Небольшой, удобно носить в кармане, при этом всё помещается. Кожа со временем не портится и приобретает дополнительный стиль.",
      rating: 5,
      date: "15 января 2024"
    }
  ];

  const carouselItems = [...reviews.slice(-2), ...reviews, ...reviews.slice(0, 3)];
  
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  const [cardHeight, setCardHeight] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const GAP = 32; // py-4 = 32px

  // 1. Отслеживаем десктоп/мобайл
  useLayoutEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 2. МАТЕМАТИКА: замер → выравнивание → расчёт контейнера (только мобильные)
  useLayoutEffect(() => {
    if (isDesktop || !trackRef.current) return;

    requestAnimationFrame(() => {
      const items = Array.from(trackRef.current?.children || []) as HTMLElement[];
      if (items.length === 0) return;

      let maxH = 0;
      items.forEach(el => {
        const card = el.querySelector('[data-card]') as HTMLElement;
        if (card) maxH = Math.max(maxH, card.offsetHeight);
      });

      if (maxH > 0) setCardHeight(maxH);
    });
  }, [isDesktop]);

  // 3. Авто-сдвиг
  useLayoutEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => setCurrentIndex(prev => prev + 1), 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // 4. Бесшовный сброс
  const handleTransitionEnd = () => {
    if (currentIndex >= carouselItems.length - 3) {
      setDisableTransition(true);
      setTimeout(() => {
        setCurrentIndex(2);
        setTimeout(() => setDisableTransition(false), 50);
      }, 50);
    }
  };

  // ТОЧНЫЕ РАСЧЁТЫ
  const step = cardHeight + GAP;
  const containerHeight = cardHeight > 0 ? step * 3 : 'auto';
  
  const transform = isDesktop 
    ? `translateX(-${currentIndex * 33.333}%)` 
    : (cardHeight > 0 ? `translateY(-${currentIndex * step}px)` : `translateY(0px)`);

  return (
    <section className="py-20 md:py-24 bg-stone-100/60 border-t border-stone-200/80">
      <div className="container mx-auto px-6">
        
        {/* Шапка блока */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#885036] font-bold mb-2">
            Слово нашим владельцам
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-950 mb-3 tracking-tight font-medium">
            Отзывы
          </h2>
          <p className="text-stone-500 text-sm md:text-base font-light max-w-xl mx-auto">
            Лучшая награда для мастера — это вещи, которые служат годами и раскрывают свой характер.
          </p>
        </div>

        {/* Карусель отзывов */}
        <div 
          className="relative overflow-hidden"
          style={{ height: isDesktop ? 'auto' : containerHeight }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className={isDesktop ? 'flex flex-row items-stretch' : 'flex flex-col'}
            style={{
              transform,
              transition: disableTransition ? 'none' : 'transform 0.7s ease-in-out',
              willChange: 'transform'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {carouselItems.map((review, idx) => (
              <div 
                key={`${review.id}-${idx}`}
                className={`${isDesktop ? 'w-1/3 px-4' : 'w-full py-4'} flex-shrink-0`}
                style={!isDesktop && cardHeight > 0 ? { height: `${step}px` } : undefined}
              >
                <div 
                  data-card
                  className={`bg-white p-6 md:p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 relative border border-stone-200/80 flex flex-col min-h-0 ${isDesktop ? 'h-full' : ''}`}
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    height: isDesktop ? undefined : cardHeight > 0 ? `${cardHeight}px` : 'auto'
                  }}
                >
                  {/* Фоновая кавычка */}
                  <div className="absolute top-6 right-6 text-stone-200/60 pointer-events-none">
                    <Quote size={40} className="transform rotate-180" />
                  </div>
                  
                  {/* Рейтинг */}
                  <div className="flex gap-1 mb-4 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>

                  {/* Текст отзыва */}
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed mb-6 flex-grow italic font-light break-words">
                    "{review.text}"
                  </p>

                  {/* Подвал карточки */}
                  <div className="mt-auto pt-4 border-t border-stone-100">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="font-serif text-stone-900 font-medium text-base">{review.name}</p>
                        <p className="text-[10px] text-[#885036] font-mono font-bold uppercase tracking-widest mt-0.5">{review.product}</p>
                      </div>
                      <span className="text-xs text-stone-400 font-light">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Кнопка "Стать клиентом" */}
        <div className="text-center mt-12">
          <button 
            onClick={onBecomeClient}
            className="inline-block text-stone-700 hover:text-[#885036] border-b border-stone-400 hover:border-[#885036] pb-1 text-xs font-bold uppercase tracking-widest transition-all duration-300"
          >
            Стать клиентом
          </button>
        </div>

      </div>
    </section>
  );
};