import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // ← ИМПОРТИРУЕМ HELMET

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

const CART_STORAGE_KEY = 'bsv_leather_cart';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [initialCategory, setInitialCategory] = useState<ProductCategory>(ProductCategory.ALL);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    const restorePath = sessionStorage.getItem('restorePath');
    const params = new URLSearchParams(window.location.search);
    
    // Если перешли по прямой ссылке на товар — сразу включаем каталог
    if (params.get('product')) {
      setCurrentView('catalog');
    } else if (restorePath === '/calc') {
      setCurrentView('calc');
      sessionStorage.removeItem('restorePath');
    } else if (window.location.pathname === '/calc') {
      setCurrentView('calc');
    }
  }, []);

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash === 'catalog') {
        if (currentView !== 'catalog') {
          setCurrentView('catalog');
        }
        setTimeout(() => {
          const el = document.getElementById('catalog');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [currentView]);

  const [contactPrefill, setContactPrefill] = useState<{type: string, message: string} | null>(null);
  const [helpSection, setHelpSection] = useState<string>('GENERAL');

  const goToHelpSection = (section: string) => {
    setHelpSection(section);
    setCurrentView('help');
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product: Product) => {
    const rawPrice = product.price;
    const hasRecipe = !!product.recipe && !!(product.recipe as any).leather;
    
    let finalPrice: number;
    if (hasRecipe) {
      finalPrice = calculatePrice(product.recipe, rawPrice, product.name);
    } else {
      finalPrice = typeof rawPrice === 'number' && !isNaN(rawPrice) ? rawPrice : 0;
    }

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

  const navigateTo = (view: ViewState, sectionId?: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0);

    if (view === 'home') {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
    
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

  const handleContactAction = (type: string, message: string = '') => {
    setContactPrefill({ type, message });
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 🔥 ДИНАМИЧЕСКИЕ ДАННЫЕ SEO В ЗАВИСИМОСТИ ОТ ТЕКУЩЕГО ЭКРАНА
  const getSeoData = () => {
    switch (currentView) {
      case 'catalog':
        return {
          title: 'Каталог изделий из кожи ручной работы — BSV Leather Воронеж',
          description: 'Авторские ремни, кошельки, картхолдеры и аксессуары из натуральной кожи растительного табления. Изготовление на заказ в Воронеже.',
          url: 'https://bsvleather.ru/#catalog',
        };
      case 'materials-catalog':
        return {
          title: 'Каталог кожи и материалов — BSV Leather',
          description: 'Натуральная кожа растительного и хромового табления, итальская фурнитура и прочные нити, которые мы используем в производстве.',
          url: 'https://bsvleather.ru/',
        };
      case 'calc':
        return {
          title: 'Калькулятор стоимости кожаных изделий — BSV Leather',
          description: 'Рассчитайте примерную стоимость кастомного изделия из кожи ручной работы онлайн.',
          url: 'https://bsvleather.ru/calc',
        };
      case 'help':
        return {
          title: 'Центр помощи и частые вопросы — BSV Leather',
          description: 'Ответы на вопросы по уходу за кожей, оплате, доставке и гарантии на ручные изделия BSV Leather.',
          url: 'https://bsvleather.ru/',
        };
      case 'home':
      default:
        return {
          title: 'BSV Leather | Кожаная мастерская Воронеж | Ремни, Кошельки и Подарки на заказ',
          description: 'Изделия из натуральной кожи ручной работы в Воронеже. Авторские ремни, кошельки, картхолдеры, 3D-моделирование и кастомизация.',
          url: 'https://bsvleather.ru/',
        };
    }
  };

  const seo = getSeoData();

  return (
    <div className="min-h-screen bg-leather-50">
      {/* 🔥 ДИНАМИЧЕСКИЕ ТЕГИ ДЛЯ СТРАНИЦЫ */}
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.url} />

        {/* Open Graph (Facebook, Telegram, VK, WhatsApp) */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BSV Leather" />
        <meta property="og:image" content="https://bsvleather.ru/og-image.jpg" />
      </Helmet>

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

// 🔥 КОРНЕВОЙ ЭКСПОРТ С HELMET PROVIDER
export default function App() {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
}