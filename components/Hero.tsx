import React from 'react';
import { Mouse } from 'lucide-react';
import { HERO_IMAGE } from '../constants';
import { Logo } from './Logo';

interface HeroProps {
  onNavigate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#1a1512]">
      {/* Background Image - Subtle, Dark */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}
      ></div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/70"></div>

      {/* "Business Card" Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        
        {/* Crest / Logo */}
        <div className="mb-6 text-leather-200 opacity-90 transform hover:scale-105 transition-transform duration-700">
           <Logo variant="page" className="w-64 h-64 md:w-80 md:h-80" />
        </div>

        {/* Separator Line Top */}
        <div className="w-24 h-px bg-white/30 mb-6"></div>

        {/* CTA Button - Ghost Style */}
        <div className="mt-4">
            <button 
            onClick={onNavigate}
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden border border-white/30 hover:border-white/60 transition-colors duration-300 rounded-sm"
            >
              <span className="absolute inset-0 w-full h-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300"></span>
              <span className="relative text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-leather-100">
                Перейти в каталог
              </span>
            </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/60">
        <Mouse size={32} />
      </div>
    </section>
  );
};