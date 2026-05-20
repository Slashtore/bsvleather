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

  // Force solid background if not on home (because Catalog page is white)
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
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 group"
        >
          <div className={`transition-colors duration-300 ${isSolid ? 'text-leather-900' : 'text-white'}`}>
             <Logo variant="header" color={isSolid ? 'black' : 'white'} className="w-40 h-10" />
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavClick('catalog')} className={`text-xs uppercase tracking-widest font-bold hover:text-leather-500 transition-colors ${isSolid ? 'text-leather-900' : 'text-white/90 hover:text-white'}`}>
            Коллекция
          </button>
          <button onClick={() => handleNavClick('home', 'materials')} className={`text-xs uppercase tracking-widest font-bold hover:text-leather-500 transition-colors ${isSolid ? 'text-leather-900' : 'text-white/90 hover:text-white'}`}>
            Материалы
          </button>
          <button onClick={() => handleNavClick('home', 'about')} className={`text-xs uppercase tracking-widest font-bold hover:text-leather-500 transition-colors ${isSolid ? 'text-leather-900' : 'text-white/90 hover:text-white'}`}>
            О мастере
          </button>
          <button onClick={() => handleNavClick('home', 'process')} className={`text-xs uppercase tracking-widest font-bold hover:text-leather-500 transition-colors ${isSolid ? 'text-leather-900' : 'text-white/90 hover:text-white'}`}>
            Процесс
          </button>
          <button onClick={() => handleNavClick('home', 'contact')} className={`text-xs uppercase tracking-widest font-bold hover:text-leather-500 transition-colors ${isSolid ? 'text-leather-900' : 'text-white/90 hover:text-white'}`}>
            Контакты
          </button>

          <button 
            onClick={onOpenCart}
            className={`p-2 rounded-full transition-colors relative ${isSolid ? 'bg-leather-100 text-leather-800 hover:bg-leather-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
             <ShoppingBag size={18} />
             {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                 {cartCount}
               </span>
             )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onOpenCart}
            className={`p-2 rounded-full transition-colors relative ${isSolid ? 'bg-leather-100 text-leather-800' : 'bg-white/20 text-white'}`}
          >
             <ShoppingBag size={20} />
             {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                 {cartCount}
               </span>
             )}
          </button>
          <button 
            className="text-leather-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
               <X className={isSolid ? 'text-leather-900' : 'text-white'} size={28} />
            ) : (
               <Menu className={isSolid ? 'text-leather-900' : 'text-white'} size={28} />
            )}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center py-8 space-y-6 animate-fade-in-down border-t border-leather-200">
            <button onClick={() => handleNavClick('catalog')} className="text-leather-900 text-lg font-serif font-medium">
              Коллекция
            </button>
            <button onClick={() => handleNavClick('home', 'materials')} className="text-leather-900 text-lg font-serif font-medium">
              Материалы
            </button>
            <button onClick={() => handleNavClick('home', 'about')} className="text-leather-900 text-lg font-serif font-medium">
              О мастере
            </button>
            <button onClick={() => handleNavClick('home', 'process')} className="text-leather-900 text-lg font-serif font-medium">
              Процесс
            </button>
            <button onClick={() => handleNavClick('home', 'contact')} className="text-leather-900 text-lg font-serif font-medium">
              Контакты
            </button>
          </div>
        )}
      </div>
    </header>
  );
};