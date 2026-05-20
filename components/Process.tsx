import React from 'react';
import { Hammer, Scissors, Feather } from 'lucide-react';

// Custom Thread/Wave Icon representing the stitching thread
const ThreadWave: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 20V7a3 3 0 0 1 6 0v10a3 3 0 0 0 6 0V7a3 3 0 0 1 6 0v13" />
  </svg>
);

export const Process: React.FC = () => {
  const steps = [
    {
      icon: <Scissors size={32} />,
      title: "Раскрой",
      desc: "Точный крой по лекалам из цельного куска шкуры (чепрака)."
    },
    {
      icon: <Hammer size={32} />,
      title: "Пробивка",
      desc: "Создание отверстий для будущего шва строчными пробойниками."
    },
    {
      icon: <ThreadWave size={32} />,
      title: "Сшивание",
      desc: "Ручной седельный шов двумя иглами навстречу друг другу. Гарантия вечной прочности."
    },
    {
      icon: <Feather size={32} />,
      title: "Обработка",
      desc: "Полировка урезов (краев) воском и деревянным сликкером до зеркального блеска."
    }
  ];

  return (
    <section id="process" className="py-24 bg-white">
       <div className="container mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-leather-900 mb-4">Процесс создания</h2>
            <p className="text-leather-700 max-w-xl mx-auto font-medium">
              Магия превращения грубой кожи в изящный аксессуар.
            </p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-leather-50 border border-leather-200 flex items-center justify-center text-leather-800 mb-6 group-hover:bg-leather-800 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-leather-900 mb-3">{step.title}</h3>
                <p className="text-leather-700 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
         </div>
       </div>
    </section>
  );
};