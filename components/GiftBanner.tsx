import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';

interface GiftBannerProps {
  onOrderClick: () => void;
}

export const GiftBanner: React.FC<GiftBannerProps> = ({ onOrderClick }) => {
  return (
    <section className="py-16 bg-[#14110f] text-stone-100 relative overflow-hidden border-t border-b border-stone-800/80">
      {/* Декоративные фоновые блики */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6ccb2]/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-stone-800/20 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 bg-stone-900/60 p-8 md:p-12 rounded-sm border border-stone-800 backdrop-blur-md shadow-2xl">
          
          {/* Текстовый блок и иконка */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            <div className="w-16 h-16 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-[#e6ccb2] flex-shrink-0 shadow-inner">
              <Gift size={30} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-stone-100 mb-2 font-medium tracking-tight">
                Не знаете, что выбрать в подарок?
              </h3>
              <p className="text-stone-300 text-sm md:text-base max-w-lg leading-relaxed font-light">
                Подарочный сертификат BSV Leather на любую сумму — безупречное решение. Пусть близкий человек сам подберёт цвет кожи, нитей и индивидуальную модель.
              </p>
            </div>
          </div>

          {/* Кнопка заказа */}
          <button 
            onClick={onOrderClick} 
            className="flex-shrink-0 bg-[#1a110f] text-[#e6ccb2] px-8 py-4 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-stone-900 transition-all duration-300 border border-[#e6ccb2]/40 shadow-lg flex items-center gap-3 group w-full sm:w-auto justify-center"
          >
            <span>Оформить сертификат</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform text-[#e6ccb2]" />
          </button>

        </div>
      </div>
    </section>
  );
};