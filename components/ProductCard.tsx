import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Plus, ShoppingBag } from 'lucide-react';
import { calculatePrice } from '../utils/calculatePrice';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onAddToCart }) => {
  const displayPrice = calculatePrice(product.recipe, product.price, product.name);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerMobileOverlay = () => {
    setIsOverlayVisible(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsOverlayVisible(false);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isOverlayVisible) {
      e.preventDefault(); 
      triggerMobileOverlay();
    }
  };

  const handleSelectProduct = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsOverlayVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    onSelect(product);
  };

  const handleAddToCart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsOverlayVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    (onAddToCart as (p: Product) => void)(product);
  };

  return (
    <div className="group bg-white flex flex-col h-full border border-leather-200 transition-all duration-300 hover:border-leather-400">
      <div 
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden aspect-[4/5] bg-leather-50 cursor-pointer select-none"
      >
        {/* 
            🔥 АНИМАЦИЯ КАРТИНКИ:
            Если isOverlayVisible === true (на мобилке) -> добавляется scale-105.
            На ПК сохраняется [@media(hover:hover)]:group-hover:scale-105.
        */}
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isOverlayVisible 
              ? 'scale-105' 
              : 'scale-100 [@media(hover:hover)]:group-hover:scale-105'
          }`}
          loading="lazy"
        />

        <div 
          className={`absolute inset-0 transition-all duration-300 flex flex-col gap-3 items-center justify-center ${
            isOverlayVisible 
              ? 'bg-black/20 opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:bg-black/20 [@media(hover:hover)]:group-hover:pointer-events-auto'
          }`}
        >
          <a 
            href={`/?product=${product.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleSelectProduct(e);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleSelectProduct(e);
            }}
            className="bg-white text-leather-900 px-6 py-3 min-w-[140px] uppercase tracking-widest text-xs font-bold hover:bg-leather-900 hover:text-white transition-colors border border-white shadow-xl flex items-center justify-center text-center"
          >
            Подробнее
          </a>
          
          <button 
            onClick={handleAddToCart}
            onTouchEnd={handleAddToCart}
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
            onClick={handleAddToCart}
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