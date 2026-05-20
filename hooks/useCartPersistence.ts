import { useState, useEffect } from 'react';
import { CartItem } from '../types';

const STORAGE_KEY = 'bsv_leather_cart';

export const useCartPersistence = () => {
  // 1. При первой загрузке читаем из localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. При каждом изменении корзины — сохраняем обратно
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // 3. Функции-обёртки (чтобы не дублировать логику в компонентах)
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newQty = Math.max(0, item.quantity + delta);
      return { ...item, quantity: newQty };
    }).filter(item => item.quantity > 0)); // Удаляем, если 0
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, updateQuantity, removeFromCart, clearCart };
};