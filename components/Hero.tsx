import React from 'react';
import { Mouse, ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../constants';
import { Logo } from './Logo';

interface HeroProps {
  onNavigate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#14110f]">
      {/* 1. Атмосферный задний фон с текстурой */}
      <div 
        className="absolute inset-0 z-0 opacity-35 transform scale-105 transition-transform duration-10000 ease-out"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      
      {/* 2. Градиентные виньетки для читаемости текста */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-[#14110f]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black/80" />

      {/* 3. Основной контент */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        
        {/* Логотип-печать сверху (СКРЫТ на мобилках через hidden, виден от md и выше) */}
        <div className="hidden md:block mb-6 text-[#e6ccb2]/90 transform hover:scale-105 transition-transform duration-500 cursor-pointer">
           <Logo variant="page" className="w-32 h-32 md:w-44 md:h-44 drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Надзаголовок / Категория */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-px bg-[#e6ccb2]/40" />
          <span className="text-[#e6ccb2]/80 font-mono text-[11px] md:text-xs uppercase tracking-[0.3em]">
            Ручная работа • Италия & Россия
          </span>
          <span className="w-8 h-px bg-[#e6ccb2]/40" />
        </div>

        {/* Главный заголовок H1 */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-stone-100 tracking-tight leading-[1.15] mb-4 max-w-3xl drop-shadow-md">
          Изделия из кожи растительного дубления
        </h1>

        {/* Подзаголовок / УТП */}
        <p className="text-stone-300/80 text-sm md:text-base font-light max-w-xl mx-auto mb-8 leading-relaxed">
          Каждая вещь сшита вручную вечным седельным швом. 
          Создана, чтобы служить десятилетиями и красиво стареть.
        </p>

        {/* Кнопка действия (CTA) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <button 
            onClick={onNavigate}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 overflow-hidden border border-[#e6ccb2]/30 hover:border-[#e6ccb2]/70 bg-stone-900/60 hover:bg-stone-800/80 transition-all duration-300 rounded-sm shadow-xl backdrop-blur-sm"
          >
            {/* Анимированный светящийся блик при наведении */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#e6ccb2]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative text-stone-100 text-xs uppercase tracking-[0.25em] font-bold group-hover:text-[#e6ccb2] transition-colors">
              Перейти в каталог
            </span>
            <ArrowRight size={15} className="relative text-[#e6ccb2] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Буллеты доверия под кнопкой */}
        <div className="grid grid-cols-3 gap-4 border-t border-stone-800/80 pt-6 w-full max-w-lg">
          <div className="flex flex-col items-center">
            <span className="text-[#e6ccb2] font-bold text-xs md:text-sm tracking-wide">100%</span>
            <span className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider mt-0.5">Veg-Tan Leather</span>
          </div>
          <div className="flex flex-col items-center border-x border-stone-800/80 px-2">
            <span className="text-[#e6ccb2] font-bold text-xs md:text-sm tracking-wide">Ручной</span>
            <span className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider mt-0.5">Седельный шов</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#e6ccb2] font-bold text-xs md:text-sm tracking-wide">Вечная</span>
            <span className="text-[10px] md:text-xs text-stone-400 uppercase tracking-wider mt-0.5">Гарантия на нить</span>
          </div>
        </div>

      </div>

      {/* Индикатор скролла вниз */}
      <div 
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3 text-stone-400/60 hover:text-stone-200 transition-colors cursor-pointer z-10" 
        onClick={onNavigate}
      >
        <span className="text-xs uppercase tracking-[0.2em] font-mono">Листать вниз</span>
        <Mouse size={28} className="animate-bounce" />
      </div>
    </section>
  );
};