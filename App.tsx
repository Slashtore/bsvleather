import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CategoryPreview } from './components/CategoryPreview';
import { Materials } from './components/Materials';
import { MaterialsCatalog } from './components/MaterialsCatalog';
import { CareSection } from './components/CareSection';
import { HelpCenter } from './components/HelpCenter';
import { Customization } from './components/Customization';
import { About } from './components/About';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { GiftBanner } from './components/GiftBanner';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Product, CartItem, ProductCategory } from './types';
import { calculatePrice } from './utils/calculatePrice';
import { CalculatorTool } from './components/CalculatorTool';

type ViewState = 'home' | 'catalog' | 'materials-catalog' | 'help' | 'calc';

// ← ИЗМЕНЕНО: Ключ для localStorage
const CART_STORAGE_KEY = 'bsv_leather_cart';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [initialCategory, setInitialCategory] = useState<ProductCategory>(ProductCategory.ALL);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // ← ИЗМЕНЕНО: Инициализация корзины из localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  });
  
  // ← ИЗМЕНЕНО: Автосохранение корзины при каждом изменении
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // 🔥 ПРОВЕРКА: сначала смотрим, не редирект ли с 404, потом — прямой адрес
  useEffect(() => {
    const restorePath = sessionStorage.getItem('restorePath');
    
    if (restorePath === '/calc') {
      setCurrentView('calc');
      sessionStorage.removeItem('restorePath'); // чистим, чтобы не сбивать потом
    } 
    // Фолбэк для локальной разработки (когда 404.html не используется)
    else if (window.location.pathname === '/calc') {
      setCurrentView('calc');
    }
  }, []);

  // State to pass data to the Contact Form
  const [contactPrefill, setContactPrefill] = useState<{type: string, message: string} | null>(null);

  const [helpSection, setHelpSection] = useState<string>('GENERAL');

  const goToHelpSection = (section: string) => {
    setHelpSection(section);
    setCurrentView('help');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product) => {
    // 🔥 Страховка: если product.price — undefined, но есть recipe, считаем.
    // Если нет recipe, но есть price — берём price.
    const rawPrice = product.price;
    const hasRecipe = !!product.recipe && !!(product.recipe as any).leather;
    
    let finalPrice: number;
    if (hasRecipe) {
      finalPrice = calculatePrice(product.recipe, rawPrice, product.name);
    } else {
      // Для ухода: берём price, если он есть и это число
      finalPrice = typeof rawPrice === 'number' && !isNaN(rawPrice) ? rawPrice : 0;
    }

    // 🔥 Финальная страховка: цена не может быть NaN
    if (isNaN(finalPrice) || finalPrice < 0) {
      console.error('⚠️ Invalid price calculated for', product.name, { rawPrice, recipe: product.recipe });
      finalPrice = 0;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        ...product, 
        price: finalPrice,
        quantity: 1 
      }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Simple Router Logic
  const navigateTo = (view: ViewState, sectionId?: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
    
    // If navigating to a section on home page
    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleCategorySelect = (category: ProductCategory) => {
    setInitialCategory(category);
    setCurrentView('catalog');
    window.scrollTo(0, 0);
  };

  // Helper to scroll to contact and prefill
  const handleContactAction = (type: string, message: string = '') => {
    setContactPrefill({ type, message });
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-leather-50">
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={(view, sectionId) => {
            if (view === 'home' || view === 'catalog') {
                navigateTo(view, sectionId);
            }
        }}
        currentView={currentView === 'materials-catalog' || currentView === 'help' ? 'catalog' : currentView} 
      />
      
      <main>
        {/* 🔥 КАЛЬКУЛЯТОР — ОТДЕЛЬНЫЙ ЭКРАН */}
        {currentView === 'calc' && (
          <CalculatorTool />
        )}
        
        {currentView === 'home' && (
          <>
            <Hero onNavigate={() => navigateTo('catalog')} />
            <CategoryPreview onSelectCategory={handleCategorySelect} />
            <Materials 
              onOpenCatalog={() => navigateTo('materials-catalog')} 
            />
            
            <CareSection onAddToCart={handleAddToCart} />
            
            <Customization 
              onOrderClick={() => handleContactAction('Заказ 3D макета (Визуализация)', 'Здравствуйте! Хочу заказать 3D макет изделия.')} 
            />
            
            <GiftBanner 
              onOrderClick={() => handleContactAction('Подарочный сертификат', 'Здравствуйте! Хочу приобрести подарочный сертификат. На сумму: ')} 
            />
            
            <About />
            <Process />
            
            <Testimonials 
              onBecomeClient={() => handleContactAction('Индивидуальный заказ', 'Здравствуйте! Хочу обсудить индивидуальный заказ.')}
            />
            
            <FAQ onOpenHelp={() => navigateTo('help')} />
            
            <Contact prefill={contactPrefill} />
          </>
        )}

        {currentView === 'catalog' && (
          <ProductGrid 
            onAddToCart={handleAddToCart} 
            initialCategory={initialCategory}
            onBackToHome={() => navigateTo('home')}
            onOrderCustomization={() => {
              setCurrentView('home');
              setTimeout(() => {
                handleContactAction('Заказ 3D макета (Визуализация)', 'Здравствуйте! Понравилась модель из каталога, но хочу обсудить индивидуальное исполнение.');
              }, 100);
            }}
            onNavigateToHelp={(section) => goToHelpSection(section)}
            onNavigateToMaterials={() => navigateTo('materials-catalog')}
          />
        )}

        {currentView === 'materials-catalog' && (
          <MaterialsCatalog onBackToHome={() => navigateTo('home')} />
        )}

        {currentView === 'help' && (
          <HelpCenter 
            onBackToHome={() => navigateTo('home')} 
            initialCategory={helpSection as any} 
          />
        )}
      </main>
      
      <Footer />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckoutSuccess={() => setCartItems([])}
      />
    </div>
  );
}

export default App;