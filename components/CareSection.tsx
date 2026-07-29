import React from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../constants';
import { Plus, Sparkles, ShieldCheck } from 'lucide-react';

interface CareSectionProps {
  onAddToCart: (product: Product) => void;
}

export const CareSection: React.FC<CareSectionProps> = ({ onAddToCart }) => {
  const careProducts = PRODUCTS.filter(p => p.category === ProductCategory.CARE);

  return (
    <section className="py-20 bg-stone-100/60 border-t border-stone-200/80">
      <div className="container mx-auto px-6">
        
        {/* Заголовок раздела */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6">
          <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stone-200/80 rounded-full text-[#885036] text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
                <Sparkles size={12} />
                <span>Забота и Уход</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3 tracking-tight">
               Уход за изделиями из кожи
             </h2>
             <p className="text-stone-600 leading-relaxed text-sm md:text-base font-light">
               Кожа растительного дубления — живой материал. Чтобы она служила десятилетиями и красиво старела, ей нужно немного внимания. Эти средства я использую в своей мастерской и рекомендую для регулярной защиты.
             </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 bg-white p-4 rounded-sm border border-stone-200/80 shadow-sm self-center">
            <ShieldCheck size={28} className="text-[#885036] shrink-0" />
            <span className="text-xs text-stone-600 max-w-[200px] leading-tight font-medium">
              100% натуральные составы на основе воска и масел
            </span>
          </div>
        </div>

        {/* Сетка карточек средств ухода */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {careProducts.map(product => {
            const priceValue = product.price ?? 0;

            return (
              <div 
                key={product.id} 
                className="bg-white p-5 rounded-sm shadow-sm border border-stone-200/80 flex flex-col sm:flex-row gap-5 hover:shadow-xl hover:border-stone-300 transition-all duration-300 group"
              >
                {/* Фотография баночки/средства */}
                <div className="w-28 h-28 sm:w-24 sm:h-24 flex-shrink-0 bg-stone-100 rounded-sm overflow-hidden mx-auto sm:mx-0 border border-stone-200">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Информация и покупка */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-lg text-stone-900 font-medium leading-tight mb-1.5 group-hover:text-[#885036] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed mb-3 line-clamp-2 font-light">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-stone-100">
                    <span className="font-bold text-stone-950 text-base">
                      {priceValue.toLocaleString('ru-RU')} ₽
                    </span>
                    
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider hover:bg-[#885036] hover:text-white transition-all shadow-sm"
                      title="Добавить в корзину"
                    >
                      <span>В корзину</span>
                      <Plus size={14} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};