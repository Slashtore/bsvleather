import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-stone-100/60 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* ЛЕВАЯ ЧАСТЬ: Фотография мастера с аккуратной рамкой */}
          <div className="w-full lg:w-5/12 relative">
            {/* Лаконичная рамка со смещением */}
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-[#e6ccb2] z-0 hidden sm:block rounded-sm" />

            <div className="relative z-10 overflow-hidden rounded-sm shadow-xl group border border-stone-200 bg-white">
              <img 
                src="/image/me.jpeg" 
                alt="Святослав Бокун — мастер по коже" 
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
          </div>
          
          {/* ПРАВАЯ ЧАСТЬ: Текст и философия */}
          <div className="w-full lg:w-7/12">
            
            {/* Категория / Надзаголовок */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#885036]" />
              <span className="text-[#885036] font-mono text-xs uppercase tracking-[0.25em] font-bold">
                Философия & Мастерство
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-900 mb-6 tracking-tight leading-tight">
              Ремесло и Традиции
            </h2>
            
            {/* Вводный тезис */}
            <p className="text-stone-800 text-base sm:text-lg mb-5 leading-relaxed font-normal">
              Меня зовут Святослав, и я создаю вещи из кожи. В мире быстрой моды и синтетики я выбираю долговечность. Каждое изделие, выходящее из моей мастерской, сшито исключительно вручную, без использования швейных машин.
            </p>

            <p className="text-stone-600 text-sm sm:text-base mb-6 leading-relaxed font-light">
              Я использую только кожу растительного дубления от проверенных заводов Италии и России. Эта кожа «живёт» — она дышит, меняется, приобретает благородный патиновый блеск и уникальный рисунок в процессе использования.
            </p>

            {/* Выделенная цитата-принцип */}
            <div className="p-4 sm:p-5 bg-white border-l-4 border-[#885036] rounded-r-sm shadow-sm mb-8 my-6">
              <p className="text-stone-900 font-serif italic text-base sm:text-lg leading-relaxed">
                «Мой принцип — честность. Честные материалы, честный ручной труд и вещи, которые можно передавать по наследству.»
              </p>
            </div>
            
            {/* Блок ключевых показателей (Цифры единого цвета #885036) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 border-t border-stone-200/80 pt-8">
              <div className="text-center sm:text-left">
                <span className="block text-3xl sm:text-4xl font-serif font-bold text-[#885036] tracking-tight">0</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-bold mt-1 block">
                  Швейных машин
                </span>
              </div>
              <div className="text-center sm:text-left border-x border-stone-200/80 px-2 sm:px-4">
                <span className="block text-3xl sm:text-4xl font-serif font-bold text-[#885036] tracking-tight">100%</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-bold mt-1 block">
                  Ручной седельный шов
                </span>
              </div>
              <div className="text-center sm:text-left pl-1 sm:pl-2">
                <span className="block text-3xl sm:text-4xl font-serif font-bold text-[#885036] tracking-tight">∞</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-bold mt-1 block">
                  Вариантов кастома
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};