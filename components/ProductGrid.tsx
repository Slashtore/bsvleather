import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../constants';
import { X, ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight, Palette, CheckCircle2, MessageSquare, Stamp } from 'lucide-react';
import { calculatePrice } from '../utils/calculatePrice';

interface ProductGridProps {
  onAddToCart: (product: Product, personalization?: string) => void;
  initialCategory?: ProductCategory;
  onBackToHome?: () => void;
  onOrderCustomization?: () => void;
  onNavigateToHelp?: (section: string) => void;
  onNavigateToMaterials?: () => void;
}

const MAX_CHAT_URL = 'https://max.ru/u/f9LHodD0cOLh-Isielh0dfxWNiLgSIHSruaBU2s_ocT6nn2s903vM4VDQ2c';

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

  // Стейты для тиснения инициалов
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [initials, setInitials] = useState('');

  // ЛОГИКА ДЛЯ SEO И URL ТОВАРОВ
  useEffect(() => {
    const checkUrlProduct = () => {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get('product');

      if (productId) {
        const foundProduct = PRODUCTS.find(p => p.id === productId);
        if (foundProduct) {
          setSelectedProduct(foundProduct);
          setActiveImageIdx(0);
          setIsPersonalized(false);
          setInitials('');
        }
      } else {
        setSelectedProduct(null);
      }
    };

    checkUrlProduct();
    window.addEventListener('popstate', checkUrlProduct);
    return () => window.removeEventListener('popstate', checkUrlProduct);
  }, []);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveImageIdx(0);
    setIsPersonalized(false);
    setInitials('');

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('product', product.id);
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    setIsPersonalized(false);
    setInitials('');

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('product');
    window.history.pushState({}, '', newUrl.toString());
  };

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const allowedCategories = [
    ProductCategory.BELTS, 
    ProductCategory.WALLETS, 
    ProductCategory.COMPACT, 
    ProductCategory.HOME, 
    ProductCategory.ACCESSORIES, 
    ProductCategory.MUSIC_ACCESSORIES
  ];

  const filteredProducts = useMemo(() => {
    const baseProducts = PRODUCTS.filter(p => allowedCategories.includes(p.category));

    if (activeCategory === ProductCategory.ALL) {
      return baseProducts;
    }
    return baseProducts.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Быстрый заказ через МАКС с учетом тиснения
  const handleQuickOrderMax = (product: Product, price: number) => {
    const personalText = isPersonalized && initials.trim() ? `\n• Тиснение инициалов: «${initials.trim()}»` : '';
    const textToCopy = `Здравствуйте! Хочу оформить быстрый заказ:\n• ${product.name} — ${price.toLocaleString('ru-RU')} ₽${personalText}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      alert('📋 Текст заказа скопирован! Нажмите «Вставить» в открывшемся чате МАКС.');
    }
    
    window.open(MAX_CHAT_URL, '_blank');
  };

  return (
    <section id="catalog" className="py-20 md:py-24 bg-stone-100/50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Заголовок раздела каталога */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-14 gap-6 relative">
          {onBackToHome && (
            <button 
              onClick={onBackToHome}
              className="self-start md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest text-xs font-bold"
            >
              <ArrowLeft size={16} />
              <span>На главную</span>
            </button>
          )}

          <div className="text-center w-full">
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-3 tracking-tight">Каталог изделий</h2>
            <div className="w-16 h-[2px] bg-[#e6ccb2] mx-auto"></div>
          </div>
        </div>
          
        {/* Фильтр категорий */}
        <div className="mb-10 md:mb-14 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center justify-start md:justify-center gap-2 md:gap-3 min-w-max px-2">
            {[ProductCategory.ALL, ProductCategory.BELTS, ProductCategory.WALLETS, ProductCategory.COMPACT, ProductCategory.HOME, ProductCategory.ACCESSORIES, ProductCategory.MUSIC_ACCESSORIES].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 border whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-[#1a110f] text-[#e6ccb2] border-[#1a110f] shadow-lg scale-105' 
                    : 'bg-white text-stone-600 border-stone-200/80 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Сетка товаров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 animate-fade-in">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={(product) => handleOpenProduct(product)}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>

        {/* Пустое состояние */}
        {filteredProducts.length === 0 && (
           <div className="text-center py-20 bg-white rounded-lg border border-stone-200/80 max-w-md mx-auto my-8 p-8 shadow-sm">
              <p className="text-xl font-serif text-stone-800">В этой категории пока пусто</p>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Но вы можете заказать индивидуальное изготовление любого изделия по вашим параметрам!
              </p>
              {onOrderCustomization && (
                <button 
                  onClick={onOrderCustomization}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#1a110f] text-[#e6ccb2] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-stone-900 transition-colors"
                >
                  <Palette size={14} />
                  Сделать индивидуальный заказ
                </button>
              )}
           </div>
        )}

        {/* Product Modal */}
        {selectedProduct && (() => {
          const productPrice = calculatePrice(selectedProduct.recipe, selectedProduct.price, selectedProduct.name);
          const pageTitle = `${selectedProduct.name} — Купить за ${productPrice.toLocaleString('ru-RU')} ₽ | BSV Leather`;
          const pageDesc = selectedProduct.description 
            ? `${selectedProduct.description} Авторские изделия из кожи растительного дубления ручной работы.` 
            : `${selectedProduct.name} из натуральной кожи растительного дубления ручной работы. Мастерская BSV Leather.`;

          const schemaData = {
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: selectedProduct.name,
            image: [selectedProduct.imageUrl, ...(selectedProduct.images || [])],
            description: pageDesc,
            brand: {
              '@type': 'Brand',
              name: 'BSV Leather',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'RUB',
              price: productPrice,
              availability: 'https://schema.org/InStock',
              url: window.location.href,
            },
          };

          return (
            <>
              <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <meta property="og:type" content="product" />
                <meta property="og:title" content={`${selectedProduct.name} — BSV Leather`} />
                <meta property="og:description" content={`Цена: ${productPrice.toLocaleString('ru-RU')} ₽. Кожа растительного дубления, ручной седельный шов.`} />
                <meta property="og:image" content={selectedProduct.imageUrl} />
                <meta property="product:price:amount" content={String(productPrice)} />
                <meta property="product:price:currency" content="RUB" />
                <script type="application/ld+json">
                  {JSON.stringify(schemaData)}
                </script>
              </Helmet>

              {/* Модальное окно */}
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-md animate-fade-in" onClick={handleCloseProduct}>
                <div className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-md shadow-2xl flex flex-col md:flex-row relative border border-stone-200" onClick={e => e.stopPropagation()}>
                  
                  {/* Кнопка закрытия */}
                  <button 
                    onClick={handleCloseProduct}
                    className="absolute top-4 right-4 p-2.5 bg-stone-900/10 hover:bg-stone-900/20 text-stone-900 rounded-full transition-colors z-20 backdrop-blur-md"
                    title="Закрыть"
                  >
                    <X size={20} />
                  </button>
                  
                  {/* ЛЕВАЯ ЧАСТЬ: ГАЛЕРЕЯ (фон изменен на bg-white) */}
                  <div className="w-full md:w-1/2 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
                    {(() => {
                      const galleryImages: string[] = [
                        selectedProduct.imageUrl,
                        ...(selectedProduct.images || [])
                      ];

                      return (
                        <>
                          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-white">
                            <img 
                              key={galleryImages[activeImageIdx]}
                              src={galleryImages[activeImageIdx]} 
                              alt={`${selectedProduct.name} — фото ${activeImageIdx + 1} из натуральной кожи`} 
                              className="w-full h-full object-cover transition-opacity duration-300"
                            />
                            
                            {galleryImages.length > 1 && (
                              <>
                                <button 
                                  onClick={() => setActiveImageIdx(i => Math.max(0, i - 1))}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-md transition-all disabled:opacity-30"
                                  disabled={activeImageIdx === 0}
                                >
                                  <ChevronLeft size={20} />
                                </button>
                                <button 
                                  onClick={() => setActiveImageIdx(i => Math.min(galleryImages.length - 1, i + 1))}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-stone-800 rounded-full shadow-md transition-all disabled:opacity-30"
                                  disabled={activeImageIdx === galleryImages.length - 1}
                                >
                                  <ChevronRight size={20} />
                                </button>
                              </>
                            )}
                          </div>

                          {galleryImages.length > 1 && (
                            <div className="flex gap-2 p-4 bg-white border-t border-stone-200/80 overflow-x-auto">
                              {galleryImages.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveImageIdx(idx)}
                                  className={`w-14 h-14 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 ${
                                    idx === activeImageIdx 
                                      ? 'border-[#1a110f] scale-105 shadow-md' 
                                      : 'border-stone-200 opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <img 
                                    src={img} 
                                    alt={`${selectedProduct.name} — миниатюра ${idx + 1}`} 
                                    className="w-full h-full object-cover" 
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  
                  {/* ПРАВАЯ ЧАСТЬ: ИНФОРМАЦИЯ */}
                  <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
                    <div>
                      {/* Категория */}
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 bg-stone-100 px-2.5 py-1 rounded-sm w-fit mb-3">
                        {selectedProduct.category}
                      </div>

                      {/* Название */}
                      <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mb-4 font-medium tracking-tight">
                        {selectedProduct.name}
                      </h3>

                      {/* Описание */}
                      <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
                        {selectedProduct.description}
                      </p>
                      
                      {/* Особенности */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">Особенности изделия:</h4>
                        <ul className="space-y-2">
                          {selectedProduct.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start text-stone-700 text-xs">
                              <CheckCircle2 size={14} className="text-[#885036] mr-2 shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* ОПЦИЯ ПЕРСОНАЛИЗАЦИИ: ТИСНЕНИЕ ИНИЦИАЛОВ */}
                      {selectedProduct.category !== ProductCategory.CARE && (
                        <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm mb-6 space-y-3">
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={isPersonalized}
                              onChange={(e) => setIsPersonalized(e.target.checked)}
                              className="w-4 h-4 mt-0.5 accent-[#885036] rounded cursor-pointer"
                            />
                            <div>
                              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                <Stamp size={14} className="text-[#885036]" />
                                Добавить бесплатное тиснение инициалов
                              </span>
                              <span className="text-[11px] text-stone-500 block mt-0.5">
                                Персонализируем изделие горячим тиснением (например: «А. В.»)
                              </span>
                            </div>
                          </label>

                          {isPersonalized && (
                            <div className="pt-2 pl-6 animate-fade-in">
                              <input 
                                type="text"
                                placeholder="Например: А. В."
                                value={initials}
                                onChange={(e) => setInitials(e.target.value)}
                                maxLength={12}
                                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-sm focus:outline-none focus:border-[#885036] text-stone-900"
                              />
                              <p className="text-[10px] text-stone-400 mt-1">
                                Латиница или кириллица, до 12 символов с точками.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Блок кастомизации под заказ */}
                      {selectedProduct.category !== ProductCategory.CARE && (
                        <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-sm mb-6 text-xs text-stone-800">
                            <p className="leading-relaxed">
                              💡 Хотите такой же, но в другом цвете кожи или нитей?
                              <button 
                                className="block mt-1 font-bold text-amber-950 underline hover:text-amber-800 transition-colors text-left" 
                                onClick={() => {
                                  handleCloseProduct();
                                  if (onOrderCustomization) onOrderCustomization();
                                }}
                              >
                                Запросить персональный выбор материалов →
                              </button>
                            </p>
                        </div>
                      )}

                      {/* Детали доставки / возврата */}
                      <details className="mb-6 border-t border-b border-stone-200/80 py-3 group">
                        <summary className="cursor-pointer text-xs font-bold text-stone-800 hover:text-stone-950 list-none flex justify-between items-center select-none">
                          Доставка, гарантия и возврат
                          <span className="transition-transform group-open:rotate-180 text-stone-400">▼</span>
                        </summary>
                        <div className="mt-3 text-xs text-stone-600 space-y-2 leading-relaxed">
                          <p>• Ручная сборка и отправка мастерской в течение 5–7 рабочих дней.</p>
                          <p>• Бесплатное тиснение инициалов по вашему желанию.</p>
                          <p>• Пожизненная гарантия на целостность седельного шва.</p>
                          
                          <div className="pt-3 mt-3 border-t border-stone-100 flex flex-wrap gap-x-4 gap-y-2">
                            <button onClick={() => { handleCloseProduct(); onNavigateToHelp?.('PAYMENT'); }} className="text-[11px] font-bold text-stone-700 underline hover:text-stone-950 text-left">
                              Оплата и доставка →
                            </button>
                            <button onClick={() => { handleCloseProduct(); onNavigateToHelp?.('RETURNS'); }} className="text-[11px] font-bold text-stone-700 underline hover:text-stone-950 text-left">
                              Условия возврата →
                            </button>
                            <button onClick={() => { handleCloseProduct(); onNavigateToMaterials?.(); }} className="text-[11px] font-bold text-stone-700 underline hover:text-stone-950 text-left">
                              Каталог кожи →
                            </button>
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* Подвал модалки: Цена и Кнопки заказа */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200 mt-2">
                      <div className="w-full sm:w-auto text-left">
                        <span className="text-2xl md:text-3xl font-serif text-stone-950 font-bold tracking-tight whitespace-nowrap">
                          {productPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                        {/* Кнопка быстрого заказа через МАКС */}
                        <button
                          onClick={() => handleQuickOrderMax(selectedProduct, productPrice)}
                          className="border border-stone-300 hover:border-stone-800 text-stone-800 hover:bg-stone-50 transition-all px-3.5 py-3 rounded-sm uppercase tracking-wider text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                          title="Быстрый заказ через мессенджер МАКС"
                        >
                          <MessageSquare size={16} className="text-[#885036]" />
                          <span>В МАКС</span>
                        </button>

                        {/* Кнопка добавления в корзину */}
                        <button 
                          onClick={() => {
                            const personalizationText = isPersonalized && initials.trim() ? `Тиснение: ${initials.trim()}` : undefined;
                            onAddToCart(selectedProduct, personalizationText);
                            handleCloseProduct();
                          }}
                          className="flex-1 sm:flex-none bg-[#1a110f] text-[#e6ccb2] hover:bg-stone-900 transition-colors px-5 md:px-7 py-3 rounded-sm uppercase tracking-wider text-xs font-bold flex items-center justify-center gap-2 shadow-md border border-stone-800 whitespace-nowrap"
                        >
                          <ShoppingBag size={16} />
                          <span>В корзину</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </>
          );
        })()}
      </div>
    </section>
  );
};