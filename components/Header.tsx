import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (view: 'home' | 'catalog' | 'calc', sectionId?: string) => void;
  currentView: 'home' | 'catalog' | 'calc';
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Если не на главной или проскроллили — включаем подложку
  const isSolid = currentView !== 'home' || scrolled;

  const handleNavClick = (view: 'home' | 'catalog', sectionId?: string) => {
    onNavigate(view, sectionId);
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isSolid ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Логотип */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className={`transition-colors duration-300 ${isSolid ? 'text-stone-900' : 'text-white'}`}>
             <Logo variant="header" color={isSolid ? 'black' : 'white'} className="w-40 h-10" />
          </div>
        </button>

        {/* Навигация для ПК (Новый журнальный стиль) */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('catalog')} 
            className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
              isSolid ? 'text-stone-800 hover:text-[#885036]' : 'text-stone-200 hover:text-[#e6ccb2]'
            }`}
          >
            Каталог
          </button>
          
          <button 
            onClick={() => handleNavClick('home', 'materials')} 
            className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
              isSolid ? 'text-stone-800 hover:text-[#885036]' : 'text-stone-200 hover:text-[#e6ccb2]'
            }`}
          >
            Материалы
          </button>

          <button 
            onClick={() => handleNavClick('home', 'about')} 
            className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
              isSolid ? 'text-stone-800 hover:text-[#885036]' : 'text-stone-200 hover:text-[#e6ccb2]'
            }`}
          >
            О мастере
          </button>

          <button 
            onClick={() => handleNavClick('home', 'process')} 
            className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
              isSolid ? 'text-stone-800 hover:text-[#885036]' : 'text-stone-200 hover:text-[#e6ccb2]'
            }`}
          >
            Процесс
          </button>

          <button 
            onClick={() => handleNavClick('home', 'contact')} 
            className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors ${
              isSolid ? 'text-stone-800 hover:text-[#885036]' : 'text-stone-200 hover:text-[#e6ccb2]'
            }`}
          >
            Контакты
          </button>

          {/* Корзина */}
          <button 
            onClick={onOpenCart}
            className={`p-2 rounded-full transition-colors relative ${
              isSolid ? 'bg-stone-100 text-stone-800 hover:bg-stone-200' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
             <ShoppingBag size={18} />
             {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#885036] text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">
                 {cartCount}
               </span>
             )}
          </button>
        </nav>

        {/* Кнопки мобильного меню */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onOpenCart}
            className={`p-2 rounded-full transition-colors relative ${
              isSolid ? 'bg-stone-100 text-stone-800' : 'bg-white/20 text-white'
            }`}
          >
             <ShoppingBag size={20} />
             {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#885036] text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                 {cartCount}
               </span>
             )}
          </button>

          <button 
            className="text-stone-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
               <X className={isSolid ? 'text-stone-900' : 'text-white'} size={28} />
            ) : (
               <Menu className={isSolid ? 'text-stone-900' : 'text-white'} size={28} />
            )}
          </button>
        </div>

        {/* Исходная плавная вертикальная анимация мобильного меню */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center py-8 space-y-6 animate-fade-in-down border-t border-stone-200">
            <button 
              onClick={() => handleNavClick('catalog')} 
              className="text-stone-900 text-lg font-serif font-medium hover:text-[#885036] transition-colors"
            >
              Каталог
            </button>
            <button 
              onClick={() => handleNavClick('home', 'materials')} 
              className="text-stone-900 text-lg font-serif font-medium hover:text-[#885036] transition-colors"
            >
              Материалы
            </button>
            <button 
              onClick={() => handleNavClick('home', 'about')} 
              className="text-stone-900 text-lg font-serif font-medium hover:text-[#885036] transition-colors"
            >
              О мастере
            </button>
            <button 
              onClick={() => handleNavClick('home', 'process')} 
              className="text-stone-900 text-lg font-serif font-medium hover:text-[#885036] transition-colors"
            >
              Процесс
            </button>
            <button 
              onClick={() => handleNavClick('home', 'contact')} 
              className="text-stone-900 text-lg font-serif font-medium hover:text-[#885036] transition-colors"
            >
              Контакты
            </button>
          </div>
        )}

      </div>
    </header>
  );
};