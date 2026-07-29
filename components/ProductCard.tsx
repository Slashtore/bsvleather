import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Plus, ShoppingBag } from 'lucide-react';
import { calculatePrice } from '../utils/calculatePrice';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
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
    onAddToCart(product);
  };

  return (
    <div className="group bg-white flex flex-col h-full rounded-sm shadow-lg overflow-hidden transition-all duration-300 transform [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:shadow-2xl">
      
      {/* ИЗОБРАЖЕНИЕ И ОВЕРЛЕЙ */}
      <div 
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden aspect-[4/5] bg-stone-100 cursor-pointer select-none"
      >
        <img 
          src={product.imageUrl} 
          alt={`${product.name} из натуральной кожи ручной работы — BSV Leather`} 
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isOverlayVisible 
              ? 'scale-105' 
              : 'scale-100 [@media(hover:hover)]:group-hover:scale-105'
          }`}
          loading="lazy"
        />

        {/* Глубокий премиальный оверлей */}
        <div 
          className={`absolute inset-0 transition-all duration-300 flex flex-col gap-3 items-center justify-center p-4 ${
            isOverlayVisible 
              ? 'bg-black/60 opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:bg-black/60 [@media(hover:hover)]:group-hover:pointer-events-auto'
          }`}
        >
          {/* Кнопка "Подробнее" (без стрелки и переносов) */}
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
            className="inline-flex items-center justify-center px-6 py-3 min-w-[150px] uppercase tracking-widest text-[10px] md:text-xs font-bold text-white transition-all duration-300 rounded-sm border border-white/60 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-sm whitespace-nowrap text-center"
          >
            Подробнее
          </a>
          
          {/* Кнопка "В корзину" */}
          <button 
            onClick={handleAddToCart}
            onTouchEnd={handleAddToCart}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-w-[150px] uppercase tracking-widest text-[10px] md:text-xs font-bold transition-all duration-300 rounded-sm bg-[#1a110f] text-[#e6ccb2] hover:bg-stone-900 shadow-xl border border-stone-800 whitespace-nowrap text-center"
          >
            <ShoppingBag size={14} />
            В корзину
          </button>
        </div>
      </div>
      
      {/* ТЕКСТОВАЯ ЧАСТЬ */}
      <div className="p-6 flex flex-col flex-grow bg-white border-t border-stone-100">
        
        {/* Категория */}
        <div className="flex justify-between items-start mb-3">
            <div className="text-[9px] text-stone-500 font-medium uppercase tracking-[0.2em] bg-stone-100 px-2 py-0.5 rounded-sm">
              {product.category}
            </div>
            {product.category === 'Эксклюзив и Арт' && (
              <span className="w-2 h-2 rounded-full bg-amber-500" title="Эксклюзивное изделие"></span>
            )}
        </div>

        {/* Название */}
        <h3 className="font-serif text-2xl text-leather-950 mb-3 font-medium tracking-tight">{product.name}</h3>
        
        {/* Цена и кнопка "Плюс" */}
        <div className="flex justify-between items-center mt-auto pt-5 border-t border-stone-100">
          <span className="font-bold text-leather-950 text-xl tracking-tight">
            {displayPrice.toLocaleString('ru-RU')} ₽
          </span>
          <button 
            onClick={handleAddToCart}
            className="group/plus text-stone-400 hover:text-leather-950 transition-colors p-2.5 bg-stone-100 hover:bg-[#e6ccb2]/20 rounded-full"
            title="Добавить в корзину"
          >
            <Plus size={24} strokeWidth={1} className="transition-transform duration-300 group-hover/plus:rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};