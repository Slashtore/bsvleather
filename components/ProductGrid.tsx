import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../constants';
import { X, ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { calculatePrice } from '../utils/calculatePrice'; // <-- Добавлено

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  initialCategory?: ProductCategory;
  onBackToHome?: () => void;
  onOrderCustomization?: () => void;
  onNavigateToHelp?: (section: string) => void;
  onNavigateToMaterials?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  onAddToCart, 
  initialCategory = ProductCategory.ALL,
  onBackToHome,
  onOrderCustomization,
  onNavigateToHelp,
  onNavigateToMaterials
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  // Временно разрешённые категории
  const allowedCategories = [ProductCategory.BELTS, ProductCategory.WALLETS, ProductCategory.COMPACT, ProductCategory.HOME, ProductCategory.ACCESSORIES, ProductCategory.MUSIC_ACCESSORIES];

  const filteredProducts = useMemo(() => {
    // 1. Сначала берём только товары из «белого списка»
    const baseProducts = PRODUCTS.filter(p => allowedCategories.includes(p.category));

    // 2. Если выбрано «Все» — показываем этот отфильтрованный список
    if (activeCategory === ProductCategory.ALL) {
      return baseProducts;
    }
    // 3. Если выбрана конкретная категория — фильтруем внутри него
    return baseProducts.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
  };

  return (
    <section id="catalog" className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header of the Catalog Page */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 relative">
          {onBackToHome && (
            <button 
              onClick={onBackToHome}
              className="absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-leather-500 hover:text-leather-900 transition-colors uppercase tracking-widest text-xs font-bold"
            >
              <ArrowLeft size={16} />
              <span className="hidden md:inline">На главную</span>
            </button>
          )}

          <div className="text-center w-full">
            <h2 className="text-4xl md:text-5xl font-serif text-leather-900 mb-4">Каталог</h2>
            <div className="w-24 h-1 bg-leather-300 mx-auto"></div>
          </div>
        </div>
          
        {/* Categories - Wrapped on mobile, centered on desktop */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {[ProductCategory.ALL, ProductCategory.BELTS, ProductCategory.WALLETS, ProductCategory.COMPACT, ProductCategory.HOME, ProductCategory.ACCESSORIES, ProductCategory.MUSIC_ACCESSORIES].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm uppercase tracking-wider transition-all duration-300 border whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-leather-800 text-white border-leather-800 shadow-md' 
                    : 'bg-white text-leather-600 border-leather-200 hover:border-leather-400 hover:bg-leather-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 animate-fade-in">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={(product) => {
                setSelectedProduct(product);
                setActiveImageIdx(0);
              }}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
           <div className="text-center py-20 text-leather-400">
              <p className="text-xl font-serif">В этой категории пока пусто.</p>
              <p className="text-sm mt-2">Но мы можем изготовить это для вас на заказ!</p>
           </div>
        )}

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProduct(null)}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl flex flex-col md:flex-row relative" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-leather-100 transition-colors z-10 text-leather-900"
              >
                <X size={24} />
              </button>
              
              {/* === ЛЕВАЯ ЧАСТЬ: ГАЛЕРЕЯ === */}
              <div className="w-full md:w-1/2 bg-white flex flex-col">
                {(() => {
                  // Главное фото + доп. (если есть). Дублировать в constants не нужно.
                  const galleryImages: string[] = [
                    selectedProduct.imageUrl,
                    ...(selectedProduct.images || [])
                  ];

                  return (
                    <>
                      <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
                        <img 
                          key={galleryImages[activeImageIdx]}
                          src={galleryImages[activeImageIdx]} 
                          alt={selectedProduct.name} 
                          className="w-full h-full object-cover transition-opacity duration-300"
                        />
                        
                        {galleryImages.length > 1 && (
                          <>
                            <button 
                              onClick={() => setActiveImageIdx(i => Math.max(0, i - 1))}
                              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white shadow-sm transition-all disabled:opacity-30"
                              disabled={activeImageIdx === 0}
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button 
                              onClick={() => setActiveImageIdx(i => Math.min(galleryImages.length - 1, i + 1))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white shadow-sm transition-all disabled:opacity-30"
                              disabled={activeImageIdx === galleryImages.length - 1}
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                      </div>

                      {galleryImages.length > 1 && (
                        <div className="flex gap-2 p-4 bg-white">
                          {galleryImages.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImageIdx(idx)}
                              className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 ${
                                idx === activeImageIdx 
                                  ? 'border-leather-900 scale-105 shadow-md' 
                                  : 'border-leather-200 opacity-60 hover:opacity-100 hover:border-leather-400'
                              }`}
                            >
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
              
              {/* === ПРАВАЯ ЧАСТЬ: ИНФО === */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="text-sm text-leather-600 font-bold uppercase tracking-widest mb-2">
                  {selectedProduct.category}
                </div>
                <h3 className="text-3xl md:text-4xl font-serif text-leather-900 mb-6">
                  {selectedProduct.name}
                </h3>
                <p className="text-leather-800 leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase text-leather-900 mb-3">Особенности:</h4>
                  <ul className="space-y-2">
                    {selectedProduct.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-leather-700 text-sm">
                        <span className="w-1.5 h-1.5 bg-leather-400 rounded-full mr-3"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {selectedProduct.category !== ProductCategory.CARE && (
                  <div className="p-4 bg-leather-50 border border-leather-200 mb-8 rounded-sm">
                     <p className="text-xs text-leather-500 italic">
                        💡 Понравилась модель, но хотите другой цвет? 
                        <button 
                          className="underline text-leather-800 ml-1 font-bold hover:text-leather-600 transition-colors" 
                          onClick={() => {
                             setSelectedProduct(null);
                             if (onOrderCustomization) onOrderCustomization();
                          }}
                        >
                          Закажите индивидуальный 3D макет
                        </button>
                     </p>
                  </div>
                )}

                {/* 🔹 УСЛОВИЯ ЗАКАЗА (с рабочими переходами) */}
                <details className="mb-6 border-t border-b border-leather-100 py-4 group">
                  <summary className="cursor-pointer text-sm font-bold text-leather-800 hover:text-leather-600 list-none flex justify-between items-center select-none">
                    Условия заказа и доставки
                    <span className="transition-transform group-open:rotate-180 text-leather-400">▼</span>
                  </summary>
                  <div className="mt-3 text-sm text-leather-600 space-y-2">
                    <p>• Изготовление вручную, отправка в течение 7 рабочих дней.</p>
                    <p>• Бесплатная кастомизация: выбор цвета кожи/нити, гравировка инициалов.</p>
                    <p>• Индивидуальные заказы могут занять чуть больше времени, так как изготавливаются с нуля, а не снимаются с полки.</p>
                    
                    <div className="pt-3 mt-3 border-t border-leather-100 flex flex-wrap gap-x-5 gap-y-2">
                      <button onClick={() => { setSelectedProduct(null); onNavigateToHelp?.('PAYMENT'); }} className="text-xs font-bold text-leather-700 underline hover:text-leather-900 text-left">
                        Подробнее про оплату и доставку →
                      </button>
                      <button onClick={() => { setSelectedProduct(null); onNavigateToHelp?.('RETURNS'); }} className="text-xs font-bold text-leather-700 underline hover:text-leather-900 text-left">
                        Подробнее про возврат →
                      </button>
                      <button onClick={() => { setSelectedProduct(null); onNavigateToMaterials?.(); }} className="text-xs font-bold text-leather-700 underline hover:text-leather-900 text-left">
                        Подробнее про материалы →
                      </button>
                    </div>
                  </div>
                </details>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-leather-200">
                  <span className="text-3xl font-serif text-leather-900">
                    {calculatePrice(selectedProduct.recipe, selectedProduct.price, selectedProduct.name).toLocaleString('ru-RU')} ₽
                  </span>
                  <button 
                     onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                     }}
                     className="bg-leather-800 text-white px-8 py-3 uppercase tracking-wider text-xs font-bold hover:bg-leather-700 transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    <span>В корзину</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};