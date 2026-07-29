import React from 'react';
import { ArrowRight } from 'lucide-react';

interface MaterialsProps {
  onOpenCatalog?: () => void;
}

export const Materials: React.FC<MaterialsProps> = ({ onOpenCatalog }) => {
  // Спокойная, естественная палитра кожи растительного дубления
  const leathers = [
    { name: 'Коньяк (Cognac)', color: '#885036', rotate: '-rotate-2', desc: 'Теплый классический' },
    { name: 'Шоколад (Chocolate)', color: '#38231f', rotate: 'rotate-1', desc: 'Глубокий тёмный' },
    { name: 'Черный (Nero)', color: '#222224', rotate: '-rotate-1', desc: 'Мягкий графит' },
    { name: 'Олива (Olive)', color: '#434b26', rotate: 'rotate-3', desc: 'Сдержанный оливковый' },
    { name: 'Синий (Navy)', color: '#212c4f', rotate: '-rotate-3', desc: 'Глубокий матовый' },
    { name: 'Бордо (Burgundy)', color: '#541e24', rotate: 'rotate-2', desc: 'Приглушенный винный' },
    { name: 'Натуральный (Natural)', color: '#d6b899', rotate: '-rotate-1', desc: 'Естественный краст' },
    { name: 'Изумруд (Emerald)', color: '#1a3d3a', rotate: 'rotate-1', desc: 'Благородный хвоя' },
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
    <section id="materials" className="py-24 bg-stone-100/60 overflow-hidden">
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
                className="inline-flex items-center justify-center gap-2 border border-leather-800 px-6 py-3 text-leather-900 uppercase tracking-widest text-xs font-bold hover:bg-leather-900 hover:text-white transition-colors rounded-sm shadow-sm"
              >
                Каталог кожи и ниток
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Палитра кожи */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between border-b border-leather-200 pb-2 mb-8">
              <h3 className="text-2xl font-serif text-leather-900">
                Палитра кожи
              </h3>
              <span className="text-xs font-mono text-leather-500 uppercase tracking-wider">
                Veg-Tan Leather
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-8 p-2">
              {leathers.map((leather) => (
                <div 
                  key={leather.name} 
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Образец кожи */}
                  <div 
                    className={`w-full aspect-[4/4.5] rounded-md mb-3 relative overflow-hidden transition-all duration-300 transform ${leather.rotate} group-hover:rotate-0 group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-10 flex flex-col justify-between p-2.5`}
                    style={{
                      backgroundColor: leather.color,
                      boxShadow: `
                        inset 0 1px 1px rgba(255, 255, 255, 0.3),
                        inset 0 -2px 4px rgba(0, 0, 0, 0.35),
                        0 4px 6px -1px rgba(0, 0, 0, 0.18),
                        0 10px 18px -4px rgba(0, 0, 0, 0.22)
                      `
                    }}
                  >
                    {/* 1. Наложение файла фактуры из public/image/leather-grain.png */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                      style={{
                        backgroundImage: "url('/image/leather-grain.png')",
                        backgroundRepeat: 'repeat',
                        backgroundSize: '100px 100px'
                      }}
                    />

                    {/* 2. Мягкий рассеянный объёмный свет */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-black/20" />

                    {/* 3. Латунный люверс */}
                    <div className="w-3.5 h-3.5 rounded-full bg-stone-200 border-2 border-amber-800/50 shadow-[inset_0_2px_3px_rgba(0,0,0,0.8)] mx-auto relative z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-900/60 shadow-inner" />
                    </div>

                    {/* 4. Биговка (канавка вдоль среза) */}
                    <div className="absolute inset-1.5 rounded-[4px] border border-black/15 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />

                    {/* 5. Клеймо VERA PELLE */}
                    <div className="text-center relative z-10 select-none pointer-events-none opacity-25 mix-blend-overlay">
                      <p className="text-[8px] font-mono font-black tracking-tighter leading-none text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                        VERA PELLE
                      </p>
                      <p className="text-[7px] font-mono tracking-widest leading-none text-black mt-0.5">
                        1.4–1.6mm
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-leather-800 text-center uppercase tracking-wide group-hover:text-leather-950 transition-colors">
                    {leather.name}
                  </span>
                  <span className="text-[11px] text-leather-500 text-center font-serif italic mt-0.5">
                    {leather.desc}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="mt-8 text-xs text-leather-400 italic bg-white/60 p-3 rounded border border-stone-200/60">
              * Каждый отрез имеет неповторимый мерейный рисунок и естественные прожилки, присущие коже растительного дубления.
            </p>
          </div>

          {/* Нитки и Фурнитура */}
          <div className="lg:col-span-5 flex flex-col gap-12 bg-white p-8 rounded-lg border border-stone-200/80 shadow-sm">
            <div>
              <h3 className="text-xl font-serif text-leather-900 mb-6 border-b border-leather-200 pb-2">
                Вощёная нить (0.5 - 1.0 мм)
              </h3>
              <p className="text-leather-600 mb-6 text-sm leading-relaxed">
                Плетёная нить двойного сучения с богатой восковой пропиткой. Обеспечивает вечный седельный шов, который не распустится даже при повреждении одного стежка.
              </p>
              <div className="grid grid-cols-4 gap-4">
                {threads.map((thread) => (
                  <div key={thread.name} className="flex flex-col items-center gap-1.5 group cursor-default">
                    <div 
                      className="w-10 h-10 rounded-full border border-stone-300 shadow-inner transition-transform duration-300 group-hover:scale-110 relative flex items-center justify-center"
                      style={{ 
                        backgroundColor: thread.color,
                        boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="w-6 h-6 rounded-full border border-white/20 opacity-60" />
                    </div>
                    <span className="text-[11px] font-medium text-leather-700 text-center leading-tight">
                      {thread.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif text-leather-900 mb-4 border-b border-leather-200 pb-2">
                Усиленная фурнитура
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded flex items-start gap-3 group hover:border-amber-600/50 transition-colors">
                  <div className="w-3 h-full min-h-[36px] rounded-sm shrink-0 shadow-sm" style={{ backgroundColor: '#D4AF37', backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}></div>
                  <div>
                    <h4 className="font-bold text-leather-900 text-sm">Латунь</h4>
                    <p className="text-[11px] text-leather-600 leading-normal mt-0.5">
                      Тяжёлая, цельнолитая. Со временем красиво патинируется.
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded flex items-start gap-3 group hover:border-stone-400 transition-colors">
                  <div className="w-3 h-full min-h-[36px] rounded-sm shrink-0 shadow-sm" style={{ backgroundColor: '#A8A8A8', backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }}></div>
                  <div>
                    <h4 className="font-bold text-leather-900 text-sm">Нержавеющая сталь</h4>
                    <p className="text-[11px] text-leather-600 leading-normal mt-0.5">
                      Серебристый блеск. Абсолютная защита от коррозии.
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded flex items-start gap-3 group hover:border-stone-500 transition-colors">
                  <div className="w-3 h-full min-h-[36px] rounded-sm shrink-0 shadow-sm" style={{ backgroundColor: '#696863', backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }}></div>
                  <div>
                    <h4 className="font-bold text-leather-900 text-sm">Титан</h4>
                    <p className="text-[11px] text-leather-600 leading-normal mt-0.5">
                      Тёмно-серый, гипоаллергенный, невероятно лёгкий металл.
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded flex items-start gap-3 group hover:border-amber-700/50 transition-colors">
                  <div className="w-3 h-full min-h-[36px] rounded-sm shrink-0 shadow-sm" style={{ backgroundColor: '#B87333', backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}></div>
                  <div>
                    <h4 className="font-bold text-leather-900 text-sm">Медь</h4>
                    <p className="text-[11px] text-leather-600 leading-normal mt-0.5">
                      Аутентичный красно-винный оттенок под винтаж.
                    </p>
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