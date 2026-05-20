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
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl relative flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-leather-100 rounded-full transition-colors text-leather-800"
        >
          <X size={24} />
        </button>

        <div className="p-8 border-b border-leather-200">
          <h3 className="text-2xl font-serif text-leather-900">{title}</h3>
        </div>

        <div className="p-8 overflow-y-auto text-leather-800 leading-relaxed whitespace-pre-wrap">
            {content}
        </div>
        
        <div className="p-6 border-t border-leather-200 bg-leather-50 rounded-b-sm">
            <button 
                onClick={onClose}
                className="w-full bg-leather-800 text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-leather-700 transition-colors"
            >
                Понятно
            </button>
        </div>
      </div>
    </div>
  );
};