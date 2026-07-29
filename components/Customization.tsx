import React, { useState } from 'react';
import { Box, CheckCircle2, AlertCircle, Sparkles, Layers } from 'lucide-react';

interface CustomizationProps {
  onOrderClick: () => void;
}

export const Customization: React.FC<CustomizationProps> = ({ onOrderClick }) => {
  // Вариации с данными о материалах
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
    <section className="py-20 md:py-24 bg-[#14110f] text-stone-100 overflow-hidden relative border-t border-b border-stone-800">
      {/* Декоративный диагональный блик на фоне */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-900/30 skew-x-12 transform translate-x-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* === ЛЕВАЯ ЧАСТЬ: ИНФОРМАЦИЯ И ПРЕИМУЩЕСТВА === */}
          <div className="w-full lg:w-1/2">
            
            {/* Надзаголовок */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-stone-900/90 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#e6ccb2] mb-6 border border-stone-800 shadow-sm">
              <Box size={14} className="text-[#e6ccb2]" />
              <span>Персональная визуализация</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-100 mb-6 leading-tight tracking-tight font-medium">
              Примерь, <br />
              <span className="text-[#e6ccb2]">прежде чем платить</span>
            </h2>
            
            <p className="text-base md:text-lg text-stone-300/80 mb-6 leading-relaxed font-light">
              Боитесь, что сочетание зелёной кожи и оранжевой нити будет выглядеть слишком смело? Или не уверены, подойдёт ли латунная фурнитура?
            </p>

            <p className="text-stone-200 text-sm md:text-base mb-8 leading-relaxed font-light">
              Я создам <strong className="text-[#e6ccb2] font-semibold">фотореалистичные изображения</strong> вашего будущего изделия. Мы подберём материалы, цвета и фурнитуру ещё до первого надреза кожи. Это бесплатно и гарантирует идеальный результат.
            </p>

            {/* Список преимуществ */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-stone-900 border border-stone-800 rounded-full text-[#e6ccb2] mt-1 shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-stone-100 text-base">Наглядная 3D визуализация</h4>
                  <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed mt-0.5">
                    Пришлю серию изображений с разных ракурсов. Вы увидите, как изделие будет выглядеть в жизни.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-stone-900 border border-stone-800 rounded-full text-[#e6ccb2] mt-1 shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-stone-100 text-base">Конструктор материалов</h4>
                  <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed mt-0.5">
                    Меняем оттенок кожи, цвет нити и обработку уреза в реальном времени. Никаких сюрпризов.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-stone-900 border border-stone-800 rounded-full text-[#e6ccb2] mt-1 shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-stone-100 text-base">Экономия времени и кожи</h4>
                  <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed mt-0.5">
                    Мы не тратим дорогую итальянскую кожу на эксперименты. Все пробы проводятся в цифре.
                  </p>
                </div>
              </div>
            </div>

            {/* Важное примечание про цвета */}
            <div className="mt-8 p-4 bg-stone-900/60 rounded-sm border border-stone-800 flex gap-3 items-start">
               <AlertCircle size={18} className="text-[#e6ccb2] flex-shrink-0 mt-0.5" />
               <p className="text-xs text-stone-400 leading-relaxed font-light">
                 Обратите внимание: цветопередача экранов смартфонов и мониторов различается, поэтому цвета на 3D макете могут незначительно отличаться от живого оттенка растительного дубления.
               </p>
            </div>

            {/* Кнопка CTA */}
            <div className="mt-8">
              <button 
                onClick={onOrderClick}
                className="inline-flex items-center gap-2 bg-[#1a110f] hover:bg-stone-900 text-[#e6ccb2] px-8 py-4 uppercase tracking-widest font-bold text-xs transition-all duration-300 rounded-sm border border-[#e6ccb2]/40 shadow-xl"
              >
                <Sparkles size={16} />
                <span>Заказать 3D макет</span>
              </button>
            </div>
          </div>

          {/* === ПРАВАЯ ЧАСТЬ: ИНТЕРАКТИВНЫЙ ПРЕВЬЮЕР === */}
          <div className="w-full lg:w-1/2 relative flex flex-col">
             
            {/* Контейнер картинки */}
            <div className="aspect-[4/3] md:aspect-square bg-stone-950 border border-stone-800 rounded-sm md:rounded-b-none relative overflow-hidden group shadow-2xl">
              
              <img 
                key={variations[currentIdx].src}
                src={variations[currentIdx].src} 
                alt={variations[currentIdx].alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Затемнение снизу для текста */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Кнопки переключения 1, 2, 3 */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col gap-2 z-20">
                  {[0, 1, 2].map((idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-10 h-10 md:w-12 md:h-12 backdrop-blur-md border rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all shadow-xl ${
                        currentIdx === idx 
                          ? 'bg-[#e6ccb2] text-[#14110f] border-[#e6ccb2] scale-110' 
                          : 'bg-black/60 text-stone-200 border-white/20 hover:bg-black/80'
                      }`}
                      aria-label={`Вариант ${idx + 1}`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
              </div>

              {/* DESKTOP PANEL (Панель поверх фото) */}
              <div className="hidden md:block absolute bottom-6 left-6 right-6 bg-stone-950/80 backdrop-blur-md p-5 border border-stone-800 rounded-sm shadow-xl z-20">
                 <div className="flex justify-between items-end">
                    <div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-1 font-mono">Проект 3D</p>
                        <p className="text-stone-100 font-serif text-lg font-medium tracking-wide">Кардхолдер Tinkoff</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-300 font-light">{variations[currentIdx].materials.leather.name}</span>
                          <div className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.leather.color }} />
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-300 font-light">{variations[currentIdx].materials.edge.name}</span>
                          <div className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.edge.color }} />
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-300 font-light">{variations[currentIdx].materials.thread.name}</span>
                          <div className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.thread.color }} />
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* MOBILE PANEL (Панель под фото для мобилок) */}
            <div className="md:hidden bg-stone-900 border border-t-0 border-stone-800 rounded-b-sm p-4 shadow-xl">
               <div className="flex flex-col gap-3">
                  <div className="mb-1">
                      <p className="text-stone-400 text-[10px] uppercase tracking-widest font-mono">Проект 3D</p>
                      <p className="text-stone-100 font-serif text-base font-medium">Кардхолдер Tinkoff</p>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-stone-800 pt-2">
                     <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-300 font-light truncate max-w-[75%]">{variations[currentIdx].materials.leather.name}</span>
                        <div className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.leather.color }} />
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-300 font-light truncate max-w-[75%]">{variations[currentIdx].materials.edge.name}</span>
                        <div className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.edge.color }} />
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-300 font-light truncate max-w-[75%]">{variations[currentIdx].materials.thread.name}</span>
                        <div className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm flex-shrink-0" style={{ backgroundColor: variations[currentIdx].materials.thread.color }} />
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