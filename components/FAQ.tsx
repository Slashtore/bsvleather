import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQProps {
  onOpenHelp?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenHelp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Top questions
  const faqs = [
    {
      question: "Как долго изготавливается изделие?",
      answer: "Обычно изготовление занимает от 2 до 5 рабочих дней. Если изделие сложное (например, рюкзак или сумка), срок может быть увеличен до 10-14 дней."
    },
    {
      question: "Боится ли изделие воды?",
      answer: "Кожа обработана финишными средствами и воском, поэтому легкий дождь ей не страшен. Однако, купаться с изделием или стирать его нельзя."
    },
    {
      question: "Можно ли нанести гравировку?",
      answer: "Да, я могу нанести инициалы или дату методом горячего тиснения. Логотип методом тиснения или лазерной гравировки — под заказ, обсуждается индивидуально."
    },
    {
      question: "Есть ли гарантия?",
      answer: "Да, я даю пожизненную гарантию на швы. Если седельный шов разойдется (что практически невозможно при нормальном использовании), я восстановлю его бесплатно."
    },
    {
        question: "Как выбрать размер ремня?",
        answer: "Самый точный способ — измерить ваш старый ремень от кончика пряжки до того отверстия, на которое вы застегиваете. Сообщите мне это расстояние в сантиметрах."
    },
    {
        question: "Что если я выберу изделие дешевле номинала сертификата?",
        answer: "Сертификат расходуется единовременно. Если выбранное изделие дешевле, я предложу вам полезные аксессуары на остаток суммы (средства для ухода, кожаный браслет или брелок), чтобы подарок был использован на 100%."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-leather-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-leather-100 rounded-full mb-4 text-leather-800">
                <HelpCircle size={24} />
            </div>
            <h2 className="text-4xl font-serif text-leather-900 mb-4">Частые вопросы</h2>
            <p className="text-leather-600">Коротко о главном</p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-leather-200 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-serif text-lg text-leather-900 font-medium pr-8">
                  {faq.question}
                </span>
                <span className={`text-leather-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                   {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-leather-700 leading-relaxed border-t border-leather-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {onOpenHelp && (
            <div className="text-center">
                <button 
                    onClick={onOpenHelp}
                    className="inline-flex items-center gap-3 bg-white border border-leather-300 px-8 py-3 rounded-sm uppercase tracking-widest text-xs font-bold text-leather-800 hover:bg-leather-800 hover:text-white hover:border-leather-800 transition-all duration-300"
                >
                    Справочный центр
                    <ArrowRight size={16} />
                </button>
            </div>
        )}
      </div>
    </section>
  );
};