import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { InfoModal } from './InfoModal';
import { DELIVERY_INFO, WARRANTY_INFO, CARE_INFO, CONTACT_CONFIG } from '../constants';

// Custom VK Icon component since it's not in standard Lucide set
const VkIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    style={{ transform: 'scale(1.67) translateY(2px)', transformOrigin: 'center center' }}
  >
    <path d="M15.684 13.673c.758.736 1.34 1.373 1.585 2.112.062.186.068.225.04.282-.046.095-.19.143-.45.143h-2.583c-.768 0-1.077-.282-1.742-.992-.497-.53-1.025-1.144-1.393-1.144-.19 0-.265.082-.265.485v1.272c0 .326-.104.532-.88.558-2.61.087-4.706-1.76-6.425-5.26C2.398 8.875 1.48 6.353 1.48 6.273c0-.075.093-.146.23-.146h2.585c.237 0 .428.09.544.37.587 1.417 1.573 3.336 1.972 3.996.347.574.52.696.71.696.108 0 .193-.058.193-.57V7.575c-.046-1.353-.807-1.465-.807-1.954 0-.23.197-.478.508-.478h2.836c.4 0 .53.197.53.642v3.313c0 .358.163.486.265.486.2 0 .363-.102.735-.61.76-1.04 1.305-2.553 1.305-2.553.067-.14.242-.266.58-.266h2.584c.738 0 .864.24.705.808-.344 1.222-1.895 3.328-2.56 4.14-.545.663-.612.873.12 1.57z"/>
  </svg>
);

// Custom Dzen Icon component
const DzenIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 28 28" 
    fill="currentColor"
    className={className}
  >
    <path d="M16.7 16.7c-2.2 2.27-2.36 5.1-2.55 11.3 5.78 0 9.77-.02 11.83-2.02 2-2.06 2.02-6.24 2.02-11.83-6.2.2-9.03.35-11.3 2.55M0 14.15c0 5.59.02 9.77 2.02 11.83 2.06 2 6.05 2.02 11.83 2.02-.2-6.2-.35-9.03-2.55-11.3-2.27-2.2-5.1-2.36-11.3-2.55M13.85 0C8.08 0 4.08.02 2.02 2.02.02 4.08 0 8.26 0 13.85c6.2-.2 9.03-.35 11.3-2.55 2.2-2.27 2.36-5.1 2.55-11.3m2.85 11.3C14.5 9.03 14.34 6.2 14.15 0c5.78 0 9.77.02 11.83 2.02 2 2.06 2.02 6.24 2.02 11.83-6.2-.2-9.03-.35-11.3-2.55" />
  </svg>
);

export const Footer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });

  const openModal = (title: string, text: string) => {
    setModalContent({ title, text });
    setModalOpen(true);
  };

  return (
    <>
      <footer className="bg-leather-900 text-leather-200 py-10 border-t border-leather-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Brand */}
            <div className="text-center md:text-left flex items-center gap-4">
              <div className="text-leather-300 opacity-80">
                  <Logo variant="page" className="w-20 h-20 md:w-36 md:h-36" />
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-left">
                <div className="flex flex-col gap-3">
                    <h4 className="text-white text-xs uppercase tracking-widest font-bold">Информация</h4>
                    <button 
                        onClick={() => openModal('Доставка и Оплата', DELIVERY_INFO)}
                        className="text-sm hover:text-white transition-colors text-left"
                    >
                        Доставка и оплата
                    </button>
                    <button 
                        onClick={() => openModal('Гарантия и Возврат', WARRANTY_INFO)}
                        className="text-sm hover:text-white transition-colors text-left"
                    >
                        Гарантия качества
                    </button>
                    <button 
                        onClick={() => openModal('Уход за изделиями', CARE_INFO)}
                        className="text-sm hover:text-white transition-colors text-left"
                    >
                        Уход за кожей
                    </button>
                </div>
            </div>

            {/* Socials & Copyright */}
            <div className="flex flex-col items-center md:items-end gap-4">
                <div className="flex gap-6 items-center">
                    <a href="https://vk.com/club238936761" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="ВКонтакте"><VkIcon size={24} className="translate-y-[1.5px]" /></a>
                    <a href="https://dzen.ru/id/680b7e950637d556531bf3d6" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Дзен"><DzenIcon size={24} className="translate-y-[1px]" /></a>
                    <a href={CONTACT_CONFIG.MESSENGER_URL} target="_blank" rel="noreferrer" className="hover:text-[#2AABEE] transition-colors" title={CONTACT_CONFIG.MESSENGER_LABEL}><MessageCircle size={24} /></a>
                </div>
                <div className="text-sm text-center md:text-right">
                    <p>&copy; {new Date().getFullYear()} BSV Leather Workshop.</p>
                    <p className="mt-1 text-xs text-leather-400">Ручная работа. Характер. Качество.</p>
                </div>
            </div>
          </div>
        </div>
      </footer>

      <InfoModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        content={modalContent.text}
      />
    </>
  );
};