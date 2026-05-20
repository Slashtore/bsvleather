import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, HelpCircle, Truck, PenTool, ShieldCheck, Wallet, Send, MessageCircle } from 'lucide-react';
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
    { id: 'RETURNS', label: 'Возврат и обмен', icon: <ShieldCheck size={18} /> },
  ];

  const allFaqs = {
    GENERAL: [
      {
        q: "Где находится ваша мастерская?",
        a: "Мастерская находится в Воронеже. Вы можете забрать заказ самовывозом по предварительной договоренности. Адрес уточняем при оформлении заказа."
      },
      {
        q: "Из чего вы шьете?",
        a: "Я использую только натуральную кожу растительного и комбинированного дубления. В основном это итальянская кожа и премиальная российская кожа. Фурнитура — литая латунь, нержавеющая сталь, или никелированная сталь."
      },
      {
        q: "Есть ли товары в наличии?",
        a: "Да, некоторые популярные модели (обложки, картхолдеры) бывают в наличии. Но сложные изделия (сумки, рюкзаки, ремни под размер) я изготавливаю на заказ, чтобы они идеально вам подходили."
      }
    ],
    PAYMENT: [
      {
        q: "Нужна ли предоплата?",
        a: "Да, работа над заказом начинается после внесения предоплаты 50%. Вторая часть оплачивается по готовности, перед отправкой (я присылаю подробные фото готового изделия)."
      },
      {
        q: "Как можно оплатить?",
        a: "Переводом на карту (Сбер, Тинькофф) или через СБП. Для юрлиц возможна оплата по счету (самозанятый, +6% к стоимости)."
      },
      {
        q: "Сколько стоит доставка?",
        a: "СДЭК до склада — от 350р, до двери — от 500р. Почта России — от 300р. При заказе от 10 000р доставка по РФ бесплатно."
      },
      {
        q: "Отправляете ли за границу?",
        a: "Да, отправляю Почтой России или EMS. Стоимость рассчитывается индивидуально и зависит от страны получателя."
      }
    ],
    CUSTOM: [
      {
        q: "Как узнать размер ремня?",
        a: "Самый надежный способ: возьмите свой старый ремень, который вам впору. Измерьте расстояние от кончика пряжки (вместе с ней) до того отверстия, на которое вы чаще всего застегиваете. Это и есть ваш размер талии для ремня."
      },
      {
        q: "Можно ли сделать гравировку?",
        a: "Конечно. Я делаю горячее тиснение инициалов и даты бесплатно. Нанесение логотипа методом тиснения или лазерной гравировки под заказ (любые логотипы и изображения). Стоимость услуги от 500р."
      },
      {
        q: "Шьете ли вы по фото или эскизам?",
        a: "Да, я берусь за индивидуальные проекты, если они соответствуют стилистике мастерской. Присылайте фото или эскиз в мессенджер — обсудим возможность и цену."
      }
    ],
    CARE: [
      {
        q: "Как ухаживать за изделием?",
        a: "Раз в 3-6 месяцев обрабатывайте кожу бесцветным кремом или воском на натуральной основе. Избегайте прямого контакта с водой. Если намочили — сушите при комнатной температуре, вдали от батарей."
      },
      {
        q: "Кожа поцарапалась, что делать?",
        a: "Если у вас кожа Crazy Horse (винтажная), царапины — это норма. Потрите место пальцем или мягкой тканью — воск разогреется, и царапина исчезнет или станет менее заметной."
      }
    ],
    WARRANTY: [
      {
        q: "Какая гарантия на изделия?",
        a: "Я даю пожизненную гарантию на швы. Если седельный шов разойдется (что практически невозможно), я восстановлю его бесплатно. Гарантия на фурнитуру — 1 год."
      },
      {
        q: "Можно ли вернуть товар?",
        a: "Товары надлежащего качества (без индивидуальной гравировки и нестандартных изменений) можно вернуть в течение 14 дней, если они не были в эксплуатации. Доставка за счет покупателя."
      }
    ],
      RETURNS: [
      {
        q: "Могу ли я вернуть товар?",
        a: "Да, вы можете вернуть деньги в течение 365 дней, если товар не подошёл. Для товаров надлежащего качества важно: сохранён товарный вид, упаковка, товар не был в употреблении."
      },
      {
        q: "Как оформить возврат?",
        a: (
          <div className="space-y-2">
            <p>1) Напишите мне на bsvleather@gmail.com или 8 (916) 716 93 21 о намерении вернуть товар.</p>
            <p>2) Откройте и заполните <a 
              href="https://docs.google.com/document/d/1vjO3P2_9896HaqhPVJxUjN13OIogZfk0fbm5cNXFmFA/view" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-bold text-leather-800 hover:text-leather-600 transition-colors"
            >
              бланк заявления
            </a></p>
            <p>3) Вложите заполненное заявление в посылку.</p>
            <p>4) Отправьте товар Почтой России «1-м классом» или «Заказным письмом».</p>
            <p>5) Напишите на почту bsvleather@gmail.com номер отправления, полученный на почте.</p>
          </div>
        )
      },
      {
        q: "Можно ли вернуть товар с гравировкой или индивидуальными изменениями?",
        a: "Товары, изготовленные по вашему заказу (с гравировкой, изменённым размером, цветом или формой), считаются окончательной продажей и не подлежат возврату, если нет производственного дефекта по моей вине."
      },
      {
        q: "Что считается браком для кожаных изделий?",
        a: "Кожа — натуральный материал, поэтому естественные особенности (шрамы, неравномерный окрас, следы от укусов насекомых, необычный рисунок) не являются дефектом. Брак — это существенный недостаток, который мешает использовать изделие по назначению."
      },
      {
        q: "Кто оплачивает доставку при возврате?",
        a: "При возврате товара надлежащего качества (не подошёл) — доставку оплачиваете вы. Если товар с браком по моей вине — я компенсирую стоимость доставки в обе стороны."
      },
      {
        q: "Когда я получу деньги обратно?",
        a: "Возврат средств происходит в течение 10 рабочих дней после получения вашего заявления. Деньги вернутся на карту или почтовым переводом — способ вы укажете в заявлении."
      }
    ]
  };

  const currentFaqs = allFaqs[activeCategory];

  return (
    <section className="py-24 bg-leather-50 min-h-screen">
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
            <h2 className="text-4xl md:text-5xl font-serif text-leather-900 mb-4">Справка</h2>
            <p className="text-leather-600 max-w-xl mx-auto">
                Ответы на самые популярные вопросы о мастерской, материалах и сервисе.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/4 flex flex-col gap-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-leather-400 mb-4 px-4">Категории</h3>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setActiveCategory(cat.id);
                            setOpenQuestionIndex(null);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-300 ${
                            activeCategory === cat.id 
                            ? 'bg-leather-800 text-white shadow-md' 
                            : 'bg-white text-leather-700 hover:bg-leather-100 border border-transparent hover:border-leather-200'
                        }`}
                    >
                        {cat.icon}
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-3/4">
                 <div className="bg-white rounded-sm shadow-sm border border-leather-200 p-6 md:p-8">
                    <h3 className="text-2xl font-serif text-leather-900 mb-8 pb-4 border-b border-leather-50">
                        {categories.find(c => c.id === activeCategory)?.label}
                    </h3>

                    <div className="space-y-4">
                        {currentFaqs.map((item, idx) => (
                            <div key={idx} className="border-b border-leather-50 last:border-0 pb-4 last:pb-0">
                                <button
                                    onClick={() => setOpenQuestionIndex(openQuestionIndex === idx ? null : idx)}
                                    className="w-full flex items-start justify-between text-left group focus:outline-none"
                                >
                                    <span className={`text-lg font-medium transition-colors duration-300 ${openQuestionIndex === idx ? 'text-leather-900' : 'text-leather-700 group-hover:text-leather-900'}`}>
                                        {item.q}
                                    </span>
                                    <span className={`flex-shrink-0 ml-4 mt-1 text-leather-400 transition-transform duration-300 ${openQuestionIndex === idx ? 'rotate-180 text-leather-800' : ''}`}>
                                        {openQuestionIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                    </span>
                                </button>
                                <div 
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        openQuestionIndex === idx ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-leather-600 leading-relaxed text-sm md:text-base">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>

                 {/* Contact Callout */}
                 <div className="mt-8 bg-leather-100 rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-leather-900">Не нашли ответ на свой вопрос?</p>
                        <p className="text-sm text-leather-600">Напишите мне лично, я всегда на связи.</p>
                    </div>
                    <a href={CONTACT_CONFIG.MESSENGER_URL} target="_blank" rel="noreferrer" className="px-6 py-2 bg-[#2AABEE] hover:bg-[#229ED9] text-white rounded-sm text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2">
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