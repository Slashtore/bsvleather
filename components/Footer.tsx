import React, { useState } from 'react';
import { Logo } from './Logo';
import { InfoModal } from './InfoModal';
import { DELIVERY_INFO, WARRANTY_INFO, CARE_INFO, CONTACT_CONFIG } from '../constants';

// Кастомная иконка VK
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

// Кастомная иконка Яндекс Дзен
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

// Новая иконка Instagram из вашего SVG (CorelDRAW)
const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 1400.99 1400.9" 
    fill="currentColor"
    style={{ fillRule: 'evenodd', clipRule: 'evenodd' } as any}
    className={className}
  >
    <g>
      <path fill="currentColor" d="M410.43 2.63c96.65,-3.34 193.38,-2.3 290.07,-2.63 97.27,0.33 194.55,-0.75 291.78,2.67 77.57,2.5 157.76,5.7 229.38,38.95 67.78,30.78 122.31,90.11 147.01,160.43 28.08,73.94 27.29,154.14 30.45,232.04 2.84,127.56 1.55,255.2 1.75,382.81 -0.29,65.36 -0.41,130.76 -3.45,196.09 -2.09,65.32 -6.79,132.1 -31.62,193.34 -28.58,74.94 -91.57,135.93 -167.22,162.43 -72.45,27.37 -150.89,27.24 -227.17,30.2 -109.65,2.79 -219.34,1.67 -328.98,1.91 -81.9,-0.24 -163.81,0.26 -245.63,-3.08 -70.32,-2.29 -142.6,-6.37 -208.13,-34.45 -70.4,-28.75 -127.85,-88.03 -154.38,-159.3 -21.38,-54.12 -27.67,-112.73 -29.87,-170.47 -5.17,-104.03 -4.04,-208.22 -4.42,-312.32 0.33,-98.44 -0.62,-196.97 2.12,-295.41 2.84,-75.19 3.17,-152.51 30.25,-223.88 22.54,-64.57 70.49,-119.43 130.31,-152.18 75.78,-40.7 163.68,-44.74 247.75,-47.15l0 0zm712.49 146.18c-49.53,15.37 -80.77,71.94 -66.82,122.06 11.79,51.53 67.91,86.98 119.56,75.03 55,-9.79 93.57,-70.07 78.82,-124.19 -12.08,-56.36 -77.23,-92.73 -131.56,-72.9l0 0zm-478.41 117.39c-92.32,11.54 -180.3,53.91 -247.25,118.44 -70.78,67.7 -117.89,159.72 -130.64,256.91 -12.79,93.74 5.5,191.59 52.45,273.83 49.07,87.69 129.43,157.26 223.21,193.42 100.52,39.24 215.71,39.29 316.28,0.09 117.89,-45.12 213.67,-143.81 255.07,-263.12 34.87,-98.65 32.75,-209.84 -6.16,-307.03 -38.45,-97.32 -113.11,-179.76 -206.3,-227.42 -78.23,-40.87 -169.18,-56.41 -256.66,-45.12z"/>
    </g>
    <path fill="currentColor" d="M648.3 420.09c59.28,-11.08 122.02,-2.83 176.26,23.58 52.95,25.46 97.48,67.86 125.81,119.31 33.25,59.87 43.49,131.98 28.62,198.8 -14.08,65.36 -52.41,125.06 -105.65,165.47 -83.9,65.49 -205.38,76.9 -300.11,28.41 -62.82,-31.12 -113.27,-86.31 -138.47,-151.76 -25.37,-64.53 -25.87,-138.48 -1.38,-203.34 33.66,-92.23 118.23,-163.35 214.92,-180.47z"/>
  </svg>
);

// Кастомная иконка Max (Мессенджер)
const MaxIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="currentColor"
    className={className}
  >
    <path d="M83.914 77.442c8.441,-10.25 12.321,-22.922 10.453,-36.7 -1.02,-8.87 -4.809,-16.537 -10.088,-23.542 -2.73,-3.62 -7.882,-8.071 -11.912,-10.455 -21.548,-12.743 -48.523,-6.768 -63.107,12.347 -9.874,12.943 -11.264,29.017 -6.934,47.811 1.414,6.134 3.351,11.781 4.155,18.057 0.226,1.759 0.157,5.52 0.692,6.747 1.656,3.797 7.312,2.929 11.082,1.575 2.408,-0.866 5.242,-2.364 7.105,-3.989 0.794,-0.692 1.158,-1.203 1.91,-1.862 2.221,1.014 5.268,4.366 11.762,5.895 4.784,1.126 11.497,1.053 16.488,0.292 10.294,-1.569 18.007,-6.094 25.5,-13 0.957,-0.882 2.025,-2.166 2.894,-3.176zm-12.809 -35.313c1.39,4.518 0.233,11.07 -1.596,14.844 -4.026,8.307 -11.933,13.705 -21.269,14.048 -7.694,0.284 -11.594,-3.445 -13.514,-4.055 -5.191,4.237 -7.812,8.703 -10.382,-4.409 -2.48,-12.653 -0.802,-27.483 9.825,-35.204 4.379,-3.181 10.616,-4.796 16.232,-4.032 2.175,0.297 3.869,0.755 5.943,1.54 6.96,2.633 13.327,9.625 14.761,17.268z"/>
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
      <footer className="bg-[#14110f] text-stone-300 py-12 border-t border-stone-800/80">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Брендинг / Логотип */}
            <div className="text-center md:text-left flex items-center gap-4">
              <div className="text-[#e6ccb2]/80 hover:text-[#e6ccb2] transition-colors cursor-pointer">
                <Logo variant="page" className="w-24 h-24 md:w-32 md:h-32 drop-shadow-md" />
              </div>
            </div>

            {/* Полезные ссылки */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-left">
              <div className="flex flex-col gap-2.5">
                <h4 className="text-[#e6ccb2] text-[11px] font-mono uppercase tracking-[0.2em] font-bold mb-1">
                  Информация
                </h4>
                <button 
                  onClick={() => openModal('Доставка и Оплата', DELIVERY_INFO)}
                  className="text-xs text-stone-400 hover:text-stone-100 transition-colors text-center md:text-left"
                >
                  Доставка и оплата
                </button>
                <button 
                  onClick={() => openModal('Гарантия и Возврат', WARRANTY_INFO)}
                  className="text-xs text-stone-400 hover:text-stone-100 transition-colors text-center md:text-left"
                >
                  Гарантия качества
                </button>
                <button 
                  onClick={() => openModal('Уход за изделиями', CARE_INFO)}
                  className="text-xs text-stone-400 hover:text-stone-100 transition-colors text-center md:text-left"
                >
                  Уход за кожей
                </button>
              </div>
            </div>

            {/* Соцсети и копирайт */}
            <div className="flex flex-col items-center md:items-end gap-3.5">
              <div className="flex gap-5 items-center text-stone-400">
                <a 
                  href="https://vk.com/club238936761" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#e6ccb2] transition-colors p-1" 
                  title="ВКонтакте"
                >
                  <VkIcon size={22} className="translate-y-[1.5px]" />
                </a>
                <a 
                  href="https://dzen.ru/id/680b7e950637d556531bf3d6" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#e6ccb2] transition-colors p-1" 
                  title="Дзен"
                >
                  <DzenIcon size={22} className="translate-y-[1px]" />
                </a>
                <a 
                  href="https://www.instagram.com/bsvleather/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#e6ccb2] transition-colors p-1" 
                  title="Instagram"
                >
                  <InstagramIcon size={22} className="translate-y-[1px]" />
                </a>
                <a 
                  href={CONTACT_CONFIG.MESSENGER_URL} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#e6ccb2] transition-colors p-1" 
                  title={CONTACT_CONFIG.MESSENGER_LABEL}
                >
                  <MaxIcon size={22} className="translate-y-[1px]" />
                </a>
              </div>

              <div className="text-center md:text-right">
                <p className="text-xs font-medium text-stone-200">
                  &copy; {new Date().getFullYear()} BSV Leather Workshop.
                </p>
                <p className="mt-1 text-[11px] text-stone-500 font-light">
                  Ручная работа. Характер. Качество.
                </p>
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