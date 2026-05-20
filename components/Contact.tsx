import React, { useState, useEffect } from 'react';
import { ContactFormState } from '../types';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
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
  const [loading, setLoading] = useState(false); // 🔥 Новое: состояние загрузки

  // Update form when prefill data changes
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
          type: formState.type, // Тема обращения
          message: formState.message,
          // Служебная информация
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
      }, 4000); // 4 секунды
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <section id="contact" className="py-24 bg-leather-900 text-leather-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl font-serif text-white mb-6">Связаться</h2>
            <p className="text-leather-200 mb-10 leading-relaxed font-light">
              Готовы заказать уникальное изделие или у вас есть вопросы? 
              Заполните форму, и я свяжусь с вами в ближайшее время для обсуждения деталей.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-leather-800 flex items-center justify-center text-leather-200">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-leather-400 uppercase tracking-wider">{CONTACT_CONFIG.MESSENGER_LABEL} / Телефон</p>
                  <p className="text-white font-medium">{CONTACT_CONFIG.PHONE}</p>
                  <a href={CONTACT_CONFIG.MESSENGER_URL} target="_blank" rel="noreferrer" className="text-xs text-[#2AABEE] hover:text-white transition-colors underline">
                    Написать в {CONTACT_CONFIG.MESSENGER_LABEL}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-leather-800 flex items-center justify-center text-leather-200">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-leather-400 uppercase tracking-wider">Email</p>
                  <p className="text-white font-medium">{CONTACT_CONFIG.EMAIL}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-leather-800 flex items-center justify-center text-leather-200">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-leather-400 uppercase tracking-wider">Мастерская</p>
                  <p className="text-white font-medium">{CONTACT_CONFIG.ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка: Фиксированная высота + абсолютные панели */}
          <div className="w-full lg:w-2/3 bg-white rounded-sm shadow-xl text-leather-900 relative h-[620px] md:h-[560px] overflow-hidden">
            
            {/*  СОСТОЯНИЕ 1: ФОРМА */}
            <form 
              onSubmit={handleSubmit} 
              className={`absolute inset-0 p-8 md:p-12 flex flex-col space-y-6 transition-all duration-500 ease-out ${
                isSubmitted 
                  ? 'opacity-0 translate-y-4 pointer-events-none' 
                  : 'opacity-100 translate-y-0 pointer-events-auto'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-leather-600 font-bold mb-2">Ваше имя</label>
                  <input 
                    type="text" 
                    required
                    disabled={loading}
                    className="w-full bg-leather-50 border border-leather-200 px-4 py-3 focus:outline-none focus:border-leather-500 transition-colors text-leather-900 disabled:opacity-50"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-leather-600 font-bold mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    disabled={loading}
                    className="w-full bg-leather-50 border border-leather-200 px-4 py-3 focus:outline-none focus:border-leather-500 transition-colors text-leather-900 disabled:opacity-50"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-wider text-leather-600 font-bold mb-2">Тема</label>
                <select 
                  disabled={loading}
                  className="w-full bg-leather-50 border border-leather-200 px-4 py-3 focus:outline-none focus:border-leather-500 transition-colors text-leather-900 disabled:opacity-50"
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
                <label className="block text-xs uppercase tracking-wider text-leather-600 font-bold mb-2">Сообщение</label>
                <textarea 
                  required
                  rows={4}
                  disabled={loading}
                  className="w-full bg-leather-50 border border-leather-200 px-4 py-3 focus:outline-none focus:border-leather-500 transition-colors resize-none text-leather-900 disabled:opacity-50"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-leather-800 text-white px-10 py-4 uppercase tracking-widest font-bold hover:bg-leather-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto"
              >
                {loading ? (
                  <>Отправка...</>
                ) : (
                  <>
                    <span>Отправить</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>

            {/* 🔹 СОСТОЯНИЕ 2: УСПЕХ */}
            <div className={`absolute inset-0 p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out ${
              isSubmitted 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}>
              <div className="w-20 h-20 bg-[#2AABEE]/10 rounded-full flex items-center justify-center text-[#2AABEE] mb-6">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Спасибо за заявку!</h3>
              <p className="text-leather-600">Я свяжусь с вами в течение 24 часов.</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};