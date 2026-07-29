import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-down">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl relative flex flex-col max-h-[85vh] border border-stone-200/80">
        
        {/* Кнопка закрытия */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500 hover:text-stone-900"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        {/* Заголовок модалки */}
        <div className="p-6 md:p-8 border-b border-stone-200/80 pr-12">
          <h3 className="text-xl md:text-2xl font-serif text-stone-900 font-medium tracking-tight">
            {title}
          </h3>
        </div>

        {/* Содержимое статьи */}
        <div className="p-6 md:p-8 overflow-y-auto text-stone-600 text-xs md:text-sm leading-relaxed font-light whitespace-pre-wrap">
          {content}
        </div>
        
        {/* Нижняя плашка с кнопкой */}
        <div className="p-4 md:p-6 border-t border-stone-200/80 bg-stone-50 rounded-b-sm">
          <button 
            onClick={onClose}
            className="w-full bg-[#1a110f] text-[#e6ccb2] py-3.5 uppercase tracking-widest text-xs font-bold hover:bg-stone-900 transition-all rounded-sm border border-stone-800 shadow-md"
          >
            Понятно
          </button>
        </div>

      </div>
    </div>
  );
};