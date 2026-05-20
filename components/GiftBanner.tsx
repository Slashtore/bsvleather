import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';

interface GiftBannerProps {
  onOrderClick: () => void;
}

export const GiftBanner: React.FC<GiftBannerProps> = ({ onOrderClick }) => {
  return (
    <section className="py-16 bg-leather-900 text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-leather-500/10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 bg-white/5 p-8 md:p-12 rounded-sm border border-white/10 backdrop-blur-sm">
                
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-leather-100 flex items-center justify-center text-leather-900 flex-shrink-0">
                        <Gift size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-serif mb-2">Не знаете, что выбрать?</h3>
                        <p className="text-leather-200 text-sm md:text-base max-w-lg">
                            Подарочный сертификат на любую сумму — идеальное решение. Пусть близкий человек сам выберет цвет кожи, нитки и модель.
                        </p>
                    </div>
                </div>

                <button 
                    onClick={onOrderClick} 
                    className="flex-shrink-0 bg-white text-leather-900 px-8 py-4 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-leather-100 transition-colors flex items-center gap-3 group"
                >
                    <span>Купить сертификат</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </button>

            </div>
        </div>
    </section>
  );
};