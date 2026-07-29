import React, { useState, useMemo } from 'react';
import { MATERIALS } from '../constants';
import { MaterialType, LeatherStyle } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface MaterialsCatalogProps {
  onBackToHome: () => void;
}

export const MaterialsCatalog: React.FC<MaterialsCatalogProps> = ({ onBackToHome }) => {
  const [activeType, setActiveType] = useState<MaterialType | 'ALL'>('ALL');
  const [activeStyle, setActiveStyle] = useState<LeatherStyle | 'ALL'>('ALL');

  const filteredMaterials = useMemo(() => {
    return MATERIALS.filter(item => {
      // 1. Фильтрация по типу
      if (activeType !== 'ALL' && item.type !== activeType) return false;
      
      // 2. Фильтрация по стилю (только для кожи)
      if (activeType === MaterialType.LEATHER && activeStyle !== 'ALL') {
         if (item.style !== activeStyle) return false;
      }
      
      return true;
    });
  }, [activeType, activeStyle]);

  return (
    <section className="py-20 md:py-24 bg-stone-100/60 min-h-screen border-t border-stone-200/80">
      <div className="container mx-auto px-6">
        
        {/* Шапка страницы */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 relative">
          <button 
            onClick={onBackToHome}
            className="absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest text-xs font-bold group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden md:inline">На главную</span>
          </button>

          <div className="text-center w-full">
            <h2 className="text-3xl md:text-5xl font-serif text-stone-950 mb-3 tracking-tight font-medium">
              Каталог материалов
            </h2>
            <div className="w-16 h-0.5 bg-[#885036] mx-auto rounded-full" />
          </div>
        </div>

        {/* Главные фильтры (Табы) */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mb-8">
            <button
                onClick={() => { setActiveType('ALL'); setActiveStyle('ALL'); }}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                  activeType === 'ALL' 
                    ? 'bg-[#1a110f] text-[#e6ccb2] shadow-sm border border-stone-800' 
                    : 'bg-white text-stone-700 hover:bg-stone-200/60 border border-stone-200/80'
                }`}
            >
                Все материалы
            </button>
            {Object.values(MaterialType).map(type => (
                <button
                    key={type}
                    onClick={() => { setActiveType(type); setActiveStyle('ALL'); }}
                    className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                      activeType === type 
                        ? 'bg-[#1a110f] text-[#e6ccb2] shadow-sm border border-stone-800' 
                        : 'bg-white text-stone-700 hover:bg-stone-200/60 border border-stone-200/80'
                    }`}
                >
                    {type}
                </button>
            ))}
        </div>

        {/* Дополнительные подфильтры для кожи */}
        {activeType === MaterialType.LEATHER && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12 animate-fade-in-down">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 mr-2">
                  Тип кожи:
                </span>
                <button
                    onClick={() => setActiveStyle('ALL')}
                    className={`px-3.5 py-1.5 rounded-sm border text-[11px] uppercase tracking-wider transition-all ${
                      activeStyle === 'ALL' 
                        ? 'border-[#885036] bg-[#885036] text-white font-medium' 
                        : 'border-stone-200/90 text-stone-600 hover:border-stone-400 bg-white'
                    }`}
                >
                    Все типы
                </button>
                {Object.values(LeatherStyle).map(style => (
                    <button
                        key={style}
                        onClick={() => setActiveStyle(style)}
                        className={`px-3.5 py-1.5 rounded-sm border text-[11px] uppercase tracking-wider transition-all ${
                          activeStyle === style 
                            ? 'border-[#885036] bg-[#885036] text-white font-medium' 
                            : 'border-stone-200/90 text-stone-600 hover:border-stone-400 bg-white'
                        }`}
                    >
                        {style}
                    </button>
                ))}
            </div>
        )}

        {/* Сетка материалов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMaterials.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white border border-stone-200/80 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                >
                    {/* Фотография / Превью */}
                    <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden">
                        {item.imageUrl ? (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                        ) : (
                            <div 
                              className="w-full h-full flex items-center justify-center" 
                              style={{ backgroundColor: item.colorHex || '#f5f5f5' }}
                            >
                                <div className="text-stone-900/10 font-serif text-6xl opacity-30 rotate-12 select-none">
                                  {item.name[0]}
                                </div>
                            </div>
                        )}
                        
                        {/* Бейдж категории */}
                        <div className="absolute top-4 left-4">
                             <span className="bg-stone-950/80 backdrop-blur-md text-[#e6ccb2] text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm border border-white/10 shadow-sm">
                                {item.type}
                             </span>
                        </div>
                    </div>

                    {/* Описание и характеристики */}
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-1.5">
                             <h3 className="text-xl font-serif text-stone-900 font-medium tracking-tight">
                              {item.name}
                             </h3>
                            {item.colorHex && (
                            <div 
                                className="w-5 h-5 flex-shrink-0 rounded-full border border-stone-300 shadow-inner overflow-hidden cursor-help mt-1"
                                title={item.type === MaterialType.THREAD ? "Доступно более 50 оттенков" : undefined}
                                style={
                                item.type === MaterialType.THREAD
                                    ? { background: 'conic-gradient(#ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #ef4444)' }
                                    : { backgroundColor: item.colorHex }
                                }
                            />
                            )}
                        </div>
                        
                        {item.style && (
                            <p className="text-[10px] text-[#885036] font-bold uppercase tracking-widest mb-3 font-mono">
                              {item.style}
                            </p>
                        )}

                        <p className="text-stone-600 text-xs md:text-sm leading-relaxed mb-6 font-light flex-grow">
                            {item.description}
                        </p>

                        <div className="border-t border-stone-100 pt-4 mt-auto">
                            <ul className="flex flex-wrap gap-2">
                                {item.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-[11px] text-stone-700 font-medium bg-stone-100/80 px-2.5 py-1 rounded-sm border border-stone-200/60">
                                        <Check size={12} className="mr-1.5 text-[#885036] shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Состояние "Ничего не найдено" */}
        {filteredMaterials.length === 0 && (
             <div className="text-center py-20 text-stone-400">
                <p className="font-light text-base">В этой категории пока нет материалов.</p>
             </div>
        )}

      </div>
    </section>
  );
};