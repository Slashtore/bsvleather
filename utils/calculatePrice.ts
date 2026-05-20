import { ProductRecipe } from '../types';
import { PRICING } from '../constants/pricing';

export const calculatePrice = (recipe?: ProductRecipe, fallbackPrice?: number, productName?: string): number => {
  // Если нет рецепта — возвращаем фиксированную цену (для ухода)
  if (!recipe || !recipe.leather) {
    const price = typeof fallbackPrice === 'number' && !isNaN(fallbackPrice) ? fallbackPrice : 0;
    return price;
  }

  // 1. Кожа
  const leather = recipe.leather;
  const leatherRate = PRICING.materials.leather[leather.type]; // TS знает, что это число
  const leatherCost = leather.amount * leatherRate;

  // 2. Фурнитура
  let hardwareCost = 0;
  if (recipe.hardware?.length) {
    for (const item of recipe.hardware) {
      hardwareCost += (PRICING.materials.hardware[item.type] ?? 0) * item.count;
    }
  }

  // 3. Работа
  const hours = recipe.hours ?? 0;
  const laborRate = PRICING.materials.labor.per_hour ?? 0;
  const laborCost = hours * laborRate;

  // 4. Расходники
  const consumables = PRICING.materials.consumables_base ?? 0;

  // 5. Итого до округления
  const rawTotal = leatherCost + hardwareCost + laborCost + consumables;

  // 6. Округление до сотен
  const final = Math.ceil(rawTotal / 100) * 100;
  console.groupEnd();

  return final;
};