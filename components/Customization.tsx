import React, { useState } from 'react';
import { Box, CheckCircle2, AlertCircle } from 'lucide-react';

interface CustomizationProps {
  onOrderClick: () => void;
}

export const Customization: React.FC<CustomizationProps> = ({ onOrderClick }) => {
  // Две вариации с данными о материалах
  const variations = [
    {
      src: '/image/product previews 1.jpg',
      alt: 'Вариант 1',
      label: 'Коньяк / Беж',
      materials: {
        leather: { name: 'Гладкая кожа чёрного цвета', color: '#1a1a1a' },
        edge: { name: 'Вощёный неокрашенный урез', color: '#0f0f0f' },
        thread: { name: 'Плоская синтетическая нить', color: '#000000' }
      }
    },
    {
      src: '/image/product previews 2.jpg',
      alt: 'Вариант 2',
      label: 'Чёрный / Чёрный',
      materials: {
        leather: { name: 'Гладкая кожа коньячного цвета', color: '#8a6a5c' },
        edge: { name: 'Полированный окрашенный урез', color: '#6b5d52' },
        thread: { name: 'Плоская синтетическая нить', color: '#3c89bf' }
      }
    },
    {
      src: '/image/product previews 3.jpg',
      alt: 'Вариант 3',
      label: 'Чёрный / Чёрный',
      materials: {
        leather: { name: 'Гладкая кожа тёмно-красного цвета', color: '#ad2122' },
        edge: { name: 'Полированный окрашенный урез', color: '#5078be' },
        thread: { name: 'Плоская синтетическая нить', color: '#deb311' }
      }
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <section className="py-24 bg-leather-900 text-leather-50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-leather-800/20 skew-x-12 transform translate-x-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* === ЛЕВАЯ ЧАСТЬ (100% КАК БЫЛО) === */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-leather-800 rounded-full text-xs font-bold uppercase tracking-widest text-leather-200 mb-6 border border-leather-700">
              <Box size={14} />
              <span>Уникальная услуга</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Примерь, <br/>
              <span className="text-leather-200">прежде чем платить</span>
            </h2>
            
            <p className="text-lg text-leather-200 mb-8 leading-relaxed font-light">
              Боитесь, что сочетание зеленой кожи и оранжевой нити будет выглядеть странно? Или не уверены, подойдет ли латунная пряжка к вашему образу?
            </p>

            <p className="text-white mb-8 leading-relaxed">
              Я создам <strong className="text-leather-200">фотореалистичные изображения</strong> вашего будущего изделия. Мы подберем материалы, цвета и фурнитуру еще до раскроя кожи. Это бесплатно и гарантирует, что вы получите именно то, о чем мечтали.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-900/50 rounded-full text-green-400 mt-1">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Наглядная визуализация</h4>
                  <p className="text-leather-200 text-sm">Пришлю серию изображений с разных ракурсов. Вы увидите, как изделие будет выглядеть в жизни.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-900/50 rounded-full text-blue-400 mt-1">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Конструктор материалов</h4>
                  <p className="text-leather-200 text-sm">Меняем кожу, нитки и урезы в программе. Никаких "сюрпризов" в готовом изделии.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-900/50 rounded-full text-purple-400 mt-1">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Экономия и гарантия</h4>
                  <p className="text-leather-200 text-sm">Мы не испортим дорогую кожу на эксперименты. Все пробы — в цифре.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-leather-800/50 rounded-sm border border-leather-700 flex gap-3">
               <AlertCircle size={20} className="text-leather-200 flex-shrink-0 mt-0.5" />
               <p className="text-xs text-leather-200 leading-relaxed">
                 Обратите внимание: настройки экранов телефонов и мониторов различаются, поэтому цвета на визуализации могут незначительно отличаться от реального оттенка кожи.
               </p>
            </div>

            <div className="mt-10">
              <button 
                onClick={onOrderClick}
                className="inline-block bg-white text-leather-900 px-8 py-4 uppercase tracking-widest font-bold text-sm hover:bg-leather-100 transition-colors rounded-sm"
              >
                Заказать 3D макет
              </button>
            </div>
          </div>

          {/* === ПРАВАЯ ЧАСТЬ (Desktop как было / Mobile панель снизу) === */}
          <div className="w-full lg:w-1/2 relative flex flex-col">
             
            {/* Контейнер картинки */}
            <div className="aspect-[4/3] md:aspect-square bg-leather-900 border border-leather-700 rounded-sm md:rounded-b-none relative overflow-hidden group shadow-2xl">
              
              <img 
                key={variations[currentIdx].src}
                src={variations[currentIdx].src} 
                alt={variations[currentIdx].alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Затемнение ТОЛЬКО для десктопа (под абсолютную панель) */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/0 pointer-events-none"></div>

              {/* Кнопки 1, 2, 3 */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col gap-2 z-20">
                  {[0, 1, 2].map((idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-10 h-10 md:w-12 md:h-12 backdrop-blur-md border rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-lg ${
                        currentIdx === idx 
                          ? 'bg-white text-leather-900 border-white' 
                          : 'bg-black/50 text-white border-white/30 hover:bg-black/70'
                      }`}
                      aria-label={`Вариант ${idx + 1}`}
                    >
                        {idx + 1}
                    </button>
                  ))}
              </div>

              {/* === DESKTOP PANEL (Абсолютная, как было изначально) === */}
              <div className="hidden md:block absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-5 border border-white/10 rounded-sm shadow-xl z-20">
                 <div className="flex justify-between items-end">
                    <div>
                        <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Project</p>
                        <p className="text-white font-serif text-xl font-medium tracking-wide">Кардхолдер Тинькофф</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-white/90 font-medium">{variations[currentIdx].materials.leather.name}</span>
                          <div className="w-4 h-4 rounded-full border border-white/50 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.leather.color }}></div>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-white/90 font-medium">{variations[currentIdx].materials.edge.name}</span>
                          <div className="w-4 h-4 rounded-full border border-white/50 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.edge.color }}></div>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-white/90 font-medium">{variations[currentIdx].materials.thread.name}</span>
                          <div className="w-4 h-4 rounded-full border border-white/50 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.thread.color }}></div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* === MOBILE PANEL (Отдельный блок снизу, только для мобильных) === */}
            <div className="md:hidden bg-leather-800 border border-t-0 border-leather-700 rounded-b-sm p-4 shadow-xl">
               <div className="flex flex-col gap-3">
                  <div className="mb-1">
                      <p className="text-leather-300 text-[10px] uppercase tracking-widest">Project</p>
                      <p className="text-white font-serif text-lg font-medium">Кардхолдер Тинькофф</p>
                  </div>
                  <div className="flex flex-col gap-2">
                     <div className="flex items-center justify-between">
                        <span className="text-xs text-leather-200 font-medium truncate max-w-[70%]">{variations[currentIdx].materials.leather.name}</span>
                        <div className="w-4 h-4 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.leather.color }}></div>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-xs text-leather-200 font-medium truncate max-w-[70%]">{variations[currentIdx].materials.edge.name}</span>
                        <div className="w-4 h-4 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.edge.color }}></div>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-xs text-leather-200 font-medium truncate max-w-[70%]">{variations[currentIdx].materials.thread.name}</span>
                        <div className="w-4 h-4 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.thread.color }}></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};