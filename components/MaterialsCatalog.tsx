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
      // 1. Filter by Type
      if (activeType !== 'ALL' && item.type !== activeType) return false;
      
      // 2. Filter by Style (Only for Leather)
      if (activeType === MaterialType.LEATHER && activeStyle !== 'ALL') {
         if (item.style !== activeStyle) return false;
      }
      
      return true;
    });
  }, [activeType, activeStyle]);

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 relative">
          <button 
            onClick={onBackToHome}
            className="absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 text-leather-500 hover:text-leather-900 transition-colors uppercase tracking-widest text-xs font-bold"
          >
            <ArrowLeft size={16} />
            <span className="hidden md:inline">На главную</span>
          </button>

          <div className="text-center w-full">
            <h2 className="text-4xl md:text-5xl font-serif text-leather-900 mb-4">Материалы</h2>
            <div className="w-24 h-1 bg-leather-300 mx-auto"></div>
          </div>
        </div>

        {/* Main Filters (Tabs) */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
                onClick={() => { setActiveType('ALL'); setActiveStyle('ALL'); }}
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider font-bold transition-all ${activeType === 'ALL' ? 'bg-leather-900 text-white' : 'bg-leather-50 text-leather-600 hover:bg-leather-100'}`}
            >
                Все
            </button>
            {Object.values(MaterialType).map(type => (
                <button
                    key={type}
                    onClick={() => { setActiveType(type); setActiveStyle('ALL'); }}
                    className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider font-bold transition-all ${activeType === type ? 'bg-leather-900 text-white' : 'bg-leather-50 text-leather-600 hover:bg-leather-100'}`}
                >
                    {type}
                </button>
            ))}
        </div>

        {/* Sub-filters for Leather */}
        {activeType === MaterialType.LEATHER && (
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-down">
                <span className="flex items-center text-xs uppercase text-leather-400 mr-2">Тип кожи:</span>
                <button
                    onClick={() => setActiveStyle('ALL')}
                    className={`px-4 py-1.5 rounded-sm border text-xs uppercase tracking-wide transition-all ${activeStyle === 'ALL' ? 'border-leather-800 bg-leather-800 text-white' : 'border-leather-200 text-leather-600 hover:border-leather-400'}`}
                >
                    Все типы
                </button>
                {Object.values(LeatherStyle).map(style => (
                    <button
                        key={style}
                        onClick={() => setActiveStyle(style)}
                        className={`px-4 py-1.5 rounded-sm border text-xs uppercase tracking-wide transition-all ${activeStyle === style ? 'border-leather-800 bg-leather-800 text-white' : 'border-leather-200 text-leather-600 hover:border-leather-400'}`}
                    >
                        {style}
                    </button>
                ))}
            </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMaterials.map(item => (
                <div key={item.id} className="bg-white border border-leather-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                    {/* Image Area */}
                    <div className="aspect-[3/4] bg-leather-50 relative overflow-hidden">
                        {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                            // Fallback for items without image (like threads often)
                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: item.colorHex || '#f5f5f5' }}>
                                <div className="text-leather-900/20 font-serif text-6xl opacity-20 rotate-12">{item.name[0]}</div>
                            </div>
                        )}
                        
                        {/* Type Badge */}
                        <div className="absolute top-4 left-4">
                             <span className="bg-white/90 backdrop-blur-sm text-leather-900 text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                                {item.type}
                             </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="text-xl font-serif text-leather-900">{item.name}</h3>
                            {item.colorHex && (
                            <div 
                                className="w-6 h-6 flex-shrink-0 rounded-full border border-leather-200 shadow-inner overflow-hidden cursor-help"
                                title={item.type === MaterialType.THREAD ? "Доступно более 50 оттенков" : undefined}
                                style={
                                item.type === MaterialType.THREAD
                                    ? { background: 'conic-gradient(#ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #ef4444)' }
                                    : { backgroundColor: item.colorHex }
                                }
                            ></div>
                            )}
                        </div>
                        
                        {item.style && (
                            <p className="text-xs text-leather-500 uppercase tracking-wider mb-4">{item.style}</p>
                        )}

                        <p className="text-leather-700 text-sm leading-relaxed mb-6 flex-grow">
                            {item.description}
                        </p>

                        <div className="border-t border-leather-200 pt-4 mt-auto">
                            <ul className="flex flex-wrap gap-y-2 gap-x-4">
                                {item.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-xs text-leather-600 font-medium bg-leather-50 px-2 py-1 rounded-sm">
                                        <Check size={12} className="mr-1 text-green-600" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {filteredMaterials.length === 0 && (
             <div className="text-center py-20 text-leather-400">
                <p>Ничего не найдено в этой категории.</p>
             </div>
        )}

      </div>
    </section>
  );
};