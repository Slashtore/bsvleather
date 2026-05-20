import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, Copy, Check } from 'lucide-react';
import { PRICING } from '../constants/pricing';

//  Словари: ключ из pricing.ts → русское название
const LEATHER_NAMES: Record<string, string> = {
  dm: 'кв. дм',
  a4: 'Лист A4',
  a3: 'Лист A3',
  belt_blank_3_5cm: 'Заготовка 3.5 см',
  belt_blank_4_0cm: 'Заготовка 4.0 см',
};

const HARDWARE_NAMES: Record<string, string> = {
  buckle: 'Пряжка',
  snap_button: 'Кнопка',
  rivet: 'Заклёпка',
  zipper: 'Молния',
  screw: 'Винт',
};

// 🔧 Типы данных
interface HardwareItem {
  id: number;
  type: string;
  qty: number;
  priceOverride: number | null;
}

interface CustomService {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface LeatherItem {
  id: number;
  type: string;
  qty: number;
  priceOverride: number | null;
}

export const CalculatorTool = () => {
  const [copied, setCopied] = useState(false);

  // --- СОСТОЯНИЕ ---
  const [leatherItems, setLeatherItems] = useState<LeatherItem[]>([
    { id: 1, type: Object.keys(PRICING.materials.leather)[0], qty: 1, priceOverride: null }
  ]);

  const [hardwareItems, setHardwareItems] = useState<HardwareItem[]>([
    { id: 1, type: Object.keys(PRICING.materials.hardware)[0], qty: 1, priceOverride: null }
  ]);

  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  const [laborHours, setLaborHours] = useState(0);
  const [laborRateOverride, setLaborRateOverride] = useState<number | null>(null);

  // --- РАСЧЁТ ---
  const result = useMemo(() => {
    let leatherTotal = 0;
    leatherItems.forEach(item => {
      const basePrice = PRICING.materials.leather[item.type as keyof typeof PRICING.materials.leather] || 0;
      const finalPrice = item.priceOverride !== null ? item.priceOverride : basePrice;
      leatherTotal += item.qty * finalPrice;
    });

    let hardwareTotal = 0;
    hardwareItems.forEach(item => {
      const basePrice = PRICING.materials.hardware[item.type as keyof typeof PRICING.materials.hardware] || 0;
      const finalPrice = item.priceOverride !== null ? item.priceOverride : basePrice;
      hardwareTotal += item.qty * finalPrice;
    });

    let servicesTotal = 0;
    customServices.forEach(item => servicesTotal += item.qty * item.price);

    const baseRate = PRICING.materials.labor.per_hour || 0;
    const finalRate = laborRateOverride !== null ? laborRateOverride : baseRate;
    const laborTotal = laborHours * finalRate;

    const consumables = PRICING.materials.consumables_base || 0;
    const total = leatherTotal + hardwareTotal + servicesTotal + laborTotal + consumables;
    // Округление ВНИЗ до ближайших 50₽
    const roundedTotal = Math.floor(total / 50) * 50;

    return { leatherTotal, hardwareTotal, servicesTotal, laborTotal, finalRate, consumables, total, roundedTotal };
  }, [leatherItems, hardwareItems, customServices, laborHours, laborRateOverride]);

  // --- УПРАВЛЕНИЕ: КОЖА ---
  const updateLeather = (id: number, field: keyof LeatherItem, value: string | number | null) => {
    setLeatherItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      if (field === 'type' && typeof value === 'string') {
        const newPrice = PRICING.materials.leather[value as keyof typeof PRICING.materials.leather] || 0;
        return { ...item, type: value, priceOverride: newPrice };
      }
      return { ...item, [field]: value };
    }));
  };

  const addLeather = () => {
    const newId = leatherItems.length > 0 ? Math.max(...leatherItems.map(i => i.id)) + 1 : 1;
    setLeatherItems(prev => [...prev, { id: newId, type: Object.keys(PRICING.materials.leather)[0], qty: 1, priceOverride: null }]);
  };

  const removeLeather = (id: number) => setLeatherItems(prev => prev.filter(item => item.id !== id));

  // --- УПРАВЛЕНИЕ: ФУРНИТУРА ---
  const updateHardware = (id: number, field: keyof HardwareItem, value: string | number | null) => {
    setHardwareItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      if (field === 'type' && typeof value === 'string') {
        const newPrice = PRICING.materials.hardware[value as keyof typeof PRICING.materials.hardware] || 0;
        return { ...item, type: value, priceOverride: newPrice };
      }
      return { ...item, [field]: value };
    }));
  };

  const addHardware = () => {
    const newId = hardwareItems.length > 0 ? Math.max(...hardwareItems.map(i => i.id)) + 1 : 1;
    setHardwareItems(prev => [...prev, { id: newId, type: Object.keys(PRICING.materials.hardware)[0], qty: 1, priceOverride: null }]);
  };

  const removeHardware = (id: number) => setHardwareItems(prev => prev.filter(item => item.id !== id));

  // --- УПРАВЛЕНИЕ: УСЛУГИ ---
  const addCustomService = () => {
    const newId = customServices.length > 0 ? Math.max(...customServices.map(i => i.id)) + 1 : 1;
    setCustomServices(prev => [...prev, { id: newId, name: 'Новая услуга', price: 0, qty: 1 }]);
  };

  const updateCustomService = (id: number, field: keyof CustomService, value: string | number) => {
    setCustomServices(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeCustomService = (id: number) => setCustomServices(prev => prev.filter(item => item.id !== id));

  // --- КОПИРОВАНИЕ ---
  const copyResult = () => {
    const leatherLines = leatherItems.map(item => {
      const basePrice = PRICING.materials.leather[item.type as keyof typeof PRICING.materials.leather] || 0;
      const finalPrice = item.priceOverride !== null ? item.priceOverride : basePrice;
      const niceName = LEATHER_NAMES[item.type] || item.type;
      return `    • ${niceName} × ${item.qty} = ${(finalPrice * item.qty).toLocaleString('ru-RU')}₽`;
    }).join('\n');

    const hardwareLines = hardwareItems.map(item => {
      const basePrice = PRICING.materials.hardware[item.type as keyof typeof PRICING.materials.hardware] || 0;
      const finalPrice = item.priceOverride !== null ? item.priceOverride : basePrice;
      const niceName = HARDWARE_NAMES[item.type] || item.type;
      return `    • ${niceName} × ${item.qty} = ${(finalPrice * item.qty).toLocaleString('ru-RU')}₽`;
    }).join('\n');

    const serviceLines = customServices.map(item => 
      `    • ${item.name} × ${item.qty} = ${(item.price * item.qty).toLocaleString('ru-RU')}₽`
    ).join('\n') || '    — нет —';

    const text = `📦 РАСЧЁТ ЗАКАЗА (BSV)\n\n` +
      `📏 Материалы (Кожа):\n` +
      (leatherLines || '    — нет —') + `\n\n` +
      
      `🔩 Фурнитура:\n` +
      (hardwareLines || '    — нет —') + `\n\n` +
      
      `✨ Доп. услуги:\n` +
      serviceLines + `\n\n` +
      
      `⏱ Работа: ${laborHours}ч × ${result.finalRate}₽ = ${result.laborTotal.toLocaleString('ru-RU')}₽\n` +
      `🧴 Расходники: ${result.consumables.toLocaleString('ru-RU')}₽\n\n` +
      
      `─────────────\n` +
      `ИТОГО: ${result.total.toLocaleString('ru-RU')}₽\n` +
      `К ОПЛАТЕ: ${result.roundedTotal.toLocaleString('ru-RU')}₽`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- ИНТЕРФЕЙС ---
  return (
    <div className="min-h-screen bg-leather-50 py-8 px-4 pt-24 relative z-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif text-leather-900 flex items-center gap-3">
            <Calculator size={32} /> Конструктор цены
          </h1>
          {/* Кнопка "Выйти" убрана, так как пароль тоже убран. 
              Можно вернуть ссылку на главную, если нужно: */}
          <a href="/" className="text-sm text-leather-500 hover:text-leather-900 underline">
            На главную
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ЛЕВАЯ КОЛОНКА: НАСТРОЙКИ */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. КОЖА */}
            <div className="bg-white p-6 rounded-sm shadow-md border-l-4 border-leather-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"> Кожа</h3>
                <button onClick={addLeather} className="flex items-center gap-1 text-xs text-leather-500 hover:text-leather-900 bg-leather-100 px-2 py-1 rounded">
                  <Plus size={14} /> Тип кожи
                </button>
              </div>
              <div className="space-y-3">
                {leatherItems.map((item) => {
                   const basePrice = PRICING.materials.leather[item.type as keyof typeof PRICING.materials.leather] || 0;
                   return (
                    <div key={item.id} className="flex gap-2 items-center">
                      <select className="flex-1 px-2 py-2 border border-leather-200 rounded-sm bg-leather-50 text-sm" value={item.type} onChange={e => updateLeather(item.id, 'type', e.target.value)}>
                        {Object.keys(PRICING.materials.leather).map(key => <option key={key} value={key}>{LEATHER_NAMES[key] || key}</option>)}
                      </select>
                      <input type="number" min="0" step="0.1" className="w-16 px-2 py-2 border border-leather-200 rounded-sm bg-leather-50 text-sm" value={item.qty} onChange={e => updateLeather(item.id, 'qty', parseFloat(e.target.value) || 0)} />
                      <input type="number" className="w-24 px-2 py-2 border border-leather-300 rounded-sm bg-yellow-50 text-sm focus:bg-white" placeholder={basePrice.toString()} value={item.priceOverride !== null ? item.priceOverride : ''} onChange={e => updateLeather(item.id, 'priceOverride', e.target.value === '' ? null : parseFloat(e.target.value))} />
                      <button onClick={() => removeLeather(item.id)} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. ФУРНИТУРА */}
            <div className="bg-white p-6 rounded-sm shadow-md border-l-4 border-leather-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">🔩 Фурнитура</h3>
                <button onClick={addHardware} className="flex items-center gap-1 text-xs text-leather-500 hover:text-leather-900 bg-leather-100 px-2 py-1 rounded">
                  <Plus size={14} /> Позиция
                </button>
              </div>
              <div className="space-y-3">
                {hardwareItems.map((item) => {
                   const basePrice = PRICING.materials.hardware[item.type as keyof typeof PRICING.materials.hardware] || 0;
                   return (
                    <div key={item.id} className="flex gap-2 items-center">
                      <select className="flex-1 px-2 py-2 border border-leather-200 rounded-sm bg-leather-50 text-sm" value={item.type} onChange={e => updateHardware(item.id, 'type', e.target.value)}>
                        {Object.keys(PRICING.materials.hardware).map(key => <option key={key} value={key}>{HARDWARE_NAMES[key] || key}</option>)}
                      </select>
                      <input type="number" min="0" className="w-16 px-2 py-2 border border-leather-200 rounded-sm bg-leather-50 text-sm" value={item.qty} onChange={e => updateHardware(item.id, 'qty', parseInt(e.target.value) || 0)} />
                      <input type="number" className="w-24 px-2 py-2 border border-leather-300 rounded-sm bg-yellow-50 text-sm focus:bg-white" placeholder={basePrice.toString()} value={item.priceOverride !== null ? item.priceOverride : ''} onChange={e => updateHardware(item.id, 'priceOverride', e.target.value === '' ? null : parseFloat(e.target.value))} />
                      <button onClick={() => removeHardware(item.id)} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. ДОП. УСЛУГИ */}
            <div className="bg-white p-6 rounded-sm shadow-md border-l-4 border-[#2AABEE]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">✨ Доп. услуги</h3>
                <button onClick={addCustomService} className="flex items-center gap-1 text-xs text-[#2AABEE] hover:text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  <Plus size={14} /> Услуга
                </button>
              </div>
              <div className="space-y-3">
                {customServices.map((item) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <input type="text" className="flex-1 px-2 py-2 border border-leather-200 rounded-sm bg-leather-50 text-sm" placeholder="Название" value={item.name} onChange={e => updateCustomService(item.id, 'name', e.target.value)} />
                    <input type="number" min="0" className="w-16 px-2 py-2 border border-leather-200 rounded-sm bg-leather-50 text-sm" value={item.qty} onChange={e => updateCustomService(item.id, 'qty', parseInt(e.target.value) || 0)} />
                    <input type="number" min="0" className="w-24 px-2 py-2 border border-leather-300 rounded-sm bg-yellow-50 text-sm focus:bg-white" placeholder="Цена" value={item.price} onChange={e => updateCustomService(item.id, 'price', parseFloat(e.target.value) || 0)} />
                    <button onClick={() => removeCustomService(item.id)} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. РАБОТА */}
            <div className="bg-white p-6 rounded-sm shadow-md border-l-4 border-green-600">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">⏱ Работа</h3>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" min="0" step="0.5" placeholder="Часы" className="px-3 py-2 border border-leather-200 rounded-sm bg-leather-50" value={laborHours || ''} onChange={e => setLaborHours(parseFloat(e.target.value) || 0)} />
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-gray-400">Ставка/час</span>
                  <input type="number" className="w-full px-3 pt-5 pb-2 border border-leather-300 rounded-sm bg-yellow-50 focus:bg-white" value={laborRateOverride !== null ? laborRateOverride : ''} placeholder={(PRICING.materials.labor.per_hour || 0).toString()} onChange={e => setLaborRateOverride(e.target.value === '' ? null : parseFloat(e.target.value))} />
                </div>
              </div>
            </div>

          </div>

          {/* ПРАВАЯ КОЛОНКА: ИТОГ */}
          <div className="bg-leather-900 text-white p-6 rounded-sm shadow-md flex flex-col justify-between sticky top-8 h-fit">
            <div className="space-y-4">
              <h3 className="text-xl font-serif border-b border-leather-700 pb-3">Расчёт стоимости</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Кожа:</span><span>{result.leatherTotal.toLocaleString('ru-RU')} ₽</span></div>
                <div className="flex justify-between"><span>Фурнитура:</span><span>{result.hardwareTotal.toLocaleString('ru-RU')} ₽</span></div>
                <div className="flex justify-between"><span>Услуги:</span><span>{result.servicesTotal.toLocaleString('ru-RU')} ₽</span></div>
                <div className="flex justify-between"><span>Работа:</span><span>{result.laborTotal.toLocaleString('ru-RU')} ₽</span></div>
                <div className="flex justify-between"><span>Расходники:</span><span>{result.consumables.toLocaleString('ru-RU')} ₽</span></div>
                <div className="border-t border-leather-700 pt-2 mt-4 flex justify-between font-bold text-lg">
                  <span>Итого:</span><span>{result.total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="bg-[#2AABEE]/20 p-4 rounded-sm text-center border border-[#2AABEE]/50">
                <p className="text-xs uppercase tracking-wider text-[#2AABEE] mb-1">К оплате клиенту</p>
                <p className="text-4xl font-bold text-white">{result.roundedTotal.toLocaleString('ru-RU')} ₽</p>
              </div>
              <button onClick={copyResult} className="w-full py-3 bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold uppercase tracking-wider text-sm rounded-sm flex items-center justify-center gap-2 transition-colors">
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Скопировано!' : 'Скопировать для клиента'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};