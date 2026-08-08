export const PRICING = {
  materials: {
    leather: {
      // Короткие ключи — как в товарах
      dm: 95,                // за кв.дм
      a4: 700,               // за лист A4
      a3: 1400,              // за лист A3
      belt_blank_3_5cm: 300, // заготовка ремня 3.5 см
      belt_blank_4_0cm: 700, // заготовка ремня цена за метр
      // Добавляй новые материалы сюда короткими ключами:
      // italian_calf: 2200,
    } as const,

    hardware: {
      buckle: 800,           // пряжка
      snap_button: 30,       // кнопка
      rivet: 10,             // заклёпка
      zipper: 100,           // молния
      screw: 40,             // винт
      holder: 200,           // купюродержатель
      // Добавляй новую фурнитуру сюда:
      // d_ring: 100,
    } as const,

    labor: { 
      per_hour: 800          // час работы
    } as const,
    
    consumables_base: 100,   // расходники
  }
} as const;

// Также нужно добавить новый материал в словарь CalculatorTool