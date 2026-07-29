import React, { useState, useEffect } from 'react';
import { ContactFormState } from '../types';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { CONTACT_CONFIG } from '../constants';

interface ContactProps {
  prefill?: {
    type: string;
    message: string;
  } | null;
}

export const Contact: React.FC<ContactProps> = ({ prefill }) => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    message: '',
    type: 'Индивидуальный заказ'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Обновление формы при передаче предзаполненных данных (например, при нажатии "Заказать кастом")
  useEffect(() => {
    if (prefill) {
      setFormState(prev => ({
        ...prev,
        type: prefill.type,
        message: prefill.message
      }));
    }
  }, [prefill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const FORMSPREE_URL = 'https://formspree.io/f/mvzyovqg';

      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          type: formState.type,
          message: formState.message,
          subject: `📩 ${formState.type} — ${formState.name}`,
          page: window.location.href
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '', type: 'Индивидуальный заказ' });
      } else {
        throw new Error('Formspree error');
      }
    } catch (err) {
      console.error('Ошибка отправки:', err);
      alert('⚠️ Не удалось отправить. Напишите напрямую: ' + (CONTACT_CONFIG.EMAIL || 'bsvleather@gmail.com'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#14110f] text-stone-100 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          
          {/* ЛЕВАЯ КОЛОНКА: Контактная информация */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-[#e6ccb2]/50" />
                <span className="text-[#e6ccb2]/80 font-mono text-xs uppercase tracking-[0.25em]">
                  Контакты
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif text-stone-100 mb-4 tracking-tight font-medium">
                Связаться с мастером
              </h2>
              
              <p className="text-stone-300/80 mb-10 leading-relaxed font-light text-sm md:text-base">
                Готовы заказать уникальное изделие или у вас есть вопросы по выбору кожи? 
                Заполните форму, и я свяжусь с вами в течение дня для обсуждения деталей.
              </p>
              
              <div className="space-y-6">
                {/* Телефон / Мессенджер */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-900/90 border border-stone-800 flex items-center justify-center text-[#e6ccb2] shrink-0 mt-0.5">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-0.5">
                      {CONTACT_CONFIG.MESSENGER_LABEL} / Телефон
                    </p>
                    <p className="text-stone-100 font-medium text-sm md:text-base mb-0.5">
                      {CONTACT_CONFIG.PHONE}
                    </p>
                    <a 
                      href={CONTACT_CONFIG.MESSENGER_URL} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-xs text-[#e6ccb2] hover:text-white transition-colors underline decoration-[#e6ccb2]/40"
                    >
                      Написать в {CONTACT_CONFIG.MESSENGER_LABEL} →
                    </a>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-900/90 border border-stone-800 flex items-center justify-center text-[#e6ccb2] shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-stone-100 font-medium text-sm md:text-base">
                      {CONTACT_CONFIG.EMAIL}
                    </p>
                  </div>
                </div>

                {/* Адрес */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-900/90 border border-stone-800 flex items-center justify-center text-[#e6ccb2] shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-0.5">Мастерская</p>
                    <p className="text-stone-100 font-medium text-sm md:text-base">
                      {CONTACT_CONFIG.ADDRESS}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА: Форма с динамической панелью */}
          <div className="w-full lg:w-2/3 bg-white rounded-sm shadow-2xl text-stone-900 relative min-h-[560px] md:min-h-[520px] overflow-hidden border border-stone-200">
            
            {/* СОСТОЯНИЕ 1: ФОРМА ОПРАВКИ */}
            <form 
              onSubmit={handleSubmit} 
              className={`absolute inset-0 p-6 md:p-10 flex flex-col justify-between transition-all duration-500 ease-out ${
                isSubmitted 
                  ? 'opacity-0 translate-y-4 pointer-events-none' 
                  : 'opacity-100 translate-y-0 pointer-events-auto'
              }`}
            >
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                      Ваше имя *
                    </label>
                    <input 
                      type="text" 
                      required
                      disabled={loading}
                      placeholder="Как к вам обращаться"
                      className="w-full bg-stone-50 border border-stone-200/90 px-4 py-3 rounded-sm focus:outline-none focus:border-stone-800 focus:bg-white transition-colors text-stone-900 text-sm disabled:opacity-50"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      disabled={loading}
                      placeholder="example@mail.ru"
                      className="w-full bg-stone-50 border border-stone-200/90 px-4 py-3 rounded-sm focus:outline-none focus:border-stone-800 focus:bg-white transition-colors text-stone-900 text-sm disabled:opacity-50"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                    Тема обращения
                  </label>
                  <select 
                    disabled={loading}
                    className="w-full bg-stone-50 border border-stone-200/90 px-4 py-3 rounded-sm focus:outline-none focus:border-stone-800 focus:bg-white transition-colors text-stone-900 text-sm disabled:opacity-50"
                    value={formState.type}
                    onChange={(e) => setFormState({...formState, type: e.target.value})}
                  >
                    <option>Индивидуальный заказ</option>
                    <option>Подарочный сертификат</option>
                    <option>Заказ 3D макета (Визуализация)</option>
                    <option>Покупка из наличия</option>
                    <option>Вопрос мастеру</option>
                    <option>Сотрудничество</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-stone-600 font-bold mb-1.5">
                    Сообщение *
                  </label>
                  <textarea 
                    required
                    rows={4}
                    disabled={loading}
                    placeholder="Опишите ваши пожелания, размеры или вопрос..."
                    className="w-full bg-stone-50 border border-stone-200/90 px-4 py-3 rounded-sm focus:outline-none focus:border-stone-800 focus:bg-white transition-colors resize-none text-stone-900 text-sm disabled:opacity-50"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-[#1a110f] text-[#e6ccb2] px-10 py-4 uppercase tracking-widest font-bold text-xs hover:bg-stone-900 transition-all shadow-lg border border-stone-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Отправка...</span>
                    </>
                  ) : (
                    <>
                      <span>Отправить сообщение</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* СОСТОЯНИЕ 2: УСПЕШНАЯ ОТПРАВКА */}
            <div className={`absolute inset-0 p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out ${
              isSubmitted 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}>
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700 mb-6 border border-emerald-200/80 shadow-sm">
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-2">
                Заявка успешно отправлена!
              </h3>
              <p className="text-stone-600 text-sm max-w-sm leading-relaxed font-light">
                Спасибо за обращение. Я внимательно изучу ваши пожелания и свяжусь с вами в ближайшее время.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};