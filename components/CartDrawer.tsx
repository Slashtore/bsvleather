import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Send, Mail, Trash2, Loader2, ArrowLeft, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckoutSuccess?: () => void;
}

const FREE_SHIPPING_THRESHOLD = 10000;

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
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const shippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  // Формируем текст заказа для письма
  const orderText = items.map(i => 
    `• ${i.name} — ${i.price.toLocaleString('ru-RU')} ₽ × ${i.quantity} = ${(i.price * i.quantity).toLocaleString('ru-RU')} ₽`
  ).join('\n');

  const handleSendOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const FORMSPREE_URL = 'https://formspree.io/f/xqejkyrn';

      const shippingInfo = isFreeShipping 
        ? '🚚 Доставка: БЕСПЛАТНО (заказ от 10 000 ₽)' 
        : '🚚 Доставка: По тарифам СДЭК / Почты России';

      const fullOrderPayload = `📦 ЗАКАЗ С САЙТА BSV LEATHER\n\n${orderText}\n\n${shippingInfo}\n\n💰 ИТОГО: ${total.toLocaleString('ru-RU')} ₽`;

      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Не указан',
          comment: formData.comment || 'Нет',
          freeShipping: isFreeShipping ? 'Да' : 'Нет',
          order: fullOrderPayload
        }),
      });

      if (response.ok) {
        if (onCheckoutSuccess) onCheckoutSuccess();
        setShowForm(false);
        setFormData({ name: '', email: '', phone: '', comment: '' });
        onClose();
        alert('✅ Заказ успешно отправлен! Я свяжусь с вами в ближайшее время.');
      } else {
        throw new Error('Formspree error');
      }
    } catch (err) {
      console.error('Ошибка отправки:', err);
      alert('⚠️ Не удалось отправить заказ через форму. Пожалуйста, напишите мне напрямую или в мессенджер.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Затемняющий фон (Backdrop) */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Выдвижная панель корзины (Drawer) */}
      <div className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-[480px] bg-stone-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Шапка корзины */}
        <div className="p-5 md:p-6 bg-[#1a110f] text-[#e6ccb2] flex justify-between items-center border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={22} className="text-[#e6ccb2]" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#885036] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-serif tracking-tight text-stone-100">Ваш заказ</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800/80 rounded-full transition-colors"
            title="Закрыть"
          >
            <X size={20} />
          </button>
        </div>

        {/* Прогресс-бар бесплатной доставки */}
        {items.length > 0 && (
          <div className="bg-stone-900 text-stone-100 px-5 py-3.5 border-b border-stone-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <Truck size={15} className="text-[#e6ccb2] shrink-0" />
                <span className="font-light">
                  {isFreeShipping ? (
                    <strong className="text-[#e6ccb2] font-medium">Бесплатная доставка активирована! 🎉</strong>
                  ) : (
                    <>
                      До бесплатной доставки ещё <strong className="text-[#e6ccb2] font-semibold">{amountNeededForFreeShipping.toLocaleString('ru-RU')} ₽</strong>
                    </>
                  )}
                </span>
              </div>
              <span className="font-mono text-[10px] text-stone-400 font-bold shrink-0 ml-2">
                {Math.round(shippingProgress)}%
              </span>
            </div>

            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#885036] to-[#e6ccb2] h-full transition-all duration-500 ease-out"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Список товаров в корзине */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <div className="w-20 h-20 bg-stone-200/60 rounded-full flex items-center justify-center mb-4 text-stone-400">
                <ShoppingBag size={36} strokeWidth={1.2} />
              </div>
              <p className="font-serif text-2xl text-stone-800 mb-1">Корзина пуста</p>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Выберите понравившиеся изделия из коллекции ручной работы в каталоге
              </p>
              <button 
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-[#1a110f] text-[#e6ccb2] text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-stone-900 transition-colors"
              >
                Перейти к выбору
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-3.5 rounded-sm shadow-sm border border-stone-200/80 hover:border-stone-300 transition-colors">
                {/* Фото товара */}
                <div className="w-20 h-20 bg-stone-100 rounded-sm overflow-hidden flex-shrink-0 border border-stone-200">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Информация */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-stone-900 font-medium text-base leading-snug">{item.name}</h3>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1 -mr-1"
                      title="Удалить позицию"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    {/* Переключатель количества */}
                    <div className="flex items-center border border-stone-200 rounded-sm bg-stone-50">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                        title="Уменьшить"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-900">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                        title="Увеличить"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Сумма по позиции */}
                    <span className="font-bold text-stone-950 text-sm">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Нижний блок: Итог и Форма заказа */}
        {items.length > 0 && (
          <div className="p-5 md:p-6 bg-white border-t border-stone-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            
            {!showForm ? (
              /* Вывод итоговой суммы и кнопки оформления */
              <>
                <div className="flex justify-between items-baseline mb-5">
                  <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">Итого к оплате:</span>
                  <div className="text-right">
                    <span className="text-3xl font-serif text-stone-950 font-bold">{total.toLocaleString('ru-RU')} ₽</span>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      {isFreeShipping ? 'Бесплатная доставка' : 'Доставка по тарифу СДЭК/Почты'}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-[#1a110f] hover:bg-stone-900 text-[#e6ccb2] py-4 px-6 flex items-center justify-center gap-3 uppercase tracking-widest font-bold text-xs transition-all duration-300 rounded-sm shadow-lg border border-stone-800"
                >
                  <span>Оформить заказ</span>
                  <Send size={16} />
                </button>
                <p className="text-[11px] text-center text-stone-400 mt-3 leading-tight">
                  Заполните контакты — я свяжусь с вами для уточнения деталей и адреса
                </p>
              </>
            ) : (
              /* Форма ввода контактов */
              <form onSubmit={handleSendOrder} className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3">
                  <h3 className="font-serif text-lg text-stone-900">Контактные данные</h3>
                  <span className="text-xs font-bold text-stone-900">{total.toLocaleString('ru-RU')} ₽</span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">Имя *</label>
                  <input
                    required
                    type="text"
                    className="w-full px-3.5 py-2 text-sm border border-stone-200 rounded-sm focus:outline-none focus:border-stone-800 bg-stone-50/50"
                    placeholder="Как к вам обращаться"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    className="w-full px-3.5 py-2 text-sm border border-stone-200 rounded-sm focus:outline-none focus:border-stone-800 bg-stone-50/50"
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Телефон <span className="text-stone-400 font-normal">(для связи в мессенджерах)</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3.5 py-2 text-sm border border-stone-200 rounded-sm focus:outline-none focus:border-stone-800 bg-stone-50/50"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">Комментарий к заказу</label>
                  <textarea
                    rows={2}
                    className="w-full px-3.5 py-2 text-sm border border-stone-200 rounded-sm focus:outline-none focus:border-stone-800 bg-stone-50/50 resize-none"
                    placeholder="Пожелания по цвету кожи/нити, тиснение инициалов, адрес..."
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={loading}
                    className="flex-1 px-4 py-3 border border-stone-300 text-stone-700 hover:bg-stone-50 uppercase text-xs font-bold tracking-wider rounded-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft size={14} />
                    Назад
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] px-4 py-3 bg-[#1a110f] hover:bg-stone-900 text-[#e6ccb2] disabled:opacity-50 uppercase text-xs font-bold tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-md border border-stone-800"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <Mail size={15} />
                        <span>Подтвердить заказ</span>
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