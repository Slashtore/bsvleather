import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Send, Mail } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckoutSuccess?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckoutSuccess
}) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', comment: '' });
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Формируем текст заказа для письма
  const orderText = items.map(i => 
    `• ${i.name} — ${i.price.toLocaleString('ru-RU')} ₽ × ${i.quantity} = ${(i.price * i.quantity).toLocaleString('ru-RU')} ₽`
  ).join('\n');

  const handleSendOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const FORMSPREE_URL = 'https://formspree.io/f/xqejkyrn';

      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Не указан',
          comment: formData.comment || 'Нет',
          // Отдельное поле с заказом — удобно читать в письме
          order: `📦 ЗАКАС С САЙТА BSV LEATHER\n\n${orderText}\n\n💰 ИТОГО: ${total.toLocaleString('ru-RU')} ₽`
        }),
      });

      if (response.ok) {
        // Успех: очищаем корзину, закрываем, показываем сообщение
        if (onCheckoutSuccess) onCheckoutSuccess();
        setShowForm(false);
        setFormData({ name: '', email: '', phone: '', comment: '' });
        onClose();
        alert('✅ Заказ отправлен! Я свяжусь с вами в течение часа.');
      } else {
        throw new Error('Formspree error');
      }
    } catch (err) {
      console.error('Ошибка отправки:', err);
      alert('⚠️ Не удалось отправить заказ. Напишите мне напрямую: bsvleather@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 z-[70] w-full md:w-[450px] bg-leather-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 bg-leather-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} />
            <h2 className="text-2xl font-serif">Ваш заказ</h2>
          </div>
          <button onClick={onClose} className="text-leather-300 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-leather-400 opacity-60">
              <ShoppingBag size={64} className="mb-4" />
              <p className="font-serif text-xl">Корзина пуста</p>
              <p className="text-sm">Добавьте изделия из коллекции</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-sm shadow-sm border border-leather-200">
                <div className="w-20 h-20 bg-leather-100 flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-leather-900 font-bold">{item.name}</h3>
                    <p className="text-xs text-leather-500">{item.price.toLocaleString('ru-RU')} ₽</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-leather-200 rounded-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-leather-100 text-leather-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-medium text-leather-900">{item.quantity}</span>
                      <button 
                         onClick={() => onUpdateQuantity(item.id, 1)}
                         className="p-1 hover:bg-leather-100 text-leather-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 underline"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-leather-200">
            
            {/* 🔹 Если форма ещё не показана — показываем итог и кнопку "Оформить" */}
            {!showForm ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm uppercase tracking-wider text-leather-600">Итого:</span>
                  <span className="text-3xl font-serif text-leather-900 font-bold">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white py-4 flex items-center justify-center gap-3 uppercase tracking-widest font-bold text-sm transition-colors rounded-sm shadow-md"
                >
                  <span>Оформить заказ</span>
                  <Send size={18} />
                </button>
                <p className="text-xs text-center text-leather-400 mt-3">
                  Заполните форму — заказ придёт мне на почту
                </p>
              </>
            ) : (
              /* 🔹 Форма отправки */
              <form onSubmit={handleSendOrder} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-leather-600 mb-1">Имя *</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-2 border border-leather-200 rounded-sm focus:outline-none focus:border-leather-500 bg-white"
                    placeholder="Как к вам обращаться"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-leather-600 mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2 border border-leather-200 rounded-sm focus:outline-none focus:border-leather-500 bg-white"
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-leather-600 mb-1">Телефон <span className="text-leather-400 font-normal">(необязательно)</span></label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-leather-200 rounded-sm focus:outline-none focus:border-leather-500 bg-white"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-leather-600 mb-1">Комментарий</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-leather-200 rounded-sm focus:outline-none focus:border-leather-500 bg-white resize-none"
                    placeholder="Адрес доставки, пожелания по цвету, сроки..."
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={loading}
                    className="flex-1 px-4 py-3 border border-leather-300 text-leather-600 hover:bg-leather-50 uppercase text-xs font-bold tracking-wider disabled:opacity-50"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-[#2AABEE] hover:bg-[#229ED9] text-white disabled:opacity-50 uppercase text-xs font-bold tracking-wider flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>Отправка...</>
                    ) : (
                      <>
                        <Mail size={16} />
                        Отправить
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};