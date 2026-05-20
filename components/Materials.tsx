import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MaterialsProps {
    onOpenCatalog?: () => void;
}

export const Materials: React.FC<MaterialsProps> = ({ onOpenCatalog }) => {
  const leathers = [
    { name: 'Коньяк (Cognac)', color: '#965a3e' },
    { name: 'Шоколад (Chocolate)', color: '#3e2723' },
    { name: 'Черный (Nero)', color: '#1a1a1a' },
    { name: 'Олива (Olive)', color: '#4b5320' },
    { name: 'Синий (Navy)', color: '#1a237e' },
    { name: 'Бордо (Burgundy)', color: '#4a0404' },
    { name: 'Натуральный (Natural)', color: '#e6ccb2' },
    { name: 'Изумруд (Emerald)', color: '#0f3d3e' },
  ];

  const threads = [
    { name: 'Бежевая', color: '#f5f5dc' },
    { name: 'Коричневая', color: '#795548' },
    { name: 'Чёрная', color: '#000000' },
    { name: 'Красная', color: '#d32f2f' },
    { name: 'Синяя', color: '#1976d2' },
    { name: 'Серая', color: '#9e9e9e' },
    { name: 'Зелёная', color: '#167d5a' },
    { name: 'Жёлтая', color: '#d5aa30' },
  ];

  return (
    <section id="materials" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-leather-900 mb-4">Материалы</h2>
          <p className="text-leather-600 max-w-2xl mx-auto mb-8">
            Я работаю исключительно с кожей растительного дубления (Италия, Россия). 
            Она плотная, приятно пахнет и со временем покрывается благородной патиной.
          </p>
          <div className="flex justify-center">
            {onOpenCatalog && (
                <button 
                  onClick={onOpenCatalog}
                  className="inline-flex items-center justify-center gap-2 border border-leather-800 px-6 py-3 text-leather-900 uppercase tracking-widest text-xs font-bold hover:bg-leather-900 hover:text-white transition-colors rounded-sm"
                >
                  Каталог кожи и ниток
                  <ArrowRight size={14} />
                </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Leather Palette */}
          <div>
            <h3 className="text-2xl font-serif text-leather-900 mb-8 border-b border-leather-200 pb-2">
              Палитра кожи
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {leathers.map((leather) => (
                <div key={leather.name} className="flex flex-col items-center group">
                  <div 
                    className="w-full aspect-square rounded-sm shadow-md mb-3 transition-transform duration-300 group-hover:scale-105 border border-leather-200 relative overflow-hidden"
                    style={{ backgroundColor: leather.color }}
                  >
                    {/* Gloss effect simulation */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50"></div>
                  </div>
                  <span className="text-xs font-bold text-leather-700 text-center uppercase tracking-wide">
                    {leather.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-leather-400 italic">
              * Реальный оттенок может незначительно отличаться из-за особенностей выделки партии кожи.
            </p>
          </div>

          {/* Threads & Hardware */}
          <div className="flex flex-col gap-12">
            
            {/* Threads */}
            <div>
              <h3 className="text-2xl font-serif text-leather-900 mb-8 border-b border-leather-200 pb-2">
                Вощеная нить
              </h3>
              <p className="text-leather-600 mb-6 text-sm">
                Использую плоскую плетеную нить толщиной 0.8–1.0 мм. Она пропитана воском, не гниет и не выцветает. Вы можете выбрать нить в тон или контрастную.
              </p>
              <div className="flex flex-wrap gap-6">
                {threads.map((thread) => (
                  <div key={thread.name} className="flex flex-col items-center gap-2 group cursor-default">
                    <div 
                        className="w-12 h-12 rounded-full border-2 border-leather-200 shadow-inner"
                        style={{ backgroundColor: thread.color }}
                    ></div>
                    <span className="text-xs font-medium text-leather-600">{thread.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware */}
            <div>
              <h3 className="text-2xl font-serif text-leather-900 mb-4 border-b border-leather-200 pb-2">
                Фурнитура
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                 {/* Латунь */}
                 <div className="p-3 bg-leather-50 border border-leather-200 rounded-sm flex flex-col items-center text-center group hover:border-leather-400 transition-colors">
                    <div className="w-full h-1 rounded-none mb-2" style={{ backgroundColor: '#D4AF37' }}></div>
                    <h4 className="font-bold text-leather-900 text-base mb-1">Латунь</h4>
                    <p className="text-[12px] text-leather-600 leading-snug">
                        Золотистая, тяжёлая. Стареет красиво, покрываясь патиной.
                    </p>
                 </div>
                 {/* Сталь / Никель */}
                 <div className="p-3 bg-leather-50 border border-leather-200 rounded-sm flex flex-col items-center text-center group hover:border-leather-400 transition-colors">
                    <div className="w-full h-1 rounded-none mb-2" style={{ backgroundColor: '#C0C0C0' }}></div>
                    <h4 className="font-bold text-leather-900 text-base mb-1">Сталь / Никель</h4>
                    <p className="text-[12px] text-leather-600 leading-snug">
                        Серебристая, гипоаллергенная. Для строгого стиля.
                    </p>
                 </div>
                 {/* Титан */}
                 <div className="p-3 bg-leather-50 border border-leather-200 rounded-sm flex flex-col items-center text-center group hover:border-leather-400 transition-colors">
                    <div className="w-full h-1 rounded-none mb-2" style={{ backgroundColor: '#878681' }}></div>
                    <h4 className="font-bold text-leather-900 text-base mb-1">Титан</h4>
                    <p className="text-[12px] text-leather-600 leading-snug">
                        Серый матовый. Лёгкий, прочный, не коррозирует.
                    </p>
                 </div>
                 {/* Медь */}
                 <div className="p-3 bg-leather-50 border border-leather-200 rounded-sm flex flex-col items-center text-center group hover:border-leather-400 transition-colors">
                    <div className="w-full h-1 rounded-none mb-2" style={{ backgroundColor: '#B87333' }}></div>
                    <h4 className="font-bold text-leather-900 text-base mb-1">Медь</h4>
                    <p className="text-[12px] text-leather-600 leading-snug">
                        Красноватая. Быстро окисляется, делает вещь уникальной.
                    </p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};