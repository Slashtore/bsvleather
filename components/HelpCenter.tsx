import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, HelpCircle, Truck, PenTool, ShieldCheck, Wallet, MessageCircle, RefreshCw } from 'lucide-react';
import { CONTACT_CONFIG } from '../constants';

interface HelpCenterProps {
  onBackToHome: () => void;
  initialCategory?: Category;
}

type Category = 'GENERAL' | 'PAYMENT' | 'CUSTOM' | 'CARE' | 'WARRANTY' | 'RETURNS';

export const HelpCenter: React.FC<HelpCenterProps> = ({ onBackToHome, initialCategory = 'GENERAL' }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
    { id: 'GENERAL', label: 'Общие вопросы', icon: <HelpCircle size={18} /> },
    { id: 'PAYMENT', label: 'Оплата и Доставка', icon: <Truck size={18} /> },
    { id: 'CUSTOM', label: 'Заказы и Гравировка', icon: <PenTool size={18} /> },
    { id: 'CARE', label: 'Уход за кожей', icon: <ShieldCheck size={18} /> },
    { id: 'WARRANTY', label: 'Гарантия', icon: <Wallet size={18} /> },
    { id: 'RETURNS', label: 'Возврат и обмен', icon: <RefreshCw size={18} /> },
  ];

  const allFaqs = {
    GENERAL: [
      {
        q: "Где находится ваша мастерская?",
        a: "Мастерская находится в Воронеже. Вы можете забрать заказ самовывозом по предварительной договорённости. Адрес уточняю при оформлении заказа."
      },
      {
        q: "Из чего вы шьёте?",
        a: "Я использую только натуральную кожу растительного и комбинированного дубления. В основном это премиальная итальянская и российская кожа. Фурнитура — литая латунь, нержавеющая сталь или никелированная сталь."
      },
      {
        q: "Есть ли товары в наличии?",
        a: "Да, некоторые популярные модели (обложки, картхолдеры) бывают в наличии. Но сложные изделия (сумки, портфели, ремни под размер) я изготавливаю на заказ, чтобы они идеально вам подходили."
      }
    ],
    PAYMENT: [
      {
        q: "Нужна ли предоплата?",
        a: "Да, работа над индивидуальным заказом начинается после внесения предоплаты 50%. Вторая часть оплачивается по готовности, перед отправкой (я присылаю подробные фото и видео готового изделия)."
      },
      {
        q: "Как можно оплатить?",
        a: "Переводом на карту (Сбер, T-Банк) или через СБП. Для юридических лиц возможна оплата по счёту (самозанятый, +6% к стоимости)."
      },
      {
        q: "Сколько стоит доставка?",
        a: "СДЭК до пункта выдачи — от 350 ₽, до двери — от 500 ₽. Почта России — от 300 ₽. При заказе от 10 000 ₽ доставка по РФ бесплатная."
      },
      {
        q: "Отправляете ли за границу?",
        a: "Да, отправляю Почтой России или EMS. Стоимость рассчитывается индивидуально и зависит от страны получателя."
      }
    ],
    CUSTOM: [
      {
        q: "Как узнать размер ремня?",
        a: "Самый надежный способ: возьмите свой старый ремень, который вам впору. Измерьте расстояние от кончика пряжки (вместе с ней) до того отверстия, на которое вы чаще всего застёгиваете. Это и есть ваш индивидуальный размер."
      },
      {
        q: "Можно ли сделать гравировку или тиснение?",
        a: "Конечно. Я делаю горячее тиснение инициалов и даты бесплатно. Нанесение логотипа методом клише или лазерной гравировки под заказ. Стоимость услуги от 500 ₽."
      },
      {
        q: "Шьёте ли вы по фото или эскизам?",
        a: "Да, я берусь за индивидуальные проекты, если они соответствуют стилистике мастерской. Присылайте фото или эскиз в мессенджер — обсудим возможность и расчёт цены."
      }
    ],
    CARE: [
      {
        q: "Как ухаживать за изделием?",
        a: "Раз в 3-6 месяцев обрабатывайте кожу бесцветным бальзамом или воском на натуральной основе. Избегайте длительного намокания. Если намочили — сушите при комнатной температуре, вдали от батарей."
      },
      {
        q: "Кожа поцарапалась, что делать?",
        a: "На коже растительного дубления и винтажных сортах мелкие царапины — часть естественного характера. Потрите место сухим пальцем или мягкой тканью — воск разогреется и царапина сгладится."
      }
    ],
    WARRANTY: [
      {
        q: "Какая гарантия на изделия?",
        a: "Я даю пожизненную гарантию на целостность седельного шва. Если шов разойдётся (что практически невозможно при ручном прошиве двумя иглами), я бесплатно его восстановлю. Гарантия на фурнитуру — 1 год."
      },
      {
        q: "Можно ли вернуть товар?",
        a: "Товары надлежащего качества (без индивидуальной гравировки и персональных изменений) можно вернуть в течение 14 дней, если они не были в эксплуатации."
      }
    ],
    RETURNS: [
      {
        q: "Могу ли я вернуть товар?",
        a: "Да, вы можете вернуть товар надлежащего качества, если он не подошел. Важное условие: сохранён товарный вид, упаковка, и изделие не было в употреблении."
      },
      {
        q: "Как оформить возврат?",
        a: (
          <div className="space-y-2 text-stone-600">
            <p>1) Напишите мне на <span className="font-medium text-stone-900">bsvleather@gmail.com</span> или в мессенджер о намерении вернуть товар.</p>
            <p>2) Откройте и заполните <a 
              href="https://docs.google.com/document/d/1vjO3P2_9896HaqhPVJxUjN13OIogZfk0fbm5cNXFmFA/view" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-bold text-[#885036] hover:text-stone-950 transition-colors"
            >
              бланк заявления на возврат
            </a>.</p>
            <p>3) Вложите заполненное заявление в посылку.</p>
            <p>4) Отправьте товар Почтой России или СДЭК.</p>
            <p>5) Сообщите трек-номер отправления на почту.</p>
          </div>
        )
      },
      {
        q: "Можно ли вернуть товар с гравировкой или индивидуальными изменениями?",
        a: "Товары, изготовленные по индивидуальным параметрам (с гравировкой, персональным тиснением, изменённым размером или цветом), не подлежат возврату, если нет производственного брака."
      },
      {
        q: "Что считается браком для кожаных изделий?",
        a: "Кожа — натуральный живой материал, поэтому естественные нюансы (небольшие шрамы, естественный рисунок фактуры) не являются браком. Брак — это дефект шва, фурнитуры или материала, мешающий использованию."
      },
      {
        q: "Кто оплачивает доставку при возврате?",
        a: "При возврате товара надлежащего качества (не подошел) — доставку оплачивает покупатель. Если подтверждён брак по моей вине — я полностью компенсирую расходы на пересылку."
      },
      {
        q: "Когда я получу деньги обратно?",
        a: "Возврат средств происходит в течение 10 рабочих дней после получения посылки и заявления. Деньги вернутся на карту или почтовым переводом."
      }
    ]
  };

  const currentFaqs = allFaqs[activeCategory];

  return (
    <section className="py-24 bg-stone-100/60 min-h-screen border-t border-stone-200/80">
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
              Справочный центр
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto text-sm md:text-base font-light">
              Ответы на все вопросы о заказе, доставке, материалах и гарантиях в мастерской BSV Leather.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 max-w-6xl mx-auto">
            
            {/* Боковая навигация категорий */}
            <div className="w-full lg:w-1/4 flex flex-col gap-1.5">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2 px-3 font-mono">
                  Категории
                </h3>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setOpenQuestionIndex(null);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-sm text-xs md:text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#1a110f] text-[#e6ccb2] shadow-md border border-stone-800' 
                          : 'bg-white text-stone-700 hover:bg-stone-200/60 border border-stone-200/80'
                      }`}
                    >
                      <span className={isActive ? 'text-[#e6ccb2]' : 'text-stone-400'}>
                        {cat.icon}
                      </span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
            </div>

            {/* Область вопросов выбранной категории */}
            <div className="w-full lg:w-3/4">
                 <div className="bg-white rounded-sm shadow-sm border border-stone-200/80 p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-serif text-stone-900 mb-6 pb-4 border-b border-stone-100 font-medium">
                      {categories.find(c => c.id === activeCategory)?.label}
                    </h3>

                    <div className="space-y-4">
                        {currentFaqs.map((item, idx) => {
                          const isOpen = openQuestionIndex === idx;

                          return (
                            <div key={idx} className="border-b border-stone-100 last:border-0 pb-4 last:pb-0">
                                <button
                                    onClick={() => setOpenQuestionIndex(isOpen ? null : idx)}
                                    className="w-full flex items-start justify-between text-left group focus:outline-none"
                                >
                                    <span className={`text-base md:text-lg font-serif font-medium transition-colors duration-200 pr-4 ${
                                      isOpen ? 'text-[#885036]' : 'text-stone-900 group-hover:text-[#885036]'
                                    }`}>
                                        {item.q}
                                    </span>
                                    <span className={`flex-shrink-0 ml-2 mt-1 transition-transform duration-300 ${
                                      isOpen ? 'rotate-180 text-[#885036]' : 'text-stone-400'
                                    }`}>
                                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                    </span>
                                </button>

                                <div 
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="text-stone-600 leading-relaxed text-xs md:text-sm font-light">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                          );
                        })}
                    </div>
                 </div>

                 {/* Задать вопрос напрямую */}
                 <div className="mt-8 bg-stone-900 text-stone-100 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-stone-800 shadow-xl">
                    <div>
                        <p className="font-serif font-medium text-stone-100 text-base">Не нашли ответ на свой вопрос?</p>
                        <p className="text-xs text-stone-400 font-light mt-0.5">Напишите мне лично, проконсультирую по коже и деталям заказа.</p>
                    </div>
                    <a 
                      href={CONTACT_CONFIG.MESSENGER_URL} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-6 py-3 bg-[#1a110f] hover:bg-black text-[#e6ccb2] rounded-sm text-xs font-bold uppercase tracking-widest transition-all border border-[#e6ccb2]/30 flex items-center gap-2 shrink-0 shadow-md"
                    >
                        <MessageCircle size={16} />
                        <span>Написать в {CONTACT_CONFIG.MESSENGER_LABEL}</span>
                    </a>
                 </div>
            </div>

        </div>

      </div>
    </section>
  );
};