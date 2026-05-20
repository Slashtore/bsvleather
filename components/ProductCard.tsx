import React from 'react';
import { Product } from '../types';
import { Plus, ShoppingBag } from 'lucide-react';
import { calculatePrice } from '../utils/calculatePrice';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: () => void; // ← Оставляем как было
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onAddToCart }) => {
  // Считаем цену для отображения (для ухода возьмёт product.price)
  const displayPrice = calculatePrice(product.recipe, product.price, product.name);

  return (
    <div className="group bg-white flex flex-col h-full border border-leather-200 transition-all duration-300 hover:border-leather-400">
      <div className="relative overflow-hidden aspect-[4/5] bg-leather-50">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex flex-col gap-3 items-center justify-center opacity-0 group-hover:opacity-100">
          <button 
            onClick={() => onSelect(product)}
            className="bg-white text-leather-900 px-6 py-3 min-w-[140px] uppercase tracking-widest text-xs font-bold hover:bg-leather-900 hover:text-white transition-colors border border-white shadow-xl"
          >
            Подробнее
          </button>
          {/* 🔥 ГЛАВНОЕ: передаём product ВНУТРИ стрелочной функции */}
          <button 
            onClick={(e) => {
                e.stopPropagation();
                // Вызываем onAddToCart, но передаём product как аргумент
                (onAddToCart as (p: Product) => void)(product);
            }}
            className="bg-leather-900 text-white px-6 py-3 min-w-[140px] uppercase tracking-widest text-xs font-bold hover:bg-leather-800 transition-colors flex items-center justify-center gap-2 shadow-xl"
          >
            <ShoppingBag size={14} />
            В корзину
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
           <div className="text-[10px] text-leather-500 font-bold uppercase tracking-widest border border-leather-200 px-2 py-0.5 inline-block">
             {product.category}
           </div>
           {product.category === 'Эксклюзив и Арт' && (
              <span className="w-2 h-2 rounded-full bg-leather-900"></span>
           )}
        </div>

        <h3 className="font-serif text-xl text-leather-900 mb-2 font-medium">{product.name}</h3>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-leather-200">
          <span className="font-bold text-leather-900 text-lg">
            {displayPrice.toLocaleString('ru-RU')} ₽
          </span>
          <button 
            onClick={(e) => {
                e.stopPropagation();
                (onAddToCart as (p: Product) => void)(product);
            }}
            className="text-leather-400 hover:text-leather-900 transition-colors p-2 hover:bg-leather-100 rounded-full"
            title="Добавить в корзину"
          >
            <Plus size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};