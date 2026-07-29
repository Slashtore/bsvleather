import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQProps {
  onOpenHelp?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenHelp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Список частых вопросов
  const faqs = [
    {
      question: "Как долго изготавливается изделие?",
      answer: "Обычно изготовление занимает от 2 до 5 рабочих дней. Если изделие сложное (например, портфель или вместительная сумка), срок может составлять до 10–14 дней."
    },
    {
      question: "Боится ли кожа воды?",
      answer: "Изделия обработаны защитными финишными аппретурами и натуральным воском, поэтому лёгкий дождь или брызги им не страшны. Однако погружать изделие в воду или стирать его нельзя."
    },
    {
      question: "Можно ли нанести гравировку или инициалы?",
      answer: "Да, я наношу инициалы, памятные даты или монограммы методом горячего тиснения. Клиентские логотипы и персональные надписи обсуждаются индивидуально."
    },
    {
      question: "Есть ли гарантия на изделия?",
      answer: "Да, я даю пожизненную гарантию на целостность седельного шва. Если вощёная нить распустится (что практически невозможно при классическом ручном седельном шве двумя иглами), я бесплатно восстановлю шов."
    },
    {
      question: "Как правильно выбрать размер ремня?",
      answer: "Самый точный способ — измерить ваш текущий ремень от кончика пряжки до того отверстия, на которое вы обычно застёгиваете. Сообщите мне эту цифру в сантиметрах."
    },
    {
      question: "Что если выбранное по сертификату изделие дешевле его номинала?",
      answer: "Сертификат расходуется единовременно. На остаток суммы я предложу вам полезные аксессуары (средство для ухода за кожей, брелок или браслет), чтобы подарок был использован на 100%."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-24 bg-stone-100/60 border-t border-stone-200/80">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Шапка блока */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stone-200/80 rounded-full text-[#885036] text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
            <HelpCircle size={13} />
            <span>Вопросы и ответы</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-3 tracking-tight font-medium">
            Частые вопросы
          </h2>
          <p className="text-stone-500 text-sm md:text-base font-light">
            Коротко о сроках, материалах и гарантии в мастерской
          </p>
        </div>

        {/* Список вопросов (Аккордеон) */}
        <div className="space-y-3.5 mb-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="bg-white border border-stone-200/80 rounded-sm overflow-hidden transition-all duration-300 hover:border-stone-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
                >
                  <span className={`font-serif text-base md:text-lg font-medium pr-6 transition-colors duration-200 ${
                    isOpen ? 'text-[#885036]' : 'text-stone-900 group-hover:text-[#885036]'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <span className={`p-1.5 rounded-full transition-all duration-300 shrink-0 ${
                    isOpen ? 'bg-stone-100 text-[#885036] rotate-180' : 'text-stone-400 group-hover:text-stone-700'
                  }`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-stone-600 text-xs md:text-sm leading-relaxed font-light border-t border-stone-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Кнопка перехода в полный справочный центр */}
        {onOpenHelp && (
          <div className="text-center">
            <button 
              onClick={onOpenHelp}
              className="inline-flex items-center gap-2.5 bg-[#1a110f] text-[#e6ccb2] hover:bg-stone-900 px-8 py-4 rounded-sm uppercase tracking-widest text-xs font-bold transition-all duration-300 shadow-md border border-stone-800"
            >
              <span>Справочный центр</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};