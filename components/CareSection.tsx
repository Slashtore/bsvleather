import React from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../constants';
import { Plus, Sparkles } from 'lucide-react';

interface CareSectionProps {
  onAddToCart: (product: Product) => void;
}

export const CareSection: React.FC<CareSectionProps> = ({ onAddToCart }) => {
  const careProducts = PRODUCTS.filter(p => p.category === ProductCategory.CARE);

  return (
    <section className="py-20 bg-leather-50 border-t border-leather-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-leather-100 rounded-full text-leather-800 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Sparkles size={12} />
                <span>Сервис</span>
             </div>
             <h2 className="text-3xl md:text-4xl font-serif text-leather-900 mb-4">
               Уход за изделиями
             </h2>
             <p className="text-leather-600 leading-relaxed">
               Кожа — живой материал. Чтобы она служила десятилетиями и красиво старела, ей нужно немного внимания. 
               Эти средства я использую в работе сам и рекомендую каждому клиенту.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careProducts.map(product => (
                <div key={product.id} className="bg-white p-6 rounded-sm shadow-sm border border-leather-200 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all duration-300">
                    <div className="w-36 aspect-square md:w-24 md:h-24 md:aspect-auto flex-shrink-0 bg-leather-100 rounded-sm overflow-hidden mx-auto md:mx-0">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                        <div>
                            <h3 className="font-serif text-lg text-leather-900 font-bold leading-tight mb-2">{product.name}</h3>
                            <p className="text-sm text-leather-600 mb-3">{product.description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="font-bold text-leather-900">{product.price} ₽</span>
                            <button 
                                onClick={() => onAddToCart(product)}
                                className="w-8 h-8 rounded-full bg-leather-100 text-leather-800 flex items-center justify-center hover:bg-leather-800 hover:text-white transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};