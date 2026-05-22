import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  onBecomeClient: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onBecomeClient }) => {
  const reviews = [
    {
      id: 1,
      name: "Александр К.",
      product: "Ремень \"Классический\" (коричневый)",
      text: "Кожа плотная, с приятным матовым финишем. Ношу каждый день — потёртостей нет. Пряжка держит чётко, не люфтит. Отличный ремень.",
      rating: 5,
      date: "20 декабря 2024"
    },
    {
      id: 2,
      name: "Людмила К.",
      product: "Ремень \"Классический\" (красный)",
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleTransitionEnd = () => {
    if (currentIndex >= carouselItems.length - 3) {
      setDisableTransition(true);
      setTimeout(() => {
        setCurrentIndex(2);
        setTimeout(() => setDisableTransition(false), 50);
      }, 50);
    }
  };

  const transform = isDesktop 
    ? `translateX(-${currentIndex * 33.333}%)` 
    : `translateY(-${currentIndex * 11.111}%)`;

  return (
    <section className="py-24 bg-leather-50 border-t border-leather-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-leather-900 mb-4">Отзывы</h2>
          <p className="text-leather-600 max-w-xl mx-auto">
            Лучшая награда для мастера — это вещи, которые служат годами.
          </p>
        </div>

        {/* Контейнер */}
        <div className={`relative overflow-hidden ${isDesktop ? 'min-h-[420px]' : 'h-[1200px] md:h-[420px]'}`}>
          {/* 🔥 Grid на мобильном (равные строки), Flex на десктопе */}
          <div
            className={isDesktop ? 'flex flex-row' : 'grid grid-cols-1'}
            style={{
              gridTemplateRows: isDesktop ? undefined : 'repeat(9, 1fr)',
              transform,
              transition: disableTransition ? 'none' : 'transform 0.7s ease-in-out',
              willChange: 'transform'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {carouselItems.map((review, idx) => (
              <div 
                key={`${review.id}-${idx}`}
                className={`${isDesktop ? 'w-1/3 px-4' : 'py-4'} ${isDesktop ? '' : 'w-full'} flex-shrink-0`}
              >
                <div 
                  className="bg-white p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300 relative border border-leather-200 flex flex-col h-full"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className="absolute top-6 right-8 text-leather-200">
                    <Quote size={48} className="transform rotate-180" />
                  </div>
                  
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-leather-800 leading-relaxed mb-6 flex-grow italic">
                    "{review.text}"
                  </p>

                  <div className="mt-auto pt-6 border-t border-leather-200">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="font-serif text-leather-900 font-bold text-lg">{review.name}</p>
                            <p className="text-xs text-leather-500 uppercase tracking-wider mt-1">{review.product}</p>
                        </div>
                        <span className="text-xs text-leather-400">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
           <button 
              onClick={onBecomeClient}
              className="inline-block text-leather-600 border-b border-leather-400 pb-1 text-sm font-bold uppercase tracking-widest hover:text-leather-900 hover:border-leather-900 transition-colors"
           >
              Стать клиентом
           </button>
        </div>
      </div>
    </section>
  );
};