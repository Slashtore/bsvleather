import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-leather-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-leather-200 z-0"></div>
            <img 
              src="/image/me.jpeg" 
              alt="Мастер за работой" 
              className="relative z-10 w-full shadow-lg rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif text-leather-900 mb-6">
              Ремесло и Традиции
            </h2>
            <p className="text-leather-800 mb-6 leading-relaxed font-medium">
              Меня зовут Святослав, и я создаю изделия из кожи. В мире быстрой моды и синтетики я выбираю долговечность. Каждое изделие, выходящее из моей мастерской, сделано вручную, без использования швейных машин.
            </p>
            <p className="text-leather-800 mb-6 leading-relaxed">
              Я использую только кожу растительного дубления от лучших кожевенных заводов Италии и России. Эта кожа "живет" – она дышит, меняется, приобретает благородный блеск и уникальный рисунок в процессе носки.
            </p>
            <p className="text-leather-800 mb-8 leading-relaxed">
              Мой принцип – честность. Честные материалы, честный труд и вещи, которые можно передать по наследству.
            </p>
            
            <div className="grid grid-cols-3 gap-4 border-t border-leather-200 pt-8">
              <div className="text-center">
                <span className="block text-3xl font-serif font-bold text-leather-900">0</span>
                <span className="text-xs uppercase tracking-wider text-leather-600 font-bold">Штамповки</span>
              </div>
              <div className="text-center border-l border-leather-200">
                <span className="block text-3xl font-serif font-bold text-leather-900">100%</span>
                <span className="text-xs uppercase tracking-wider text-leather-600 font-bold">Ручной работы</span>
              </div>
              <div className="text-center border-l border-leather-200">
                <span className="block text-3xl font-serif font-bold text-leather-900">∞</span>
                <span className="text-xs uppercase tracking-wider text-leather-600 font-bold">Вариантов дизайна</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};