import React, { useState, useRef } from 'react';
import { Sparkles, Clock, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export const Patina: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <section className="py-20 md:py-24 bg-stone-900 text-stone-100 border-t border-stone-800 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Шапка блока */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e6ccb2] font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-[#885036]" />
            Эволюция натуральной кожи
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 tracking-tight">
            Красота старения
          </h2>
          <p className="text-stone-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            Кожа растительного дубления со временем не изнашивается, а раскрывает свой истинный характер, покрываясь благородной патиной.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
          
          {/* Интерактивный слайдер До / После */}
          <div className="lg:col-span-7">
            <div 
              ref={containerRef}
              className="relative aspect-[4/3] w-full rounded-sm overflow-hidden select-none cursor-ew-resize shadow-2xl border border-stone-800 touch-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Фото ПОСЛЕ (Патина 2 года) — фоновое */}
              <img 
                src="/image/patina-after.jpg" 
                alt="Кожа с патиной спустя 2 года использования" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xs text-[10px] font-mono font-bold uppercase tracking-widest text-[#e6ccb2] border border-stone-700">
                Спустя 2 года
              </div>

              {/* Фото ДО (Новое изделие) — обрезается через clip-path */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img 
                  src="/image/patina-before.jpg" 
                  alt="Новое кожаное изделие" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xs text-[10px] font-mono font-bold uppercase tracking-widest text-stone-300 border border-stone-700 whitespace-nowrap">
                  Новое изделие
                </div>
              </div>

              {/* Вертикальная линия-разделитель с удобным ползунком */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-[#e6ccb2] shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1a110f] border-2 border-[#e6ccb2] flex items-center justify-center text-[#e6ccb2] shadow-2xl transition-transform hover:scale-110">
                  <div className="flex items-center -space-x-1">
                    <ChevronLeft size={16} />
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-[11px] font-mono text-stone-500 mt-3">
              ← Потяните ползунок, чтобы увидеть разницу →
            </p>
          </div>

          {/* Правая часть: Преимущества и факты */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-stone-950/60 border border-stone-800 rounded-sm space-y-3">
              <div className="flex items-center gap-3 text-[#e6ccb2]">
                <Clock size={20} className="shrink-0" />
                <h3 className="font-serif font-medium text-lg text-white">Живая патина</h3>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                Солнечный свет, масла из кожи рук и естественное трение придают изделию глубокий янтарный оттенок и легкий шелковистый глянец.
              </p>
            </div>

            <div className="p-6 bg-stone-950/60 border border-stone-800 rounded-sm space-y-3">
              <div className="flex items-center gap-3 text-[#e6ccb2]">
                <ShieldCheck size={20} className="shrink-0" />
                <h3 className="font-serif font-medium text-lg text-white">Без пластика и синтетики</h3>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed font-light">
                Обычная кожа с пигментным покрытием со временем трескается и облезает. Кожа растительного дубления прокрашена насквозь натуральными танинами мимозы и дуба, поэтому она благородно стареет, становясь только красивее с каждым годом.
              </p>
            </div>

            <div className="p-4 bg-[#885036]/10 border border-[#885036]/30 rounded-sm text-xs text-[#e6ccb2] leading-relaxed">
              💡 <strong>Совет мастера:</strong> Чтобы ускорить проявление красивой патины, достаточно регулярно пользоваться изделием и раз в полгода обрабатывать его бальзамом на основе пчелиного воска.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};